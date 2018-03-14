// ------------------------------------------------------------------------
//   Christmas Mod
// ------------------------------------------------------------------------
!function()
{
    function Christmas2017Theme()
    {
        VanillaTheme.prototype.constructor.call(this);
    }

    extend(Christmas2017Theme, VanillaTheme);
    Christmas2017Theme.themeName = "Christmas 2017 Theme";
    Christmas2017Theme.description = "A christmassy theme for AirMash!!";
    Christmas2017Theme.author = "Bombita";
    Christmas2017Theme.thumbnail = "";


    // ------------------------------------------------------------------------

    function getFileName(str)
    {
        str = str.substring(str.lastIndexOf('/')+1)
        if (str.indexOf("?")>-1)
            str = str.substr(0, str.indexOf("?"));
        return str;
    }

    Christmas2017Theme.prototype.injectTextures = function(files, textureInfo, flagTextureInfo, spriteInfo, textures)
    {
        for(let i in files)
        {
            //files[i] = "//localhost/Christmas/" + getFileName(files[i]);
            files[i] = "//raw.githubusercontent.com/Molesmalo/AirMashChristmasMod/master/assets/" + getFileName(files[i]);
        }
    }

    SWAM.registerExtension({
        name: "Christmas 2017 Theme Extension",
        id: "Christmas2017",
        description: "Happy holidays and merry Christmas!",
        author: "Bombita",
        version: "1.0",
        thumbnail: "",
        themes: [ Christmas2017Theme ],
        dependencies: [],
        settingsProvider: null
    });

    console.log("Merry Christmas!  Christmas 2017 Theme Loaded!");
}();