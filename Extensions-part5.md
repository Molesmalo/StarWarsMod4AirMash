![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# StarMash - Extensions and Themes - Part 5 - Advanced Themes

This is a guide for the creation of extensions and themes for the [StarMash Mod](https://molesmalo.github.io/StarWarsMod4AirMash/) for [AirMash](https://airma.sh).

Read this if you are interested in creating your own features and themes for AirMash.

This is part 5 of a multi-part tutorial.

[StarMash - Extensions and Themes - Part 1 - Introduction](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1).

[StarMash - Extensions and Themes - Part 2 - Basic Extension](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part2).

[StarMash - Extensions and Themes - Part 3 - Settings](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3).

[StarMash - Extensions and Themes - Part 4 - Themes](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part4).

**StarMash - Extensions and Themes - Part 5 - Advanced Themes**

&nbsp;

In part 5, you will learn:

- How to build super simple themes with almost no coding.
- Assets and Textures used by AirMash.
- A little about how AirMash's graphics work.

&nbsp;

# A graphics library called PixiJS

Before we start building our first Theme, we should take a look at how AirMash's graphics are built.

AirMash uses an open source JavaScript graphics library called [PixiJS](http://www.pixijs.com/) to render its graphics. As Pixi's page put it:

> PixiJS is a rendering library that will allow you to create rich, interactive graphics, cross platform applications, and games without having to dive into the WebGL API or deal with browser and device compatibility.

> The PixiJS renderer allows everyone to enjoy the power of hardware acceleration without prior knowledge of WebGL.

This means PixiJS it's a __fast and easy__ way of creating 2D animated and/or interactive graphics into a web page.

A good way of taking our first steps using PixiJS is going to [PixiJS's documentation page](http://pixijs.download/dev/docs/index.html), where it lists some pages and tutorials. 

Specially useful are the examples [here](http://pixijs.io/examples/#/basics/basic.js) and [here](https://github.com/pixijs/pixi.js/).

Those sites contain lots of basic examples that will show you the very basics of using this library.

&nbsp;

# AirMash and PixiJS

There are a couple of specially important classes in PIXI that are heavily used by the game.

- [WebGLRenderer](http://pixijs.download/dev/docs/PIXI.WebGLRenderer.html)
- [Texture](http://pixijs.download/dev/docs/PIXI.Texture.html)
- [Container](http://pixijs.download/dev/docs/PIXI.Container.html)
- [Sprite](http://pixijs.download/dev/docs/PIXI.Sprite.html)
- [TilingSprite](http://pixijs.download/dev/docs/PIXI.extras.TilingSprite.html)

I will not describe them here, as the linked page's first lines are super simple and descriptive.

There are more classes, but these I think are the most important for you to take a look at this point.

AirMash uses a WebGLRenderer to manage the rendering process.

All textures are loaded when the game starts running. The files used are listed in Part 4 of this tutorial. 

The game then defines a series of Container objects, to use as layers. If you've used an application as Photoshop or Gimp, it's the same concept. They are (as the name implies) containers for other objects that can be nested one within the other. The end result, is that you end up with a stack of layers that will be rendered from the bottom to the top. 

Inside those containers you can then put your sprites (an image element that can be moved, scaled, etc) to create the final scene.

&nbsp;

# Modifying AirMash layers

AirMash creates the following containers when it starts:

> "game", "ui0", "ui1", "ui2", "ui3", "ui4", "hudHealth", "hudEnergy", "flags", "doodads", "map", "sea", "objects", "groundobjects", "fields", "shadows", "powerups", "crates", "aircraft", "aircraftme", "glows", "playernames", "bubbles", "thrusters", "projectiles", "smoke", "explosions"

The game then proceeds to organize them in a tree structure, adding more elements to the layers, like the `TilingSprites` for the background. Those are a special kind of sprites that repeat indefinitely an image when its `tilePosition` property is set.

From your code, you can access those `Container` objects using `game.graphics`.

We will not focus too much on every layer, but I want to comment on these Tiling elements, because they are the most likely targets for your editions.

The game creates four `TilingSprite` objects for the sea, grass, sand and rocks.

Also, a Sprite is used as a mask to alter the way those sprites are drawn. As I put in Part 4 of this tutorial:

- For sand and rock: 
> A grayscale image that represents the Masks used to draw rocks and sand on the background. The lighter the color, the more visible the sand/rock will be. The darker, the more transparent. White is fully visible, Black is fully transparent.

- For the sea:
> A grayscale image that represents the Mask used to draw the ocean's depth. The lighter the color, the lighter the water will be (shallow water/coast). Darker color means darker water (deep ocean). Please note that the shape of the continents is not defined by an image, but by a JSON file downloaded by the game. I will not cover here how to edit that.

- Forest (the grass) does not use a Sprite as mask. 

- Forest, Sand and Rock TilingSprites are contained inside a Container. This container in turn uses as mask to create the shape of continents. This mask is a vectorial objected (`PIXI.Graphics`) that is created using map data that is downloaded when the game starts. If you want, you can modify this mask by swapping it with your own, or remove it completely.


> **Note:** this applies for the __default Graphics Module__. StarMash themes utilize a modified Graphics module, where some of the layers are modified. For example, the 'sea' layer (the bottom most layer for the background rendering) that is used for the star field does not have a mask. But the equivalent of the 'forest' layer (the first tilelayer stacked over the sea) does, working then similar as sand and rock `TilingSprite`s works for the default theme. Also, the way those layers are updated is slightly different, to create a parallax effect.

So, how do we access those all layers?

I'll leave you here a little code snippet:

```js
    let sea = game.graphics.layers.sea; // sea Container
    let sea_sprite = sea.children[0];   // sea TilingSprite
    let sea_mask = sea.children[1];     // sea mask
    
    let map = game.graphics.layers.map; // land layers container
    let forest = map.children[0];       // forest TilingSprite
    let sand = map.children[1];         // sand TilingSprite
    let sand_mask = map.children[2];    // sand Mask
    let rock = map.children[3];         // rock TilingSprite
    let rock_mask = map.children[4];    // rock Mask
    //let doodads = map.children[5];      // Mountains and decorative objects
    let doodads = game.graphics.layers.doodads; // This layer can also be accessed this way
    let polygons = map.children[6];     // vectorial object used as forest mask
```

Please note that the vectorial mask is loaded asynchronously, so it takes a few seconds to be available when the game is first run.

So, for example, if you want to create your region, instead of a world map (for example, to create a map of Eastern Europe), you could replace `map.mask` with your own vectorial object (`PIXI.Graphics`) or an image (`PIXI.Sprite`).

Or, if you want a continuous land with no water, you can just set set:

```js
    map.mask = null;
    sea.visible = false;
    map.removeChild(polygons);
```

In this snippet, we set the sea mask to null so the land will be continuous, without water This is because the land is drawn on top of the water layer. If you do this, please help optimize the rendering process by setting `sea.visible = false;`. This makes the renderer skip this layer when drawing the scene.

As the polygons object is inside the map Container, we remove it permanently. Otherwise, as it stopped being used as a mask, it will now be a 'normal' object that will be drawn on our scene!

&nbsp;

# Adding your own layers

Until now, we just explored AirMash's default layers. But there are times when you want to create your own. For example, StarMash Themes create new layers for Ships, Planet and Asteroids.

> Please note that when you add new layers, you are adding complexity to the rendering process, so the rendering will make the GPU work more. In slow devices, or devices where the WebGL implementation is not very well optimized (like it seems to be the case for Macs), this will make the game heavier to render.

You add new layers by creating your own Containers and Sprites (or TilingSprites), and adding them as children of an AirMash layer like `game.graphics.game`.

You can either create the instances by yourself (check the PIXI tutorials) or by using AirMash's helper methods offered in by the `Textures` object.

For example:
- Textures.tile (textureName, width, height)
- Textures.sprite (textureName)
- Textures.init (textureName, spriteInfo)

# Injecting your own images and textures on game load

For loading our images, we have two alternatives:
- We can implement our own code, using a [PIXI.loaders.Loader](http://pixijs.download/dev/docs/PIXI.loaders.Loader.html) object. Here, we have full control of how we load the files, create our textures and sprites.

Then, we proceed to create our own textures and sprites as needed.


- Or we can let the game handle the loading of images and textures for us. Let's see how.

In Part 4 we created our themes by implementing a method called `injectTextures` in our theme class. Let's review this method's arguments:

**`injectTextures(files, textureInfo, flagTextureInfo, spriteInfo, textures)`**

It takes the following parameters:
- files:  object with [key/value] pairs for image files that will be loaded.
- textureInfo: object with [key/value] pairs for the textures (from which image get it, and an array containing [top left coordinate, top right coordinate, width, height] in pixels).
- flagTextureInfo: same as before, but for the flags.
- spriteInfo: object with [key/value] pairs with information about the sprites that will be used during the game.

If we want to add new files to load or replace existing ones, we will create set properties for the files object, like this:

```js
    files["fields"] = "https://www.example.com/fields.png",
    files["cities"] = "https://www.example.com/cities.png",
```

In this case, we are creating the properties 'cities' and 'fields' that contain the URLs for our files.

If we want to create new textures or replace existing ones, we set the properties for textureInfo, assigning an object that contains the information for our new texture. For example:

```js
    var myTextures = {
        ui_minimap_1: ["gui", [500, 596, 16, 16]],
        ui_minimap_2: ["gui", [516, 596, 16, 16]],
        ui_minimap_3: ["gui", [532, 596, 16, 16]],
        ui_minimap_target: ["gui", [580, 596, 16, 16]],
    };
    for(let i in myTextures)
        textureInfo[i] = myTextures[i];
```
Here, we are creating a temporal container object, and then we iterate over its properties to assign them as textureInfo properties.

Now observe the structure for each object containing the information for our textures. It's an array with two values:
- The first one is the name of file that contains the texture. Or saying it better, the name of the property in the `files` object that contains the URL for our file.  For example, in our previous example, the name would be 'fields' or 'cities'.
- The second is an array containing the pixel coordinates that correspond to our texture inside its image file: [x, y, width, height], with x and y being the top left pixel for our texture.

Then, we can access our texture using  `Textures.get("your_texture_name")`

&nbsp;

Finally, we can add or modify information about how the Sprites are created. We do this by modifying the spriteInfo object. For example, here we will add information for new sprite types:

```js
    var mySprites = {
        minimap1: {
            texture: "ui_minimap_1",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .25
        },
        minimap2: {
            texture: "ui_minimap_2",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .25
        },
        minimap3: {
            texture: "ui_minimap_3",
            layer: "ui2",
            anchor: [.5, .5],
            alpha: 1,
            scale: .25
        },
        minimapTarget: {
            texture: "powerup_circle",
            layer: "ui3",
            anchor: [.5, .5],
            alpha: 1,
            scale: .12
        }
    };
    for(let i in mySprites)
        spriteInfo[i] = mySprites[i];
```

We can define properties like: position, anchor, pivot, scale, rotation, alpha, blend, tint, mask, visible.

# Creating sprite instances

If you handled the loading of images and textures by yourself, then this is straightforward, just follow the PIXI tutorials and you'll be fine.

If on the other hand you used `injectTextures` to make the game handle the loading and creation of textures, then you can create sprite instances using:

- `Textures.sprite("your_texture_name")` that returns a `PIXI.Sprite` object.
- `Textures.tile("your_texture_name", width, height)` that returns a `PIXI.extras.TilingSprite` object.
- Or `Textures.init("your_spriteInfo_name", options)` that takes the name of the spriteInfo, and an optional parameter with more initialization properties (like position, alpha, anchor, etc), and creates a `PIXI.Sprite` instance, that is added to the scene in the layer indicated by the spriteInfo object.


Then, it's up to you what you will do with your new sprites. They could be used as decorative elements, tiling layers, informative gui components, your imagination is the limit.

# Replacing the CSS file

Sometimes you want to do a major UI change. For example, if you may want to change the position of UI elements, colors, icons, menus, buttons, etc. Most of it is handled using CSS, and you may want to provide your own CSS if you are making an advanced theme, to make the interface look more coherent with your theme.  For example, StarMash themes change some elements and icons with its own versions.  

To achieve this super easily, I have included a helper function that allows you to do exactly that.

```js
    SWAM.replaceCSS("https://wwww.example.com/your-styles-file.css");
```

This method takes the URL for your new CSS file, and loads it to the page.

This should be called in your Theme function's constructor. For example:

```js
    class MyTheme extends VanillaTheme
    {
        constructor()
        {
            super();
            SWAM.replaceCSS("https://wwww.example.com/your-styles-file.css");
        }
        // .....
```

# Audio Library: Howler.JS

Until now, I have described how to add new graphical elements to your theme, but don't forget that the sound is as important as the graphics to create a captivating atmosphere.

I will not go deep with this section. I will just mention that AirMash uses a JavaScript audio library called [Howler.JS](https://howlerjs.com/).

It's super simple to use, and I trust that if you kept reading this tutorial until now, you'll be able to play with this library by going to its [documentation page](https://github.com/goldfire/howler.js#documentation);


# Creating your own sounds

I will not cover the creation of sound files. You can use whatever software you are more comfortable with. I used a FOSS software called [Audacity](https://www.audacityteam.org/).

&nbsp;

As it was the case graphics, you can follow two options when adding your sounds:

- You can load the file by yourself.
- You can inject a new file to load to the `Sound` module, creating a method inside your theme class, called:

```js
    injectSounds(soundsData)
    {
        // ....
    }
```

If it's declared, this method will be invoked by StarMash automatically when the Sounds module is loaded. This method receives an object with the data for the url to load, and the sound sprites as explained in the Howler documentation page.
So, as we did with the graphics, you can change the url, and the information for each sound sprite (starting time and duration), to match the new sounds file you created. 

For example, imagine you have created your own sounds file, with all new sounds. As those sounds start on different points and have a different lenght, you want to edit the sounds data for the game:

```js
    injectSounds(soundsData)
    {
        let myData = {
            src: ["https://www.example.com/your_sounds.mp3"],
            sprite: {
                chopper: [0, 3000, true],
                click: [5000, 300],
                complete: [7000, 2000],
                explosion1: [1000, 4000],
                explosion2: [16000, 4200],
                explosion3: [22000, 4100],
                explosion4: [28000, 4500],
                explosion5: [34000, 4100],
                explosion6: [40000, 4100],
                impact: [46000, 3700],
                launch1: [51000, 1400],
                launch2: [54000, 1500],
                levelup: [57000, 1800],
                missile: [60000, 8300, true],
                powerup_rampage: [70000, 7400],
                powerup_shield: [79000, 2000],
                powerup_upgrade: [83000, 1600],
                repel: [86000, 2000],
                respawn: [89000, 1300],
                thruster: [92000, 9500, true],
                upgrade: [103000, 2000]
            }
        };

        $.extend(soundsData, myData);
    }
```
So here, we created our method inside our theme class, and created a new object containing the data for our file, as defined by Howler. Each of those sound sprites I listed, are the sound sprites used by AirMash. For each, you define the starting time and the length in milliseconds. A third parameter with value `true` is passed for sounds that play in loop.

If you need new sounds, you'll have to implement that by yourself.


# Final thought

As I think this tutorial is now becoming a little bit more complex and deep than I originally intended, I think I'm going to stop here.

I wish that after reading this article, you've got some tools at your disposal to get started with exploring and playing with the code, and a reference for other pages to read, in case you need or want to learn more about specific topics and examples.

This has been a nice learning experience for me, and I really wish the same for you, and that you have lots of fun while learning how to use some of the tools I listed here.

I also hope that StarMash Extensions can be used not only as a modding tool, just to improve gameplay, but as a learning tool, to improve yourself. Being able to test new stuff while playing can be really fun!

Congratulations! You've reached the end... (the end?) of this tutorial!

I hope you have enjoyed it!

**Happy modding!**

- `Bombita`


[Go back to Part 3](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3)

&nbsp;