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