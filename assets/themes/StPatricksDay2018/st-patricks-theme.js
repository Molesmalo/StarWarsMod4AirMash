// ------------------------------------------------------------------------
//   St. Patrick's Day 2018 Theme for StarMash
// ------------------------------------------------------------------------
"use strict";

!function()
{
    // Returns the filename part of an AirMash's image URL
    function getFileName(str)
    {
        str = str.substring(str.lastIndexOf('/')+1)
        if (str.indexOf("?")>-1)
            str = str.substr(0, str.indexOf("?"));
        return str;
    }

    // ------------------------------------------------------------------------

    // Theme Function
    // This theme inherits from VanillaTheme, so we call VanillaTheme's constructor
    // when this theme is instantiated.
    class StPatricksDay2018 extends VanillaTheme
    {
        constructor()
        {
            super();

            $("#logon").css("backgroundColor", "rgba(6, 51, 16, 0.75)");
        }

        injectTextures(files, textureInfo, flagTextureInfo, spriteInfo, textures)
        {
            const toChange = ["map_forest.jpg", "map_rock.jpg", "map_sand.jpg", "map_sea.jpg", "aircraft.png"];
            for(let i in files)
            {
                let fileName = getFileName(files[i]);
        
                if ($.inArray(fileName, toChange) > -1)
                {
                    //files[i] = "//localhost/StPatricksDay2018/" + fileName;
                    files[i] = "//molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/" + getFileName(files[i]);
                }
            }
        }
    }

    StPatricksDay2018.themeName = "St. Patrick's Day 2018 Theme";
    StPatricksDay2018.description = "A lucky theme for StarMash!!";
    StPatricksDay2018.author = "Bombita";

    // ------------------------------------------------------------------------

    // Register our extension and theme
    SWAM.registerExtension({
        name: "St. Patrick's 2018 Extension",
        id: "StPatricksDay_2018",
        description: "A lucky extension for StarMash!!",
        author: "Bombita",
        version: "1.0",
        themes: [ StPatricksDay2018 ]
    });
}();