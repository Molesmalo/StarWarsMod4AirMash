![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# StarMash - Extensions and Themes - Part 4 - Themes

This is a guide for the creation of extensions and themes for the [StarMash Mod](https://molesmalo.github.io/StarWarsMod4AirMash/) for [AirMash](https://airma.sh).

Read this if you are interested in creating your own features and themes for AirMash.

This is part 4 of a multi-part tutorial.

[StarMash - Extensions and Themes - Part 1 - Introduction](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1).

[StarMash - Extensions and Themes - Part 2 - Basic Extension](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part2).

[StarMash - Extensions and Themes - Part 3 - Settings](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3).

**StarMash - Extensions and Themes - Part 4 - Themes**

&nbsp;

In part 4, you will learn:

- Assets and Textures used by AirMash.
- What files I need to edit for my themes.
- How to build super simple themes with almost no coding.

&nbsp;

# Themes with almost no coding?

If you are planning on making the most simple Themes for StarMash, you shouldn't worry too much about how AirMash's internals work.

All you need to do is replace a few image files, use a Theme template I will provide and be done with it.

Let's start with that and then, if you are interested in building something more advanced, or you are just curious about how AirMash works, keep reading the following sections.

First of all, we need to know the assets used by AirMash. Those are the image files that AirMash code loads when the game starts. AirMash then divides those images in smaller parts, called Textures that are in turn used to create Sprites (which are objects composed of Textures, that can be moved and interacted with on the screen).

The images are:

<a href="https://airma.sh/assets/aircraft.png" target="_blank">aircraft.png</a>
- Textures for the planes.

<a href="https://airma.sh/assets/items.png" target="_blank">items.png</a>
- Textures for the in-game items. Like missiles, flags, boxes, etc.

<a href="https://airma.sh/assets/shadows.png" target="_blank">shadows.png</a>
- The shadows dropped by the items, planes and explotions.

<a href="https://airma.sh/assets/gui.png" target="_blank">gui.png</a>
- User Interface elements.

<a href="https://airma.sh/assets/map_forest.jpg" target="_blank">map_forest.jpg</a><br/>
<a href="https://airma.sh/assets/map_rock.jpg" target="_blank">map_rock.jpg</a><br/>
<a href="https://airma.sh/assets/map_sand.jpg" target="_blank">map_sand.jpg</a><br/>
<a href="https://airma.sh/assets/map_sea.jpg" target="_blank">map_sea.jpg</a>
- Tiling textures used for the background. Those images are repeated continuously.

<a href="https://airma.sh/assets/map_rock_mask.jpg" target="_blank">map_rock_mask.jpg</a><br/>
<a href="https://airma.sh/assets/map_sand_mask.jpg" target="_blank">map_sand_mask.jpg</a>
- Grayscale image that represents the Masks used to draw rocks and sand on the background. The lighter the color, the more visible the sand/rock will be. The darker, the more trasnparent. White is fully visible, Black is fully transparent.

<a href="https://airma.sh/assets/map_sea_mask.jpg" target="_blank">map_sea_mask.jpg</a>
- Grayscale image that represents the Mask used to draw the oceans's depth. The lighter the color, the lighter the water will be (shallow water/coast). Darker color means darker water (deep ocean). Please note that the shape of the continents is not defined by an image, but by a JSON file downloaded by the game. I will not cover here how to edit that.

<a href="https://airma.sh/assets/mountains.png" target="_blank">mountains.png</a>
- The four different pictures for mountains.

<a href="https://airma.sh/assets/particles.png" target="_blank">particles.png</a>
- Particles are sprites that represent some effect in the game. Like smoke, glows, sparks, shockwave and flash.

<a href="https://airma.sh/assets/flagsbig.png" target="_blank">flagsbig.png</a>
- As the name implies, this file contains the country and special flags.

So, in order to create your own themes, you need to decide which file you want to modify.

The most common files to edit are:
aircraft and shadows, items, gui and map_forest/rock/sand. That's why I will leave you here some images that you can use as guides when editing those files.

<a href="https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Tutorials/assets-guides/aircraft-guide.png" target="_blank">aircraft-guide.png</a><br/>
<a href="https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Tutorials/assets-guides/gui-guide.png" target="_blank">gui-guide.png</a><br/>
<a href="https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Tutorials/assets-guides/items-guide.png" target="_blank">items-guide.png</a><br/>
<a href="https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Tutorials/assets-guides/shadows-guide.png" target="_blank">shadows-guide.png</a>

When editing an image (like `aircraft.png`) using an application like Photoshop or Gimp, you can load those images as layers, to have a reference for the limits of each texture.

Also, in the case of `aircraft.png`, you can see with this reference image the circles used by AirMash's server for collision detection. While it's not required to keep your own planes perfectly within those circles, it's better to at least preserve the general dimensions and shape. That's because those collision circles are checked on the server, so we can't edit them.

&nbsp;

In this tutorial, we will use two special themes as a very simple examples:

- `Christmas 2017 Theme`: This theme inherits from the Vanilla Theme, but replaced all the assets with its own Christmas graphics.

- `St. Patrick's Day 2018 Theme`: This theme consist of basically the Vanilla Theme, but with **some** assets changed. We will add clovers to the background, and tint our planes with a golden hue.

# Example: Christmas Theme - Replacing **all image files**

If you have some knowledge about Object Oriented Programming, you most probably know terms like inheritance, derived classes and extension. But if not, I'll just leave you a super short paragraph from [Wikipedia](https://en.wikipedia.org/wiki/Inheritance_%28object-oriented_programming%29):

>  Inheritance in most class-based object-oriented languages is a mechanism in which one object acquires all the properties and behaviours of the parent object. Inheritance allows programmers to: create classes that are built upon existing classes, to specify a new implementation to maintain the same behaviour (realizing an interface), to reuse code and to independently extend original software via public classes and interfaces. An inherited class or derived class is called a subclass of its parent class or super class.

**Why do I mention this now?** Because this is how new Themes are created in StarMash. Inheriting from a base Theme class.

StarMash provides four base Theme classes that you can inherit from:
- BaseTheme:    An unchanged and pure AirMash Theme. The only thing it does is provide an interface for the its derived classes.

- VanillaTheme:  An AirMash style Theme, it extends BaseTheme by providing a SettingsProvider, so the user can enable/disable layers in the Mod Settings Window. Also, this theme tints missiles and players to their respective team colors in CTF.

- StarMash_1:  A basic theme using StarMash's modified `Graphics` and `Sound` module.

- StarMash_2:  An advanced theme using StarMash's modified `Graphics` and `Sound` module.


Let's take a look at `Christmas 2017 Theme`'s code:

```js
// ------------------------------------------------------------------------
//   Christmas Theme for StarMash
// ------------------------------------------------------------------------
"use strict";

!function()
{
    // Returns the filename part of an AirMash's image URL
    function getFileName(str)
    {
        str = str.substring(str.lastIndexOf('/')+1);
        if (str.indexOf("?")>-1)
            str = str.substr(0, str.indexOf("?"));
        return str;
    }

    // ------------------------------------------------------------------------

    // Theme Function
    // This theme inherits from VanillaTheme, so we call VanillaTheme's constructor
    // when this theme is instantiated.
    class Christmas2017Theme extends VanillaTheme
    {
        //constructor() {
            //super();
            //my initialization code goes here, after calling super()
        //}

        // This method called by StarMash when the game is loading
        injectTextures(files, textureInfo, flagTextureInfo, spriteInfo, textures) 
        {
            for(let i in files)
            {
                //files[i] = "//localhost/Christmas/" + getFileName(files[i]);
                files[i] = "//raw.githubusercontent.com/Molesmalo/AirMashChristmasMod/master/assets/" + getFileName(files[i]);
            }
        }
    }

    // We add some metadata to our theme class
    $.extend(Christmas2017Theme, {
        themeName: "Christmas 2017 Theme",
        description: "A christmassy theme for StarMash!!",
        author: "Bombita"
    });

    // ------------------------------------------------------------------------

    // Register our extension and theme
    SWAM.registerExtension({
        name: "Christmas 2017 Theme Extension",
        id: "Christmas2017",
        description: "Happy holidays and merry Christmas!",
        author: "Bombita",
        version: "1.0",
        themes: [ Christmas2017Theme ]
    });
}();
```
[Download the file](https://molesmalo.github.io/StarWarsMod4AirMash/assets/christmasmod.js)

If you followed Parts 1, 2 and 3, I hope this code will be easy to follow. 

It starts by creating our module. Inside our module, we create a helper function called `getFileName` that takes a url, and returns the file part.

Next, create a new class called `Christmas2017Theme` that inherits from VanillaTheme. We could have inherited from `BaseTheme` if we wanted a more basic parent so we could define for example our own `SettingsProvider` and tinting/coloring for missiles and players. But for now, `VanillaTheme` is best for us.

------------------

**Theme constructor**

Now, check these lines:
```js
    //constructor() {
        //super();
        //my initialization code goes here, after calling super()
    //}
```

Those are the lines for the constructor method of our class. In our example we don't need any initialization code for this theme, that's why those lines are commentated.

But here is the place to put our initialization code in case we need it. We would need it, for example, to create our own `SettingsProvider` for the theme (both the theme and the extension can have their own SettingsProvider). It's similar to what we learned in Part 3, but instead of offering settings for the whole extension, it offers for the theme (and it's not show when the theme is not loaded). It would look something like this:
```js
    constructor() {
        super();

        let sp = new SettingsProvider(
            {  /* some default values here */ }, settingsApplied);
        
        // *** we then add all the fields like we saw in Part 3 ***

        // We assign a custom settingsProvider to our theme
        this.settingsProvider = sp;
    }
```

Just in case you forgot, or you didn't read Part 1, **[Part 1 - StarMash Life Cycle](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1#internals)**, I'll remind you that a Theme instance is created even before any code for the game is loaded and executed.

But again, those lines are commentated because our class does not need any initialization code. So, it's `super()` (the constructor for VanillaTheme in this case) is automatically executed.

------------------

Continue reading the example code. Our theme class then defines a method called `injectTextures` that takes the following parameters:

- files:  object with [key/value] pairs for image files that will be loaded.
- textureInfo: object with [key/value] pairs for the textures (from which image get it, and an array containing [top left coordinate, top right coordinate, width, height] in pixels).
- flagTextureInfo: same as before, but for the flags.
- spriteInfo: object with [key/value] pairs with information about the sprites that will be used during the game.
- textures: an empty object. In some RARE cases you might need to save a reference for this object, as it is where the textures as saved once they are loaded (for example, if you have your own loading mechanism but you wanted to inject later some textures). But I guess in 99.9% of the cases you will __just ignore this object__.


Inside this method, we iterate over all the URLs of the images that are going to be loaded, get their file name using our helper function `getFileName`, and change the URL to point to another file that we have previously uploaded to some server.

Then, we add some metadata to our Theme class. Here, I'm using jQuery's `extend` method for brevity, whose use (for this case) is similar to doing:
```js
// We add some metadata to our theme class
Christmas2017Theme.themeName = "Christmas 2017 Theme";
Christmas2017Theme.description = "A christmassy theme for StarMash!!";
Christmas2017Theme.author = "Bombita;
```

And finally, we register our extension like we did in the previous articles, but with one new element, this line:

```js
themes: [ Christmas2017Theme ]
```

Here, we are telling StarMash that our extension wants to register a new Theme, by passing a reference to the Theme function itself. Note that the themes property of the object we pass to `registerExtension` is an Array. This is because we could define several Themes in a single extension. All could sharing some common code, but have some differences between them to make them 'unique'. 

For example, imagine a "World War 2" extension, that adds the following themes:
- WW2: Eastern Front
- WW2: Western Front
- WW2: Pacific War

We could define something like, assuming that we have declared the classes for those Themes: 
```js
themes: [ WW2_Eastern_Front, WW2_Western_Front, WW2_Pacific_War ]
```

And that's it.  You can test this theme in StarMash and have some fun with the Christmas Theme.


# Example: St. Patrick's Theme - Replacing **only some files**

In the previous example, the Christmas Theme worked by replacing every single file, and providing its own version hosted somewhere else.

In this example, the St. Patrick's Day Theme changes only the following files:

- map_forest.jpg
- map_rock.jpg
- map_sand.jpg
- map_sea.jpg
- aircraft.png

Basically, it adds clovers to the background (brighter clovers in replace of the sand, and darker clovers in replace of the rock), and tints the planes with a golden hue. The rest of the files are the default AirMash files.

So, what happens if we wanted to change only __some__ files, and leave the rest untouched, like this theme needs?

Simple!  We can alter the `injectTextures` method of our theme class, to something like this:

```js
injectTextures(files, textureInfo, flagTextureInfo, spriteInfo, textures)
{
    const toChange = [
        "map_forest.jpg",
        "map_rock.jpg",
        "map_sand.jpg",
        "map_sea.jpg",
        "aircraft.png"];

    for(let i in files)
    {
        let fileName = getFileName(files[i]);

        if ($.inArray(fileName, toChange) > -1)
        {
            files[i] = "//molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/" + getFileName(files[i]);
        }
    }
}
```

Here, we create an array that contains the files we need to change, and then we proceed to iterate over the files. If the current file name is in the list, we change its URL.

Also, in this example we do use the constructor, because the theme changes the color of the main screen window when the instance is created.

You can view the full code for this example here: [Download the file](https://molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/st-patricks-theme.js)

&nbsp;

# Rounding up

In this lesson, you learned how to build some simple themes for AirMash, using StarMash Extensions.

Just by inheriting from one of the base themes provided by StarMash, you can do a lot.

I hope you liked this article. On Part 5, we will dig deeper, learning how AirMash Graphics module works, to create more advanced themes. Be warned though: it will be a little more technical. But if you are interested in going beyond the most simple themes, I hope it will help you get started. See you there!


[Continue to Part 5](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part5)

&nbsp;

[Go back to Part 3](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3)

&nbsp;