// ------------------------------------------------------------------------
//   BASE THEME
// ------------------------------------------------------------------------
function BaseTheme()
{    
}
BaseTheme.prototype = {
    loadGameModules:    function() { loadGraphics_Default(); loadSounds_Default(); },
    start:              function(){},
    injectTextures:     function(files, textureInfo, flagTextureInfo, spriteInfo, textures){},
    injectSounds:       function(sounds){},
    settingsProvider: null
};

// ------------------------------------------------------------------------
//   HYPERSPACE EFFECT
// ------------------------------------------------------------------------

window.HyperSpace = function()
{
    this.sprite = null;

    let texture = PIXI.Texture.fromImage("hyperspace");
    this.sprite = new PIXI.Sprite(texture);
};

window.HyperSpace.prototype = {
    sprite: null,

    initialize: function() {
        let texture = PIXI.Texture.fromImage("hyperspace");
        this.sprite = new PIXI.Sprite(texture);
    },

    show: function(){
        let Me = this;
        let layers = game.graphics.layers;

        function showSprite(){
            for (name in layers)
            {
                if(name == "game")
                    continue;
                layers[name].prevVisible = layers[name].visible;
                layers[name].visible = false;
            }
    

            Me.sprite.width = game.screenX;
            Me.sprite.height = game.screenY;
    
            game.graphics.layers.game.addChild(Me.sprite);
        }
    
        function hideSprite()
        {
            for (name in layers)
            {
                if(name == "game")
                    continue;
                layers[name].visible = layers[name].prevVisible;
                delete layers[name].prevVisible;
            }


            game.graphics.layers.game.removeChild(Me.sprite);
            Me.sprite.filters = null;

            // // small hack to force redraw of map's buffer layer
            // let prev = config.overdrawOptimize;
            // config.overdrawOptimize = false;
            // setTimeout(function(){
            //     config.overdrawOptimize = prev;
            // }, 100);
            Graphics.renderbackground();
        }
    
        showSprite();

        let zoom = new PIXI.filters.ZoomBlurFilter(
            2, {
                x: game.halfScreenX,
                y: game.halfScreenY },
            0);

        let adjustment = new PIXI.filters.AdjustmentFilter ({
            gamma: 2,
            brightness: 2,
            alpha: 1
        });

        let loop = function ()
        {
            zoom.strength -= 0.03;
            if (adjustment.gamma > 1)
            {
                adjustment.gamma -=0.02;
                adjustment.brightness -=0.02;
                //adjustment.alpha -=0.01;
            }

            if (zoom.strength > 0) {
                setTimeout(function () {
                    loop();
                }, 10);
             }
             else {
                 zoom.strength = 0;
                 hideSprite();
            }
        }        
        this.sprite.filters = [zoom, adjustment];
        loop();
    }
};


// ------------------------------------------------------------------------
//   STARMASH V2 THEME
// ------------------------------------------------------------------------

function StarMash_2()
{
    SWAM.replaceCSS(getFilePath("style.css"));

    let defaultValues = {
        nebulas: {
            blue: true,
            green: true,
            red: true
        },
        asteroidLayers: 3,
        decorations: {
            stellar: true,
            planets: true,
            moons: true,
            ships: true
        }
    };

    let provider = new SettingsProvider(defaultValues, applySettings);
    provider.root = "";
    provider.title = "Mod Settings";
    let section = provider.addSection("Background");
    section.addButton("Generate New Background", {click: function(){SWAM.RandomizeBackground();}});
    section.addBoolean("nebulas.blue", "Blue nebulas");
    section.addBoolean("nebulas.green", "Green nebulas");
    section.addBoolean("nebulas.red", "Red nebulas");

    section = provider.addSection("Asteroid field");
    section.addValuesField("asteroidLayers", "Visible layers", {0: 0, 1: 1, 2: 2, 3: 3 });

    section = provider.addSection("Decorative objects");
    section.addBoolean("decorations.stellar", "Distant stellar objects");
    section.addBoolean("decorations.planets", "Planets");
    section.addBoolean("decorations.moons", "Moons");
    section.addBoolean("decorations.ships", "Ships");

    this.settingsProvider = provider;


    function applySettings(values)
    {
        let g = values;

        //Map Layers order:  F S SM R RM
        game.graphics.layers.map.children[0].alpha = 0.8;
        game.graphics.layers.map.children[0].visible = g.nebulas.blue;
    
        game.graphics.layers.map.children[2].alpha = 0.8;
        game.graphics.layers.map.children[2].visible = g.nebulas.green;
    
        game.graphics.layers.map.children[4].alpha = 0.8;
        game.graphics.layers.map.children[4].visible = g.nebulas.red;
    
        if (SWAM.planet)
            SWAM.planet.visible = g.decorations.planets;
    
        if (SWAM.ShipContainer)
            SWAM.ShipContainer.visible = g.decorations.ships;
    
        if (SWAM.asteroids1 && SWAM.asteroids2 && SWAM.asteroids3)
        {
            var asteroids = [SWAM.asteroids1, SWAM.asteroids2, SWAM.asteroids3];
            for (let i = 0; i < 3; i++)
                asteroids[i].visible = i < g.asteroidLayers;
        }
    
        Graphics.renderbackground();    // force refresh the background
    }
}
StarMash_2.themeName = "StarMash v.2";
StarMash_2.author = "Bombita";
StarMash_2.version = SWAM_version;


StarMash_2.prototype.start = function()
{
    game.graphics.layers.shadows.visible = false;
    game.graphics.layers.smoke.visible = false;

    // ------------------------------------------------------------------------
    //   BACKGROUND GENERATION
    // ------------------------------------------------------------------------

    SWAM.ShipContainer = null;

    SWAM.Ships = [];
    SWAM.Planets = [];
    SWAM.Moons = [];
    SWAM.Stellar = [];

    SWAM.Textures = {
    };

    let TextureInfo = {
        ImperialShips: {
            // scale:  size reduction of the generated sprite pack
            //         (this values is applied to the coordinates)
            scale: 1, 
            resultScale: 0.5, // scaling applied to the resulting texture
            useMask: true,
            maskScale: 2,   // how much scaling the mask needs
            items: {
                ISD_01: [0, 0, 1700, 583],
                ISD_02: [0, 2017, 1250, 803],
                ISD_03: [1701, 0, 1414, 741],
                ISD_04: [0, 1288, 1418, 728],
                ISD_05: [1419, 1566, 1109, 738],
                ISD_06: [1251, 2305, 913, 523],
                ISD_07: [1463, 742, 1409, 575],
                ISD_08: [0, 584, 1462, 703],
                Dread_01: [0, 2821, 925, 294],
                Dread_02: [2545, 1318, 657, 505],
                Dread_03: [1419, 1318, 1125, 247],
                Dread_04: [926, 2829, 711, 348]
            }
        },
        RebelShips: {
            // scale:  size reduction of the original sprite pack
            //         (this values is applied to the coordinates)
            scale: 0.5, 
            resultScale: 1,
            useMask: true,
            maskScale: 2,
            items: {
                CR90_1: [0, 2013, 591, 293],
                CR90_2: [0, 2307, 553, 180],
                CR90_3: [2911, 1381, 604, 214],
                CR90_4: [2038, 2005, 417, 407],
                CR90_5: [554, 2307, 402, 237],
                GR75_1: [592, 2013, 508, 264],
                GR75_2: [2467, 492, 738, 207],
                GR75_3: [2911, 1596, 601, 248],
                Liberty_1: [0, 1680, 1115, 332],
                Liberty_2: [1694, 0, 960, 464],
                Liberty_3: [1553, 465, 913, 537],
                M80_1: [0, 1369, 1515, 310],
                M80_2: [0, 462, 1552, 394],
                MonCalamari_1: [0, 0, 1693, 461],
                MonCalamari_2: [0, 857, 1547, 511],
                NebulonB1_1: [1548, 1003, 813, 433],
                NebulonB1_2: [1617, 1970, 420, 578],
                NebulonB1_3: [2655, 0, 794, 491],
                NebulonB1_4: [2296, 1437, 614, 567],
                NebulonB1_5: [1516, 1437, 779, 532],
                NebulonB2_1: [1116, 1970, 500, 660],
                NebulonC_1: [2467, 700, 680, 680]
            }
        },
    };

    let PlanetInfo = {};
    for (let i = 2; i <= 11; i++)
    {
        let number = ("0" + i).slice(-2);
        PlanetInfo["Planet" + number] = {
            texture: getFilePath("planets/planet" + number + ".jpg"),
            mask: getFilePath("planets/planet" + number + "-mask.jpg")
        };
    }

    // load resources
    let loader = new PIXI.loaders.Loader();
    loader.add("hyperspace", getFilePath("hyperspace.jpg"));

    loader.add("ImperialShips", getFilePath("ships/ships1.jpg"));
    loader.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg"));
    loader.add("RebelShips", getFilePath("ships/RebelShips1.jpg"));
    loader.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg"));


   
    loader.load((loader, resources) => {
        //SWAM.resizeMap(30000);
        LoadTextures();

        SWAM.RandomizeBackground();

        SWAM.asteroids3 = crateTileLayer("asteroids1", "asteroids3", game.scale/3);
        SWAM.asteroids2 = crateTileLayer("asteroids2", "asteroids2", game.scale);
        SWAM.asteroids1 = crateTileLayer("asteroids1", "asteroids1", game.scale);

        SWAM.hyperSpace = new HyperSpace();

        SWAM.loadSettings();
        //SWAM.Theme.settingsProvider.apply(SWAM.Settings);


        Graphics.setCamera(0, 0);
    });

    SWAM.RandomizeBackground = function(planetIndex = -1)
    {
        showRegenerateButton();
        randomizeTileMasks();
        createPlanet(planetIndex);
        createShips();
    };

    if (SWAM.debug)
        SWAM.ShowRegenerateButton = showRegenerateButton;

    function showRegenerateButton()
    {
        let divRegenerate = $("#regenerateBackground");

        if (divRegenerate.length == 0)
        {
            var template = getTemplate("#regenerateBackground");
            divRegenerate = $(template);
            $("body").append(divRegenerate);

            let btn = $("#btnRegenerate", divRegenerate);
            btn.click(function(){
                SWAM.RandomizeBackground();
            });
        }

        divRegenerate.slideDown();

        if (showRegenerateButton.timer)
            clearInterval(showRegenerateButton.timer);

        let bar = $(".timerIndicator", divRegenerate);

        showRegenerateButton.width = 100;
        bar.css("width", "100%");

        showRegenerateButton.timer = setInterval(function(){
            showRegenerateButton.width--;
            //bar.css("width", showRegenerateButton.width + "%");
            bar.animate({width: showRegenerateButton.width + "%"}, 90 );

            if (showRegenerateButton.width == 0)
            {
                clearInterval(showRegenerateButton.timer);
                delete showRegenerateButton.timer;

                divRegenerate.slideUp();
            }
        }, 100);
    }


    SWAM.MoveBackgroundTiles = true;
    function randomizeTileMasks()
    {
        // Note about mask layers:
        // invisible doesnt render AND ignore transformations (position, etc)
        // unrenderable doesnt render but ACCEPTS transformations
        
        let map = game.graphics.layers.map;
        let masks = [
            map.children[1],
            map.children[3],
            map.children[5]
        ];


        function masksVisible(value)
        {
            for (let i = 0; i < 3; i++)
                masks[i].visible = value;
        }
        function masksRenderable(value)
        {
            for (let i = 0; i < 3; i++)
                masks[i].renderable = value;
        }

        // this method moves the mask layers to a random position.
        // it needs:
        // masklayer.visible = true,   masklayer.renderable = false,
        // graphics.renderbackground  not moving the mask sprites
        function RandomPosition()
        {
            masksVisible(true);

            let maxX = config.mapWidth * game.scale - game.screenX / game.scale;
            let maxY = config.mapHeight * game.scale - game.screenY / game.scale;

            for (let i = 0; i < 3; i++)
            {
                map.children[i*2+1].position.set(
                    Tools.randInt(-maxX, 0),
                    Tools.randInt(-maxY, 0)
                );
            }
            
            Graphics.renderbackground();

            masksVisible(false);
        }

        // this method moves shuffles the masks
        // it needs:
        // masklayer.visible = true,   masklayer.renderable = false,
        function Shuffle()
        {    
            for (let i = 0; i < 3; i++)
            {
                map.children[i*2].mask = null;

                // choose and assign a random mask
                let index = Tools.randInt(0, masks.length - 1);
                map.children[i*2].mask = masks[index];
                
                if (SWAM.debug)
                    console.log(`${map.children[i*2].layerName}: ${masks[index].layerName}`);
            }

            // make sure all masks are unrenderable
            masksRenderable(true);
        }

        map.visible = false;

        Shuffle();
        RandomPosition();   // this is ignored if using movable mask

        map.visible = true;

        let movableBackground = (Tools.randInt(0,1) == 1);
        SWAM.MoveBackgroundTiles = movableBackground;
        masksRenderable(false);
        masksVisible(movableBackground);

        if (SWAM.debug)
            console.log("movable nebulas: " + movableBackground);
    }


    function LoadTextures()
    {
        for (let file in TextureInfo)
        {
            let info = TextureInfo[file];

            info.scale = info.scale || 1;

            let renderer = Graphics.renderer;
            let full_texture = PIXI.Texture.fromImage(file);
            let full_mask = null;
    
            
            if (info.useMask)
                full_mask = PIXI.Texture.fromImage(file + "_Mask");
    
            for (let t in info.items)
            {
                let item = info.items[t];
    
                let rawTexture = new PIXI.Texture(full_texture,
                    new PIXI.Rectangle(
                    item[0] * info.scale,
                    item[1] * info.scale,
                    item[2] * info.scale,
                    item[3] * info.scale));
                let rawSprite = new PIXI.Sprite(rawTexture);
    
                rawSprite.scale.set(info.resultScale, info.resultScale);
    
                var maskSprite = null;
                if (info.useMask)
                {
                    var maskScale = info.maskScale || 1;
                    var maskTexture = new PIXI.Texture(full_mask,
                        new PIXI.Rectangle(
                        item[0] * info.scale / maskScale,
                        item[1] * info.scale / maskScale,
                        item[2] * info.scale / maskScale,
                        item[3] * info.scale / maskScale));
                    var maskSprite = new PIXI.Sprite(maskTexture);
                    maskSprite.scale.set(maskScale, maskScale);
                    //maskSprite.alpha = 0.2;
    
                    rawSprite.addChild(maskSprite);
                    rawSprite.filters = [new PIXI.SpriteMaskFilter(maskSprite)];
                    maskSprite.position.set(-item[0]* info.scale, -item[1]* info.scale);
                }
    
                let texture = PIXI.RenderTexture.create(rawSprite.width, rawSprite.height);
    
                renderer.render(rawSprite, texture, true);
                //renderer.render(maskSprite, texture, false);
    
                SWAM.Textures[t] = texture;
            }
        }
    }

    function createSprite(id, options)
    {
        let texture = SWAM.Textures[id];
        let sprite = new PIXI.Sprite(texture);

        if (typeof options == "undefined")
            options = {};

        sprite.distanceFactor = options.distanceFactor ? options.distanceFactor : [1,1];
        sprite.basePosition = options.basePosition ? options.basePosition : [0, 0];

        options.position && sprite.position.set(options.position[0], options.position[1]);
        options.anchor && sprite.anchor.set(options.anchor[0], options.anchor[1]);
        options.pivot && sprite.pivot.set(options.pivot[0], options.pivot[1]);
        options.scale && (Array.isArray(options.scale) ? sprite.scale.set(options.scale[0], options.scale[1]) : sprite.scale.set(options.scale));
        options.rotation && (sprite.rotation = options.rotation);
        options.alpha && (sprite.alpha = options.alpha);
        options.blend && (sprite.blendMode = PIXI.BLEND_MODES[options.blend]);
        options.tint && (sprite.tint = options.tint);
        options.mask && (sprite.mask = options.mask);
        options.visible && (sprite.visible = options.visible);
        options.container && options.container.addChild(sprite);

        return sprite;
    }

    function createSpriteUpdatable(id, options)
    {
        if (typeof options == "undefined")
            options = {};

        let sprite = createSprite(id, options);

        sprite.distanceFactor = options.distanceFactor ? options.distanceFactor : [1, 1];
        sprite.basePosition = options.basePosition ? options.basePosition : [0, 0];

        sprite.update = function(cx, cy)
        {
            let camera = Graphics.getCamera();

            // cx is the pixel position on the screen for the 0,0 coordinate.
            //let x = (cx + sprite.basePosition[0]*game.scale) / sprite.distanceFactor[0];
            //let y = (cy + sprite.basePosition[1]*game.scale) / sprite.distanceFactor[1];
            //let x = (cx + sprite.basePosition[0]) / sprite.distanceFactor[0];
            let x = camera.x + (sprite.basePosition[0] - camera.x) / sprite.distanceFactor[0];
            let y = camera.y + (sprite.basePosition[1] - camera.y) / sprite.distanceFactor[1];

            sprite.position.set(x, y);
        };

        return sprite;
    }

    if (SWAM.debug)
        SWAM.createShips = createShips;

    function createShips()
    {
        function createFleet(options)
        {
            options = options || {};
            options.count = options.count || 12;
            options.x = options.x || [-14000, -10000];
            options.y = options.y || [-1000, 1000];
            options.radius = options.radius || [5000, 13000];
            options.baseDistanceFactor = options.baseDistanceFactor || 8;
            options.textures = options.textures || TextureInfo.ImperialShips.items;   

            var count = options.count;
            var textures = [];

            // temporary array for the random selection
            for (let i in options.textures)
                textures.push(i);

            // create the ships along a random radious of a circle
            // and at random distances from the camera... giving the impression
            // of a cluster arrangement
            let angleDelta = 2 * Math.PI / count;
            for (let i = 0, a = 0; i < count; i++, a+= angleDelta)
            {
                let radius = Tools.randInt(options.radius[0], options.radius[1]);
                let x = Tools.randInt(options.x[0], options.x[1]);
                let y = Tools.randInt(options.y[0], options.y[1]);
                //x = 0;
                //y = 0;

                //let pt = getCirclePoint(-10000, 0, radius, a);    // fixed center
                let pt = getCirclePoint(x, y, radius, a);           // random center
                x = pt.x;
                y = pt.y;

                let scale = Tools.rand(0.2, 0.85);
                let distanceModifier = (1 / (scale / 0.85)) * 0.5 + 0.5;

                let texture = textures[Tools.randInt(0, textures.length - 1)];
                let sprite = createSpriteUpdatable(
                    texture,
                {
                    //distanceFactor: [8, 6],
                    //distanceFactor: [8 * distanceModifier, 8 * distanceModifier],
                    distanceFactor: [
                        options.baseDistanceFactor * distanceModifier,
                        options.baseDistanceFactor * distanceModifier],
                    //scale: [(1 / game.scale) / 2, (1 / game.scale) / 2],
                    //scale: [0.5, 0.5],
                    scale: [scale, scale],
                    basePosition: [x, y],
                    position: [x, y],
                    anchor: [0.5,0.5]
                });

                sprite.textureName = texture;
                sprite.angleUsed = a;
                SWAM.Ships.push(sprite);
            }
        }

        var container = SWAM.ShipContainer;

        if (container == null)
        {
            container = new PIXI.Container();
            container.scale.set(game.scale, game.scale);
            game.graphics.layers.map.addChildAt(container, getDoodadsIndex());
            //game.graphics.layers.map.addChild(container);
            SWAM.ShipContainer = container;
        }
        else
        {
            //  if there were previous ships, erase them
            container.removeChildren();
            SWAM.Ships = [];
        }

        // Create imperial ships
        createFleet({
            count: 12,
            //baseDistanceFactor: 8,
            x: [-17000, -13000]
        });

        // Create imperial ships
        createFleet({
            count: 16,
            x: [13000, 17000],
            radius: [5000,10000],
            textures: TextureInfo.RebelShips.items
        });

        // sort by distance descending
        SWAM.Ships.sort(function(a, b)
        {
            return b.distanceFactor[0] - a.distanceFactor[0]
        });
        
        // add all ships to the container
        for (let sprite of SWAM.Ships)
            container.addChild(sprite);
    }

    function getViewPort()
    {
        let camera = Graphics.getCamera();
        let viewportX = camera.x - game.halfScreenX / game.scale;
        let viewportY = camera.y - game.halfScreenY / game.scale;
        return {
            x: viewportX,
            y: viewportY
        };
    }


    function getCirclePoint(cx, cy, r, a)
    {
        // Given a radius length r and an angle a in radians
        // and a circle's center (h,k), calculate the coordinates of a point
        // on the circumference:

        let x = r * Math.cos(a) + cx;
        let y = r * Math.sin(a) + cy;

        return {x: x, y: y};
    }

    // find doodads layer index, to insert before doodads
    function getDoodadsIndex()
    {
        let map = game.graphics.layers.map,
        doodads = game.graphics.layers.doodads;

        let index = 0;
        for(var i = 0; i < map.children.length; i++)
            if (map.children[i] == doodads)
                index = i;
        return index;
    }


    function crateTileLayer(img, name, scale)
    {
        var width = Graphics.renderer.width,// + config.overdraw,
            height = Graphics.renderer.height;// + config.overdraw;

            // divide by gamescale to compensate doodads scaling
        //let tile = Textures.tile(img, width / game.scale, height / game.scale);
        let tile = Textures.tile(img, width, height);
        
        tile.layerName = name;
        
        game.graphics.layers.map.addChildAt(tile, getDoodadsIndex());
        //game.graphics.layers.doodads.addChildAt(tile, 0);

        tile.tileScale.set(scale, scale);

        return tile;
    }

    function createPlanet(planetIndex = -1)
    {
        let planets = [];
        for (let planet in PlanetInfo)
            planets.push(planet);

        let index = Tools.randInt(0, planets.length - 1);
        if (planetIndex >= 0 && planetIndex < planets.length)
            index = planetIndex;

        //index = 4;

        let loader = new PIXI.loaders.Loader();
        loader.add(planets[index], PlanetInfo[planets[index]].texture);
        loader.add(planets[index] + "_Mask", PlanetInfo[planets[index]].mask);
        loader.load(PlanetLoaded);

        function PlanetLoaded()
        {
            let planet = createPlanet2Sprite(Graphics.renderer, planets[index]);

            planet.layerName = "planet";
    
            //planet.scaleModifier = 0.5; // para planet1
            //planet.scaleModifier = 0.7;
            planet.scaleModifier = Tools.rand(0.1, 0.65);
            //planet.scale.set(game.scale * planet.scaleModifier, game.scale * planet.scaleModifier);
            planet.scale.set(planet.scaleModifier * 0.5, planet.scaleModifier * 0.5);
    
            //planet.baseX = -16384;
            //planet.baseY = 8192 - planet.height;
 
            // the bigger the planet, the bigger I want the ranges for its base location
            let amplitude = planet.scaleModifier * 4;

            //planet.anchor.set(0.5,0.5);
            planet.basePosition = [
                // this numbers where obtained by just testing different values
                // for the extremes and seeing how it looked
                Tools.randInt(-25000, 70000),
                //Tools.randInt(-20000, 35000)
                Tools.randInt(-20000 * amplitude, 40000 * amplitude)
            ];
            planet.distanceFactor = [ 30, 30];

            if (SWAM.debug)
            {
                console.log("planet: " + planets[index]);
                console.log("planet scale: " + planet.scale.x.toFixed(2) + "    modifier: " + planet.scaleModifier.toFixed(2));
                console.log("planet pos: " + planet.basePosition[0] + ", " + planet.basePosition[1]);
            }
    
            // para planet2
            planet.update = function(cx, cy)
            {
                // cx is the pixel position on the screen for the 0,0 coordinate.
                // 10 is the distance factor
                // 16384*game.scale is the starting position (map's left border in this case)
    
                // this formula is for aligning the image at the bottom of the map  (the image is chopped there)
                //let y = (cy + 8192*game.scale - planet.height*game.scale - game.halfScreenY) / 10;
                //let y = (cy + 8192*game.scale - planet.height) / 10; // planet 2
                
                //these were the correct lines (bottom of the map):
                //let y = (cy + 8192*game.scale - planet.height) / 30 + game.halfScreenY ; // planet 2

                let x = (cx + planet.basePosition[0]*game.scale) / planet.distanceFactor[0];
                let y = (cy + planet.basePosition[1]*game.scale) / planet.distanceFactor[1];
    

                planet.position.set(x, y);
            }


            if (SWAM.planet != null)
                game.graphics.layers.map.removeChild(SWAM.planet);

            SWAM.planet = planet;
            //game.graphics.layers.map.addChildAt(SWAM.planet, getDoodadsIndex());
            game.graphics.layers.map.addChildAt(SWAM.planet, 6);

            //SWAM.BackgroundFactor = (config.mapWidth - SWAM.planet.width) / SWAM.planet.width * 2;

            // set map in intial position, and show it without waiting next background render
            let viewPort = getViewPort();
            planet.update(-viewPort.x * game.scale, -viewPort.y * game.scale);

            SWAM.loadSettings();
        }
        //PlanetLoaded();
    }

    /*function createRenderer()
    {
        var options = {
            autoResize: !0,
            clearBeforeRender: !1,
            preserveDrawingBuffer: !0
        };
        return new PIXI.WebGLRenderer(game.screenX, game.screenY, options);
    }*/

    function createPlanetSprite(renderer)
    {
        var pt = PIXI.Texture.fromImage("Planet01");
        var ps = new PIXI.Sprite(pt);
        
        var planetMask = PIXI.Sprite.fromImage("Planet01_mask");
        planetMask.scale.set(4,4);
        
        let texture = PIXI.RenderTexture.create(ps.width * 4, ps.height * 2);
        let planet = new PIXI.Sprite(texture);
        
        ps.addChild(planetMask);
        ps.filters = [new PIXI.SpriteMaskFilter(planetMask)];          
        
        ps.scale.set(2, 2);
        ps.position.set(0, 0);
        renderer.render(ps, texture);
        
        ps.scale.set(-2, 2);
        ps.position.set(ps.width*2, 0);
        renderer.render(ps, texture, false);

        planet.update = updatePlanet;
        
        return planet;
    }

    function createPlanet2Sprite(renderer, textureID)
    {
        var pt = PIXI.Texture.fromImage(textureID);
        var ps = new PIXI.Sprite(pt);
        
        var planetMask = PIXI.Sprite.fromImage(textureID + "_Mask");
        planetMask.scale.set(1,1);
        
        let texture = PIXI.RenderTexture.create(ps.width * 2, ps.height * 2);
        let planet = new PIXI.Sprite(texture);
        
        ps.addChild(planetMask);
        ps.filters = [new PIXI.SpriteMaskFilter(planetMask)];          
        
        ps.scale.set(2, 2);
        ps.position.set(0, 0);
        renderer.render(ps, texture);

        planet.update = updatePlanet;

        return planet;
    }

    SWAM.BackgroundFactor = 100;
    SWAM.resizeLayers = function(width, height)
    {
        //SWAM.BackgroundFactor = (config.mapWidth - SWAM.planet.width) / SWAM.planet.width * 2;

        let scaledWidth = width / game.scale;
        let scaledHeight = height / game.scale;

        if (SWAM.planet)
        {
            //SWAM.planet.scale.set(game.scale * SWAM.planet.scaleModifier * config.scalingFactor / 5000, game.scale * SWAM.planet.scaleModifier* config.scalingFactor / 5000);
        }

        if (SWAM.ShipContainer)
        {
            SWAM.ShipContainer.scale.set(game.scale, game.scale);
        }

        if (SWAM.asteroids1)
        {
            SWAM.asteroids1.width = width;
            SWAM.asteroids1.height = height;
        }
        if (SWAM.asteroids2)
        {
            SWAM.asteroids2.width = width;
            SWAM.asteroids2.height = height;
        }
        if (SWAM.asteroids3)
        {
            SWAM.asteroids3.width = width;
            SWAM.asteroids3.height = height;
        }
    };

    SWAM.doUpdates = true;

    SWAM.updateLayers = function(cx, cy, camera)
    { 
        if (!SWAM.doUpdates)
            return;

        if (!SWAM.Settings)
            return;

        if (SWAM.Settings.themes.StarMash_2.decorations.planets)
            this.planet && this.planet.update(cx, cy);

        if (SWAM.Settings.themes.StarMash_2.asteroidLayers > 0)
            this.updateAsteroids(cx, cy);

        //if (this.sd /*SWAM.Settings.themes.StarMash_2.asteroidLayers > 0*/)
        if (SWAM.Settings.themes.StarMash_2.decorations.ships && SWAM.ShipContainer)
        {
            SWAM.ShipContainer.position.set(cx, cy);
            
            if (SWAM.Ships)
            {
                for (let i in SWAM.Ships)
                    SWAM.Ships[i].update(cx, cy);
            }
        }
    };

    function updatePlanet (cx, cy)
    {
        var planet = SWAM.planet;

        let camera = Graphics.getCamera();
        
        let shsX = game.halfScreenX / game.scale; // scaled half screen
        let shsY = game.halfScreenY / game.scale;

        let viewportX = camera.x - shsX + 16384;
        //let viewportY = camera.y - shsY + 8192;
        
        //let dispX = config.mapWidth - planet.width; // this line if planet is in doodads layer
        let dispX = game.screenX - planet.width;
        let maxViewportX = config.mapWidth - game.screenX / game.scale;
        
        //let dispY = config.mapHeight / 2- planet.height;
        //let maxViewportY = maxCamY - game.screenY / game.scale;

        let x = viewportX * dispX / maxViewportX;
        //let y = viewportY * dispY / maxViewportY;

        // avoiding the if would have the same result
        // but i use this conditional, to optimize < 5000
        let absY = camera.y + 8192;
        let y = 0;
        if (absY < 5000)
        {
            //y = 8192;
            y = game.screenY;
        }
        else
        {
            // use this lines if planet is in doodads layer
            //let despY = 16384 - 5000 - shsY;  
            //let relY = absY - 5000;
            //y = camera.y + shsY - planet.height * relY / despY;

            let despY = config.mapHeight - shsY - 5000;
            let relY = absY - 5000;
            y = game.screenY - planet.height * relY / despY;
        }

        
        planet.position.set(x, y);
        //planet.position.set(x + planet.baseX, y); // use this line if planet is in doodads layer
    }

    SWAM.updateAsteroids = function(cx, cy)
    {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(cx/2, cy/2);
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(cx/4, cy/4);
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(cx/6, cy/6);
    };

    // -----------------------------------
    //    Setup player methods
    // -----------------------------------

    SWAM.on("playerAdded", function(player)
    {
        overridePlayerMethods(player);
    });

    SWAM.on("mobAdded", StarMash_2.mobAdded);

    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate);
};

// -----------------------------------
//    OTHER THEME METHODS

StarMash_2.prototype.injectTextures = function(files, textureInfo, flagTextureInfo, spriteInfo, textures)
{
    for(let i in files)
    {
        var str = files[i];
        str = str.replace("assets/", "");
        if (str.indexOf("?")>-1)
        {
            str = str.substr(0, str.indexOf("?"));
        }
        files[i] = getFilePath(str);
    }

    var myFiles = {
        map_forest_mask: getFilePath("map_forest_mask.jpg"),

        asteroids1: getFilePath("asteroids/asteroids1.png"),
        asteroids2: getFilePath("asteroids/asteroids2.png"),
        asteroids3: getFilePath("asteroids/asteroids3.png")
        //xwing: getFilePath("xwing.png"),
        //xwing32: getFilePath("xwing32.png"),
    };
    for(let i in myFiles)
        files[i] = myFiles[i];

    var myTextures = {
        /*xwing_00: ["xwing", [0, 0, 360, 360]],
        xwing_01: ["xwing", [361, 0, 360, 360]],
        xwing_02: ["xwing", [0, 361, 360, 360]],
        xwing_03: ["xwing", [361, 361, 360, 360]],
        xwing_04: ["xwing", [722, 0, 360, 360]],
        xwing_05: ["xwing", [722, 361, 360, 360]],
        xwing_06: ["xwing", [1083, 0, 360, 360]],
        xwing_07: ["xwing", [1083, 361, 360, 360]],
        xwing_08: ["xwing", [0, 722, 360, 360]],
        xwing_09: ["xwing", [0, 1083, 360, 360]],
        xwing_10: ["xwing", [361, 722, 360, 360]],
        xwing_11: ["xwing", [722, 722, 360, 360]],
        xwing_12: ["xwing", [361, 1083, 360, 360]],
        xwing_13: ["xwing", [722, 1083, 360, 360]],
        xwing_14: ["xwing", [1083, 722, 360, 360]],
        xwing_15: ["xwing", [1083, 1083, 360, 360]],*/
        /*xwing_00: ["xwing32", [0, 0, 360, 360]],
        xwing_01: ["xwing32", [361, 0, 360, 360]],
        xwing_02: ["xwing32", [0, 361, 360, 360]],
        xwing_03: ["xwing32", [361, 361, 360, 360]],
        xwing_04: ["xwing32", [722, 0, 360, 360]],
        xwing_05: ["xwing32", [722, 361, 360, 360]],
        xwing_06: ["xwing32", [1083, 0, 360, 360]],
        xwing_07: ["xwing32", [1444, 0, 360, 360]],
        xwing_08: ["xwing32", [1083, 361, 360, 360]],
        xwing_09: ["xwing32", [1444, 361, 360, 360]],
        xwing_10: ["xwing32", [0, 722, 360, 360]],
        xwing_11: ["xwing32", [361, 722, 360, 360]],
        xwing_12: ["xwing32", [0, 1083, 360, 360]],
        xwing_13: ["xwing32", [722, 722, 360, 360]],
        xwing_14: ["xwing32", [361, 1083, 360, 360]],
        xwing_15: ["xwing32", [1083, 722, 360, 360]],
        xwing_16: ["xwing32", [722, 1083, 360, 360]],
        xwing_17: ["xwing32", [1083, 1083, 360, 360]],
        xwing_18: ["xwing32", [1444, 722, 360, 360]],
        xwing_19: ["xwing32", [1444, 1083, 360, 360]],
        xwing_20: ["xwing32", [1805, 0, 360, 360]],
        xwing_21: ["xwing32", [2166, 0, 360, 360]],
        xwing_22: ["xwing32", [1805, 361, 360, 360]],
        xwing_23: ["xwing32", [2166, 361, 360, 360]],
        xwing_24: ["xwing32", [1805, 722, 360, 360]],
        xwing_25: ["xwing32", [2527, 0, 360, 360]],
        xwing_26: ["xwing32", [2527, 361, 360, 360]],
        xwing_27: ["xwing32", [2166, 722, 360, 360]],
        xwing_28: ["xwing32", [1805, 1083, 360, 360]],
        xwing_29: ["xwing32", [2166, 1083, 360, 360]],
        xwing_30: ["xwing32", [2527, 722, 360, 360]],
        xwing_31: ["xwing32", [2527, 1083, 360, 360]],*/

        ui_minimap_1: ["gui", [500, 596, 16, 16]],
        ui_minimap_2: ["gui", [516, 596, 16, 16]],
        ui_minimap_3: ["gui", [532, 596, 16, 16]],
        //ui_minimap_stealth: ["gui", [548, 596, 16, 16]],
        //ui_minimap_stealth_target: ["gui", [564, 596, 16, 16]],
        ui_minimap_target: ["gui", [580, 596, 16, 16]],

        spirit_2: ["aircraft", [4, 260, 512, 256]],
        tornado_2: ["aircraft", [524, 260, 256, 256]],
        raptor_2: ["aircraft", [788, 260, 256, 256]],
        prowler_2: ["aircraft", [1052, 260, 256, 256]],
        comanche_2: ["aircraft", [1316, 260, 128, 256]],

        sith_Infiltrator: ["aircraft", [1540, 4, 256, 256]],
        black_Xwing: ["aircraft", [1540, 260, 256, 256]],

        spirit_shadow_2: ["shadows", [4, 200, 256, 128]],
        tornado_shadow_2: ["shadows", [268, 200, 128, 128]],
        raptor_shadow_2: ["shadows", [540, 200, 128, 128]],
        prowler_shadow_2: ["shadows", [676, 200, 128, 128]],
        comanche_shadow_2: ["shadows", [812, 200, 64, 128]]
    };
    for(let i in myTextures)
        textureInfo[i] = myTextures[i];

    var mySprites = {
        minimap1: {
            texture: "ui_minimap_1",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .8
        },
        minimap2: {
            texture: "ui_minimap_2",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .8
        },
        minimap3: {
            texture: "ui_minimap_3",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .8
        },/*
        minimapStealth: {
            texture: "ui_minimap_stealth",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: .8,
            scale: .5
        },
        minimapStealthTarget: {
            texture: "ui_minimap_stealth_target",
            layer: "ui3",
            anchor: [.5, .5],
            alpha: 1,
            scale: .5
        },*/
        minimapTarget: {
            texture: "ui_minimap_target",
            layer: "ui3",
            anchor: [.5, .5],
            alpha: 1,
            scale: .5
        },

        //second vehicle set
        shipRaptor_2: {
            texture: "raptor_2",
            layer: "aircraft",
            anchor: [.5, .6]
        },
        shipRaptorShadow_2: {
            texture: "raptor_shadow_2",
            layer: "shadows",
            anchor: [.5, .57]
        },
        shipRaptorThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [.5, .1],
            scale: [.25, .25]
        },
        shipSpirit_2: {
            texture: "spirit_2",
            layer: "aircraft",
            anchor: [.5, .5]
        },
        shipSpiritShadow_2: {
            texture: "spirit_shadow_2",
            layer: "shadows",
            anchor: [.5, .5]
        },
        shipSpiritThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [.5, .1],
            scale: [.25, .25]
        },
        shipComanche_2: {
            texture: "comanche_2",
            layer: "aircraft",
            anchor: [.5, .4]
        },
        shipComancheShadow_2: {
            texture: "comanche_shadow_2",
            layer: "shadows",
            anchor: [.5, .43]
        },
        shipComancheRotor_2: {
            texture: "comanche_rotor",
            layer: "aircraft",
            anchor: [.5, .5],
            scale: [.25, .25]
        },
        shipComancheRotorShadow_2: {
            texture: "comanche_rotor_shadow",
            layer: "shadows",
            anchor: [.5, .5]
        },
        shipTornado_2: {
            texture: "tornado_2",
            layer: "aircraft",
            anchor: [.5, .65]
        },
        shipTornadoShadow_2: {
            texture: "tornado_shadow_2",
            layer: "shadows",
            anchor: [.5, .605]
        },
        shipProwler_2: {
            texture: "prowler_2",
            layer: "aircraft",
            anchor: [.5, .5]
        },
        shipProwlerShadow_2: {
            texture: "prowler_shadow_2",
            layer: "shadows",
            anchor: [.5, .5]
        }
    };
    for(let i in mySprites)
        spriteInfo[i] = mySprites[i];

    spriteInfo["missile"].scale = [.3, .3];
    spriteInfo["missileFat"].scale = [.2, .3];
    spriteInfo["missileSmall"].scale = [20, 20];
};
//StarMash_2.prototype.injectSounds = function(sounds){};

StarMash_2.mobAdded = function(data, existing, playerId)
{
    let mob = Mobs.get(data.id);
    let isProjectile = ($.inArray(mob.type, [1, 2, 3, 5, 6, 7]) > -1);

    if (isProjectile)
    {
        if (playerId)
        {
            //mob.playerId = playerId;
            var p = Players.get(playerId);
            if (p.graphicsSet == 0) {
                //mob.sprites.sprite.tint = 0x88FF88;
                //colorMatrix.hue(120);
            }
            else {
                //mob.sprites.sprite.tint = 0xFF8888;
                var colorMatrix = new PIXI.filters.ColorMatrixFilter();
                colorMatrix.hue(-110);
                mob.sprites.sprite.filters = [colorMatrix];
            }
        }
        else
        {
            // as i dont know the origin, treat it as enemy fire
            // if i'm imperial, make it a rebel laser
            if (game.myGraphicsSet == 0) {
                var colorMatrix = new PIXI.filters.ColorMatrixFilter();
                colorMatrix.hue(-110);
                mob.sprites.sprite.filters = [colorMatrix];
            }
        }

        mob.sprites.thruster.alpha = 0;
        mob.sprites.thrusterGlow.alpha = 1;
        mob.sprites.smokeGlow.alpha = 0;
        if (mob.type == 2)  // make fat missile bigger
        {
            mob.sprites.sprite.scale.set(.3, .4);
        }
        else if (mob.type == 3)  // make small missile bigger
        {
            mob.sprites.sprite.scale.set(.56, .4);
        }
    }
};

StarMash_2.onScoreboardUpdate = function(t, list, r)
{
    let leaders = SWAM.getLeaders();

    forEachPlayer((player)=>
    {
        let special = "", regular = "";
        let sprite = player.sprites.sprite;

        if (player.type == 1) //&& player.place == 1)
        {
            if (player.graphicsSet == 0)
            {
                regular = Textures.get("raptor");
                special = Textures.get("sith_Infiltrator");
            }
            else
            {
                regular = Textures.get("raptor_2");
                special = Textures.get("black_Xwing");
            }

            if (leaders[player.id]) // is a leader?
            {
                if (sprite.texture != special)
                    sprite.texture = special;
            }
            else
            {
                if (sprite.texture != regular)
                    sprite.texture = regular;
            }
        }
    });
};

function overridePlayerMethods(player)
{
    player.setGraphicsSet = function()
    {
        if (game.gameType == 2)
        {
            this.graphicsSet = this.team - 1;
        }
        else
        {
            if (this.id == game.myID && game.chosenGraphicsSet != -1)
                this.graphicsSet = game.chosenGraphicsSet;
            else
                this.graphicsSet = Tools.randInt(0, 1);
        }

        if (this.id == game.myID)
            game.myGraphicsSet = this.graphicsSet;
    };

    player.setupThrusterColor = function() {
        var colorMatrix = new PIXI.filters.ColorMatrixFilter();
        var satu = new PIXI.filters.ColorMatrixFilter();
        if (this.graphicsSet == 0) {
            colorMatrix.hue(-20);
        }
        else {
            satu.saturate(1, true);
            colorMatrix.hue(+165);
        }
        if (this.sprites.thruster) this.sprites.thruster.filters = [satu, colorMatrix];
        if (this.sprites.thruster1) this.sprites.thruster1.filters = [satu, colorMatrix];
        if (this.sprites.thruster2) this.sprites.thruster2.filters = [satu, colorMatrix];
    };    

    player.setupGraphics = function(e) {
        this.setGraphicsSet();
        var teamSprite = this.graphicsSet == 0 ? "" : "_2";

        var t = null;
        switch (this.me() && (t = {
            layer: "aircraftme"
        }),
        this.sprites.powerup = Textures.init("powerupShield", {
            visible: !1,
            alpha: .75
        }),
        this.sprites.powerupCircle = Textures.init("powerupCircle", {
            visible: !1,
            alpha: .75
        }),
        this.type) {
        case 1:
            this.state.baseScale = .25;
            this.state.nameplateDist = 60;
            this.sprites.sprite = Textures.init("shipRaptor" + teamSprite, t);
            this.sprites.shadow = Textures.init("shipRaptorShadow" + teamSprite, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            });
            this.sprites.thruster = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thrusterGlow = Textures.init("thrusterGlowSmall");
            this.sprites.thrusterShadow = Textures.init("thrusterShadow");
            break;
        case 2:
            this.state.baseScale = .35;
            this.state.nameplateDist = 60;
            this.sprites.sprite = Textures.init("shipSpirit" + teamSprite, t);
            this.sprites.shadow = Textures.init("shipSpiritShadow" + teamSprite, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            });
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow");
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 3:
            this.state.baseScale = .25;
            this.state.nameplateDist = 60;
            this.sprites.sprite = Textures.init("shipComanche" + teamSprite, t);
            this.sprites.rotor = Textures.init("shipComancheRotor" + teamSprite, t);
            this.sprites.shadow = Textures.init("shipComancheShadow" + teamSprite, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            });
            this.sprites.rotorShadow = Textures.init("shipComancheRotorShadow" + teamSprite, {
                scale: 2 * this.state.baseScale * (2.4 / config.shadowScaling)
            });
            break;
        case 4:
            this.state.baseScale = .28;
            this.state.nameplateDist = 60;
            this.sprites.sprite = Textures.init("shipTornado" + teamSprite, t);
            this.sprites.shadow = Textures.init("shipTornadoShadow" + teamSprite, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            });
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow");
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 5:
            this.state.baseScale = .28;
            this.state.nameplateDist = 60;
            this.sprites.sprite = Textures.init("shipProwler" + teamSprite, t);
            this.sprites.shadow = Textures.init("shipProwlerShadow" + teamSprite, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            });
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + teamSprite);
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall");
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow");
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow")
        }
        if (typeof window.Glow == 'function') Glow(this);
        this.setupThrusterColor();

        if (this.reel || e || (this.setupNameplate(),
        this.setupChatBubbles(),
        null != this.level && this.setupLevelPlate()),
        config.debug.collisions) {
            this.col = new PIXI.Graphics;
            for (var n of config.ships[this.type].collisions)
                this.col.beginFill(16777215, .2),
                this.col.drawCircle(n[0], n[1], n[2]),
                this.col.endFill();
            game.graphics.layers.explosions.addChild(this.col)
        }
    };

    player.reteam = function(e) {
        var oldTeam = this.team;

        this.team = e;
        this.sprites.name.style = new PIXI.TextStyle(this.nameplateTextStyle());
        UI.changeMinimapTeam(this.id, this.team);


        // change graphics set (imperial/rebel)
        if (oldTeam != this.team)
        {
            this.destroy(!1);
            this.setupGraphics(!0);
            this.visibilityUpdate(!0);
        };
    };

    player.updateGraphics = function(e) {
        var t = Tools.oscillator(.025, 1e3, this.randomness) * this.scale
          , n = 1.5 * this.state.thrustLevel
          , r = this.rot
          , i = Graphics.shadowCoords(this.pos);
        if (Graphics.transform(this.sprites.sprite, this.pos.x, this.pos.y, r, t * this.state.baseScale, t * this.state.baseScale),
        Graphics.transform(this.sprites.shadow, i.x, i.y, r, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale),
        this.powerupActive) {
            var o = .35 * (0 == this.state.powerupFadeState ? 2 * (1 - this.state.powerupFade) + 1 : 1 - this.state.powerupFade) * Tools.oscillator(.075, 100, this.randomness)
              , s = .75 * (0 == this.state.powerupFadeState ? Tools.clamp(2 * this.state.powerupFade, 0, 1) : Tools.clamp(1 - 1.3 * this.state.powerupFade, 0, 1)) * this.alpha;
            Graphics.transform(this.sprites.powerup, this.pos.x, this.pos.y - 80, 0, o, o, s),
            Graphics.transform(this.sprites.powerupCircle, this.pos.x, this.pos.y - 80, this.state.powerupAngle, 1.35 * o, 1.35 * o, s)
        }
        var a = Tools.oscillator(.1, .5, this.randomness)
          , l = Math.abs(this.state.thrustLevel) < .01 ? 0 : this.state.thrustLevel / 2 + (this.state.thrustLevel > 0 ? .5 : -.5)
          , u = Tools.clamp(2 * Math.abs(this.state.thrustLevel) - .1, 0, 1);
        if (this.graphicsSet == 0) {    // imperial
            switch (this.type) {
                case 1:
                        Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-r) * (5 * t), this.pos.y + Math.cos(-r) * (5 * t), r + (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                        this.sprites.thruster.alpha = 0.05,
                        //Graphics.transform(this.sprites.thrusterShadow, i.x + Math.sin(-r) * (20 * t) / config.shadowScaling, i.y + Math.cos(-r) * (20 * t) / config.shadowScaling, r + (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-r - .5 * this.state.thrustDir) * (40 * t), this.pos.y + Math.cos(-r - .5 * this.state.thrustDir) * (40 * t), null, 1.5 * n * this.scale, 1 * n * this.scale, .3 * this.state.thrustLevel);
                    break;
                case 2:
                    this.state.thrustLevel < 0 && (a *= .7),
                        Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - .5) * (15 * t), this.pos.y + Math.cos(-r - .5) * (15 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale, .6 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.5 - r) * (15 * t), this.pos.y + Math.cos(.5 - r) * (15 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale, .6 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .5) * (10 * t) / config.shadowScaling, i.y + Math.cos(-r - .5) * (10 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .5 * a * l * this.scale * (4 / config.shadowScaling), .6 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.5 - r) * (10 * t) / config.shadowScaling, i.y + Math.cos(.5 - r) * (10 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .5 * a * l * this.scale * (4 / config.shadowScaling), .6 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .3) * (50 * t), this.pos.y + Math.cos(-r - .3) * (50 * t), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                        Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - r) * (50 * t), this.pos.y + Math.cos(.3 - r) * (50 * t), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                    break;
                case 3:
                        Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, t * this.state.baseScale * 2, t * this.state.baseScale * 2, .8),
                        Graphics.transform(this.sprites.rotorShadow, i.x, i.y, this.state.thrustDir, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale * 2, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale * 2);
                    break;
                case 4:
                    this.state.thrustLevel < 0 && (a *= .7),
                        Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - .25) * (5 * t), this.pos.y + Math.cos(-r - .25) * (5 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.25 - r) * (5 * t), this.pos.y + Math.cos(.25 - r) * (5 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .15) * (28 * t) / config.shadowScaling, i.y + Math.cos(-r - .15) * (28 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.15 - r) * (28 * t) / config.shadowScaling, i.y + Math.cos(.15 - r) * (28 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .2) * (45 * t), this.pos.y + Math.cos(-r - .2) * (45 * t), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                        Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - r) * (45 * t), this.pos.y + Math.cos(.2 - r) * (45 * t), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                    break;
                case 5:
                    this.state.thrustLevel < 0 && (a *= .7),
                        Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - .35) * (20 * t), this.pos.y + Math.cos(-r - .35) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .4 * a * l * this.scale, u * this.alpha),
                        Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.35 - r) * (20 * t), this.pos.y + Math.cos(.35 - r) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .4 * a * l * this.scale, u * this.alpha),
                        Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .35) * (20 * t) / config.shadowScaling, i.y + Math.cos(-r - .35) * (20 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .4 * a * l * this.scale * (4 / config.shadowScaling), u * this.alpha / 2.5),
                        Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.35 - r) * (20 * t) / config.shadowScaling, i.y + Math.cos(.35 - r) * (20 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .4 * a * l * this.scale * (4 / config.shadowScaling), u * this.alpha / 2.5),
                        Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .2 - 0 * this.state.thrustDir) * (35 * t), this.pos.y + Math.cos(-r - .2 - 0 * this.state.thrustDir) * (35 * t), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                        Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - r - 0 * this.state.thrustDir) * (35 * t), this.pos.y + Math.cos(.2 - r - 0 * this.state.thrustDir) * (35 * t), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha)
            }
        }
        else {
            switch (this.type) {    // rebel
                case 1:
                    Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-r) * (20 * t), this.pos.y + Math.cos(-r) * (20 * t), r + (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                    Graphics.transform(this.sprites.thrusterShadow, i.x + Math.sin(-r) * (20 * t) / config.shadowScaling, i.y + Math.cos(-r) * (20 * t) / config.shadowScaling, r + (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                    Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-r - .5 * this.state.thrustDir) * (40 * t), this.pos.y + Math.cos(-r - .5 * this.state.thrustDir) * (40 * t), null, 1.5 * n * this.scale, 1 * n * this.scale, .3 * this.state.thrustLevel);
                    this.sprites.thruster.scale.x = this.sprites.thruster.scale.y = 0.25;
                    break;
                case 2:
                    this.state.thrustLevel < 0 && (a *= .7);
                    //Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - .5) * (32 * t), this.pos.y + Math.cos(-r - .5) * (32 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale, .6 * a * l * this.scale, u);
                    Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.8 - r) * (50 * t), this.pos.y + Math.cos(.8 - r) * (50 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale, .6 * a * l * this.scale, u);
                    //Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .5) * (32 * t) / config.shadowScaling, i.y + Math.cos(-r - .5) * (32 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .5 * a * l * this.scale * (4 / config.shadowScaling), .6 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5);
                    Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.5 - r) * (32 * t) / config.shadowScaling, i.y + Math.cos(.5 - r) * (32 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .5 * a * l * this.scale * (4 / config.shadowScaling), .6 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5);
                    //Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .3) * (50 * t), this.pos.y + Math.cos(-r - .3) * (50 * t), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                    Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - r) * (50 * t), this.pos.y + Math.cos(.3 - r) * (50 * t), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                    this.sprites.thruster1.visible = false;
                    this.sprites.thruster1Glow.visible = false;
                    this.sprites.thruster1Shadow.visible = false;
                    break;
                case 3:
                    Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, t * this.state.baseScale * 2, t * this.state.baseScale * 2, .8),
                        Graphics.transform(this.sprites.rotorShadow, i.x, i.y, this.state.thrustDir, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale * 2, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale * 2);
                    break;
                case 4:
                    this.state.thrustLevel < 0 && (a *= .7),
                        Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - 1) * (20 * t), this.pos.y + Math.cos(-r - 1) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(1 - r) * (20 * t), this.pos.y + Math.cos(1 - r) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .5 * a * l * this.scale, u),
                        Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .15) * (28 * t) / config.shadowScaling, i.y + Math.cos(-r - .15) * (28 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.15 - r) * (28 * t) / config.shadowScaling, i.y + Math.cos(.15 - r) * (28 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale * (4 / config.shadowScaling), .5 * a * l * this.scale * (4 / config.shadowScaling), u / 2.5),
                        Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .2) * (45 * t), this.pos.y + Math.cos(-r - .2) * (45 * t), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                        Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - r) * (45 * t), this.pos.y + Math.cos(.2 - r) * (45 * t), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                        this.sprites.thruster1.scale.x = this.sprites.thruster1.scale.y = 0.35;
                        this.sprites.thruster2.scale.x = this.sprites.thruster2.scale.y = 0.35;
                    break;
                case 5:
                    this.state.thrustLevel < 0 && (a *= .7),
                        Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-r - .30) * (20 * t), this.pos.y + Math.cos(-r - .35) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .4 * a * l * this.scale, u * this.alpha),
                        Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.30 - r) * (20 * t), this.pos.y + Math.cos(.35 - r) * (20 * t), r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .3 * a * l * this.scale, .4 * a * l * this.scale, u * this.alpha),
                        Graphics.transform(this.sprites.thruster1Shadow, i.x + Math.sin(-r - .35) * (20 * t) / config.shadowScaling, i.y + Math.cos(-r - .35) * (20 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .4 * a * l * this.scale * (4 / config.shadowScaling), u * this.alpha / 2.5),
                        Graphics.transform(this.sprites.thruster2Shadow, i.x + Math.sin(.35 - r) * (20 * t) / config.shadowScaling, i.y + Math.cos(.35 - r) * (20 * t) / config.shadowScaling, r + .5 * (this.state.thrustLevel > 0 ? this.state.thrustDir : 0), .4 * a * l * this.scale * (4 / config.shadowScaling), .4 * a * l * this.scale * (4 / config.shadowScaling), u * this.alpha / 2.5),
                        Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-r - .2 - 0 * this.state.thrustDir) * (35 * t), this.pos.y + Math.cos(-r - .2 - 0 * this.state.thrustDir) * (35 * t), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                        Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - r - 0 * this.state.thrustDir) * (35 * t), this.pos.y + Math.cos(.2 - r - 0 * this.state.thrustDir) * (35 * t), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha)
            }
        }
        this.updateNameplate(),
        this.state.bubble && this.updateBubble(),
        config.debug.collisions && this.col && (this.col.position.set(this.pos.x, this.pos.y),
        this.col.rotation = this.rot)
    };

    // force regenerate graphics:
    player.resetGraphics = function()
    {
        try{
            this.destroy(!1);
            this.setupGraphics(!0);
            this.visibilityUpdate(!0);
        }
        catch(e)
        {}
    };

    player.resetGraphics();
    
    // set the correct ui icons
    if (player.me())
        UI.aircraftSelected(player.type);
};

StarMash_2.prototype.loadGameModules = function()
{
    //loadGraphics_Default();
    loadGraphics_SWAM();

    //loadSounds_Default();
    loadSounds_SWAM();
};

// ------------------------------------------------------------------------
//   StarMash V1 THEME
// ------------------------------------------------------------------------


function StarMash_1()
{
    SWAM.replaceCSS(getFilePath("style.css"));

    let defaultValues = {
        nebulas: {
            blue: true,
            green: true,
            red: true
        }
    };

    let provider = new SettingsProvider(defaultValues, applySettings);
    provider.root = "";
    provider.title = "Mod Settings";
    let section = provider.addSection("General");
    section.addBoolean("nebulas.blue", "Blue nebulas");
    section.addBoolean("nebulas.green", "Green nebulas");
    section.addBoolean("nebulas.red", "Red nebulas");

    this.settingsProvider = provider;


    function applySettings(values)
    {
        let g = values;

        //Map Layers order:  F S SM R RM
        game.graphics.layers.map.children[0].alpha = 0.8;
        game.graphics.layers.map.children[0].visible = g.nebulas.blue;
    
        game.graphics.layers.map.children[2].alpha = 0.8;
        game.graphics.layers.map.children[2].visible = g.nebulas.green;
    
        game.graphics.layers.map.children[4].alpha = 0.8;
        game.graphics.layers.map.children[4].visible = g.nebulas.red;
    
        Graphics.renderbackground();    // force refresh the background
    }
}
StarMash_1.themeName = "StarMash v.1, no Parallax";
StarMash_1.author = "Bombita";
StarMash_1.version = SWAM_version;

StarMash_1.prototype.start = function()
{
    SWAM.BackgroundFactor = 1;
    SWAM.MoveBackgroundTiles = true;

    config.overdraw = 256;
    config.overdrawOptimize = true;

    game.graphics.layers.shadows.visible = false;
    game.graphics.layers.smoke.visible = false;

    /*SWAM.updateLayers = function(cx, cy, camera)
    {
    };

    SWAM.resizeLayers = function(width, height)
    {
    };*/

    SWAM.on("playerAdded", function(player)
    {
        overridePlayerMethods(player);
    });

    SWAM.on("mobAdded", StarMash_2.mobAdded);

    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate);

    SWAM.Theme.settingsProvider.apply(SWAM.Settings);
};

// -----------------------------------
//    OTHER THEME METHODS

StarMash_1.prototype.getFilePath = StarMash_2.prototype.getFilePath = function(file)
{
    return "/assets/" + file + "?" + SWAM_version;
};

StarMash_1.prototype.injectTextures = StarMash_2.prototype.injectTextures;
StarMash_1.prototype.loadGameModules = StarMash_2.prototype.loadGameModules;
//StarMash_1.prototype.injectSounds = StarMash_2.prototype.injectSounds;



// ------------------------------------------------------------------------
//   VANILLA THEME
// ------------------------------------------------------------------------


function VanillaTheme()
{
    let defaultValues = {
        map: {
            sea: true,
            forest: true,
            sand: true,
            rock: true,
            polygons: true
        },
        layers: {
            shadows: true,
            smoke: true,
        }
    };

    let provider = new SettingsProvider(defaultValues, applySettings);
    provider.root = "";
    provider.title = "Mod Settings";
    let section = provider.addSection("Background");
    section.addBoolean("map.sea", "Sea depth");
    section.addBoolean("map.forest", "Forest");
    section.addBoolean("map.sand", "Sand");
    section.addBoolean("map.rock", "Rocks");
    section.addBoolean("map.polygons", "Continents");
    //section = provider.addSection("Other Layers");
    section.addBoolean("layers.shadows", "Shadows");
    section.addBoolean("layers.smoke", "Missile's Smoke");

    this.settingsProvider = provider;

    function applySettings(values)
    {
        let v = values;

        let sea = game.graphics.layers.sea;
        //let sea_sprite = sea.children[0];
        let sea_mask = sea.children[1];
        
        let map = game.graphics.layers.map;
        let forest = map.children[0];
        let sand = map.children[1];
        let rock = map.children[3];
        //let doodads = map.children[5];
        let polygons = map.children[6];
    
        if (v && v.map)
        {
            //Map Layers order:  F S SM R RM D P
    
            sea_mask.visible = v.map.sea;
            forest.visible = v.map.forest;
    
            // if the forest is visible and there are no continents,
            // the sea is hidden by the forest, so i hide the sea as a small optimization
            if (v.map.forest && !v.map.polygons)
                sea.visible = false;
            else
                sea.visible = true;
    
            sand.visible = v.map.sand;
            rock.visible = v.map.rock;
    
            function setPolygonsVisibility()
            {
                polygons = map.children[6];
    
                if (!v.map.polygons)
                {
                    map.mask = null;
                    polygons.visible = false;
                }
                else
                {
                    polygons.visible = true;
                    map.mask = polygons;
                }
            }
    
            // do it if polygons are already loaded
            if (polygons)
            {
                setPolygonsVisibility();
            }
            else
            {
                // on page load, 
                // keep waiting till polygones have loaded to set their visibility
                let polygonsLoaded = setInterval(function(){
                    if (game.graphics.layers.map.children[6])
                    {
                        clearInterval(polygonsLoaded);
                        setPolygonsVisibility();
                    }
                }, 500);
            }
        }
    
        if (v && v.layers)
        {
            game.graphics.layers.shadows.visible = v.layers.shadows;
            game.graphics.layers.smoke.visible = v.layers.smoke;
        }
    }
};
VanillaTheme.themeName = "Vanilla Theme";
VanillaTheme.author = "Bombita";
VanillaTheme.version = SWAM_version;

VanillaTheme.prototype.start = function()
{
    // config.overdraw = 256;
    // config.overdrawOptimize = true;

    // SWAM.updateLayers = function(cx, cy, camera)
    // {
    // };

    // SWAM.resizeLayers = function(width, height)
    // {
    // };
    var Me = this;

    SWAM.on("playerAdded", function(player)
    {
        Me.tintPlayer(player);

        let player_setupGraphics = player.setupGraphics;
        player.setupGraphics = function(e) {
            player_setupGraphics.call(player, e);
            Me.tintPlayer(player);
        };

        let player_reteam = player.reteam;
        player.reteam = function(team) {
            player_reteam.call(player, team);
            Me.tintPlayer(player);
        };
    });

    SWAM.on("mobAdded", function(data, existing, playerId)
    {
        let mob = Mobs.get(data.id);
        let isProjectile = ($.inArray(mob.type, [1, 2, 3, 5, 6, 7]) > -1);
    
        if (isProjectile)
        {
            if (game.gameType == 2)
            {
                if (playerId)
                {
                    //mob.playerId = playerId;
                    var p = Players.get(playerId);
                    if (p.team == 1) {
                        mob.sprites.sprite.tint = 0x5555FF;
                        mob.sprites.thruster.tint = 0x5555FF;
                    }
                    else {
                        mob.sprites.sprite.tint = 0xFF5555;
                        mob.sprites.thruster.tint = 0xFF5555;
                    }
                }
                else
                {
                    // as i dont know the origin, treat it as enemy fire
                    // if i'm red, make it blue and viceversa
                    if (Players.getMe().team == 1) {
                        mob.sprites.sprite.tint = 0xFF5555;
                        mob.sprites.thruster.tint = 0xFF5555;
                    }
                    else {
                        mob.sprites.sprite.tint = 0x5555FF;
                        mob.sprites.thruster.tint = 0x5555FF;
                    }
                }    
            }

            //mob.sprites.thruster.alpha = 0;
            //mob.sprites.thrusterGlow.alpha = 1;
            mob.sprites.smokeGlow.alpha = 0;
            if (mob.type == 2)  // make fat missile bigger
            {
                mob.sprites.sprite.scale.set(.3, .4);
            }
            else if (mob.type == 3)  // make small missile bigger
            {
                mob.sprites.sprite.scale.set(.56, .4);
            }
            else
            {
                mob.sprites.sprite.scale.set(.3, .3);
            }
        }    
    });

    SWAM.Theme.settingsProvider.apply(SWAM.Settings);
}

VanillaTheme.prototype.tintPlayer = function(player)
{
    if(player.team == 1)
    {
        player.sprites.sprite.tint = 0xA0D0FF;
    }
    else if(player.team == 2)
    {
        player.sprites.sprite.tint = 0xFFB0B0;
    }
    else
        player.sprites.sprite.tint = 0xFFFFFF;
};

// -----------------------------------
//    OTHER THEME METHODS

VanillaTheme.prototype.getFilePath = function(file)
{
    return "/assets/" + file + "?" + SWAM_version;
};

VanillaTheme.prototype.injectTextures = function(files, textureInfo, flagTextureInfo, spriteInfo, textures){};
VanillaTheme.prototype.injectSounds = function(sounds){};

VanillaTheme.prototype.loadGameModules = function()
{
    loadGraphics_Default();
    //loadGraphics_SWAM();

    loadSounds_Default();
    //loadSounds_SWAM();
};


// ------------------------------------------------------------------------
//   REGISTRATION
// ------------------------------------------------------------------------



SWAM.registerExtension({
    name: "StarMash Themes",
    id: "StarMashThemes",
    author: "Bombita",
    version: SWAM_version,
    themes: [
        VanillaTheme,
        StarMash_1,
        StarMash_2
    ],
    dependencies: [
        //"https://cdn.jsdelivr.net/npm/pixi-filters@2.5.0/dist/pixi-filters.js"
    ]
});