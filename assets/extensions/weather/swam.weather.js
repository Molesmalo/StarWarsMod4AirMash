"use strict";

!function() {
    // Default values for the settings
    const DEFAULT_VALUES = {
        useDayNight: true,
        cloudsVisible: true,
        darkness: 85
    };

    // Current values
    let settings = {...DEFAULT_VALUES},
    sun,
    clouds,
    snow,
    snow_mask;

    //const SUN_SPEED = 32678 / 5 / 60 / 60; // (mapwidth 5 mins 60 secs 60fps)
    const SUN_SPEED = 1.8154444444444446;   // 1 cycle every 5 minutes at 60fps
    const CLOUDS_SPEED = 0.15;
    const CLOUDS_URL = "https://image.ibb.co/hwA2tc/clouds4096.jpg";
    const CLOUDS_SCALE = 8;

    // This is the handler that will be executed when new settings are applied
    function settingsApplied(values)
    {
        settings = values;

        setSettings();
    }

    function setSettings()
    {
        sun.alpha = parseFloat(settings.darkness / 100);
        sun.visible = settings.useDayNight;
        clouds.visible = settings.cloudsVisible;
    }

    // creates an instance of SettingsProvider
    function createSettingsProvider()
    {
		let sp = new SettingsProvider(DEFAULT_VALUES, settingsApplied);
		let section = sp.addSection('Weather layers');
        section.addBoolean('useDayNight', 'Day / Night Cycle');
        section.addBoolean('cloudsVisible', 'Clouds');
        section.addSliderField("darkness", "Darkness level (default: 85)", {min: 60, max: 95, step: 5});

		return sp;
    }

    // Returns milliseconds since last in-game-midnight
    // A "midnight" is defined as when the offset for the sun = 0,
    // this happens every 5 minutes (0,5,10,....,50,55)
    // this is done, so every player can see the same time-of-day
    function getTimeSinceLastMidnight()
    {
        let now = new Date();

        // the last "midnight" in minutes
        let min = Math.floor(now.getUTCMinutes() / 5) * 5;

        // get midnight's date
        let midnight = new Date(
            Date.UTC(
            now.getUTCFullYear(), 
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            min,
            0));

        return now.getTime() - midnight.getTime();
    }

    function getOffsetSinceMidnight()
    {
        let time = getTimeSinceLastMidnight();
        return time / 1000 * 60 * SUN_SPEED;    // 60 FPS * SUN_SPEED => offset pixels
    }

	// Event handlers
    SWAM.one("gameRunning", ()=> {
        let map = game.graphics.layers.map;
        let forest = map.children[0];

        //game.graphics.layers.game.children[0].visible = false;
        //game.graphics.layers.game.addChildAt(game.graphics.layers.map, 0);
        //game.graphics.layers.game.addChildAt(game.graphics.layers.sea, 0);

        let texture = PIXI.Texture.fromImage(getFilePath("sunmap2.jpg"));
        sun = new PIXI.extras.TilingSprite(texture, config.mapWidth, config.mapHeight);
        //window.sun = sun;
        sun.position.set(0, 0);
        sun.alpha = 0.85;
        sun.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        sun.layerName = "sun";
        game.graphics.layers.game.addChildAt(sun, 2);
        

        let imagePath = (SWAM.debug ? getFilePath("clouds4096.jpg") : CLOUDS_URL )

        let ct = PIXI.Texture.fromImage(imagePath);
        clouds = new PIXI.extras.TilingSprite(ct, config.mapWidth, config.mapHeight);
        //window.clouds = clouds;
        clouds.position.set(0, 0);
        clouds.alpha = 0.4;
        clouds.blendMode = PIXI.BLEND_MODES.SCREEN;
        clouds.layerName = "clouds";
        game.graphics.layers.game.addChildAt(clouds, 2);

/*
        let snowTexture = PIXI.Texture.fromImage(getFilePath("map_snow.jpg"));
        snow = new PIXI.extras.TilingSprite(snowTexture,
            Graphics.renderer.width + config.overdraw,
            Graphics.renderer.height + config.overdraw);
        //snow.blendMode = PIXI.BLEND_MODES.NORMAL;
        snow.layerName = "snow";
        map.addChild(snow);

        let snowMaskTexture = PIXI.Texture.fromImage(getFilePath("map_snow_mask.jpg"));
        snow_mask = new PIXI.Sprite(snowMaskTexture);
        snow_mask.scale.set(8, 8);
        snow_mask.layerName = "snow_mask";
        map.addChild(snow_mask);

        snow.mask = snow_mask;
        window.snow = snow;
        window.snow_mask = snow_mask;*/




        let
        offsetX = - game.halfScreenX / game.scale + 16384,
        offsetY = - game.halfScreenY / game.scale + 8192;

        let ticker =  new PIXI.ticker.Ticker();
        sun.ticker = clouds.ticker = ticker;
        
        // Set the "current time", based on the offset since last in-game midnight
        let sunOffset = getOffsetSinceMidnight();
        let cloudsOffset = Tools.randInt(0, 32767);



        // Update layers
        ticker.add(()=>{
            let camera = Graphics.getCamera();
            var
            //x = camera.x - (config.overdraw + game.screenX) / game.scale / 2 + 16384,
            //y = camera.y - (config.overdraw + game.screenY) / game.scale / 2 + 8192,
            x = camera.x + offsetX,
            y = camera.y + offsetY,
            tileX = -x * game.scale,
            tileY = -y * game.scale;

            // equivalent equation
            //tileX = - camera.x * game.scale + game.halfScreenX - 16384 * game.scale,
            //tileY = - camera.y * game.scale + game.halfScreenY - 8192 * game.scale;

            //sunOffset += SUN_SPEED;
            sunOffset = getOffsetSinceMidnight();
            cloudsOffset += CLOUDS_SPEED;
            
            sun.tilePosition.set(tileX - sunOffset * game.scale, tileY);
            clouds.tilePosition.set(tileX + cloudsOffset * game.scale, tileY);
            
            if (sunOffset >= 32768)
                sunOffset = 0;

            //snow.tilePosition.set (forest.tilePosition.x, forest.tilePosition.y);
            //snow_mask.position.set(map.children[2].position.x, map.children[2].position.y);
        });


        // Update layers when game resizes
        SWAM.on("rendererResized", (width, height) =>
        {
            sun.tileScale.set(8*game.scale);
            sun.width = game.screenX;
            sun.height = game.screenY;
    
            offsetX = - game.halfScreenX / game.scale + 16384,
            offsetY = - game.halfScreenY / game.scale + 8192;
    
    
            clouds.tileScale.set(CLOUDS_SCALE * game.scale);
            clouds.width = game.screenX;
            clouds.height = game.screenY;

            //snow.tileScale.set(game.scale, game.tileScale);
            //snow_mask.scale.set(8 * game.scale, 8 * game.scale);

            //snow.width = width + config.overdraw;
            //snow.height = height + config.overdraw;
        });

        setSettings();

        ticker.start();

        avoidBlackScreenAtStart();
    });

    // total hack to force redraw
    function avoidBlackScreenAtStart()
    {
        // let camera = Graphics.getCamera();
        // Graphics.setCamera(-100000, -100000);
        // setTimeout(()=>Graphics.setCamera(0, 0), 100);
        let optimize = config.overdrawOptimize;
        config.overdrawOptimize = false;
        setTimeout(()=>{
            config.overdrawOptimize = optimize;
        }, 500);
    }


	// Register
	SWAM.registerExtension({
		name: 'Weather Layers for StarMash',
		id: 'SWAM.Weather',
		description: 'Adds day/night cycles and clouds to Vanilla Theme.',
		author: 'Bombita',
		version: '0.1',
		settingsProvider: createSettingsProvider()
	});
}();
