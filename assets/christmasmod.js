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

    // ------------------------------------------------------------------------


    Christmas2017Theme.prototype.injectTextures = function(files, textureInfo, flagTextureInfo, spriteInfo, textures)
    {
        function getFileName(str)
        {
            str = str.substring(str.lastIndexOf('/')+1)
            if (str.indexOf("?")>-1)
                str = str.substr(0, str.indexOf("?"));
            return str;
        }

        for(let i in files)
        {
            //files[i] = "//localhost/Christmas/" + getFileName(files[i]);
            files[i] = "//raw.githubusercontent.com/Molesmalo/AirMashChristmasMod/master/assets/" + getFileName(files[i]);
        }
    }

    console.log("Merry Christmas!  Christmas 2017 Theme Loaded!");

    SWAM.registerExtension({
        name: "Christmas 2017 Theme Extension",
        id: "Christmas2017",
        description: "Happy holidays and merry Christmas!",
        author: "Bombita",
        version: "1.0",
        thumbnail: "",
        themes: [
            {
                name: "Christmas 2017 Theme",
                id: "Christmas2017Theme",
                description: "A christmassy theme for AirMash!!",
                author: "Bombita",
                version: "1.0",
                thumbnail: "",
                object: Christmas2017Theme
            }
        ],
        dependencies: []
    });
}();