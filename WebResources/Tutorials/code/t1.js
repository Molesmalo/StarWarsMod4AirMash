!function() {

    // This line will be executed as soon as the extension is loaded
    console.log ("Tutorial: This is executed as soon as the extension is loaded.");

    // Here, we subscribe to some events:
    SWAM.on("extensionsLoaded", function() {
        console.log ("Tutorial: All the extensions are now loaded.");
    });

    SWAM.on("themeLoaded", function() {
        console.log ("Tutorial: The Theme constructor has been invoked.");
    });

    SWAM.on("gameLoaded", function() {
        console.log ("Tutorial: The game code is loaded and ready to run.");
    });

    SWAM.on("gameRunning", function() {
        console.log ("Tutorial: The game is now running.");
    });


    // Finally, we register the file as an extension
    SWAM.registerExtension({
        name: "Tutorial 1",
        id: "Tutorial1",
        description: "This is my first extension!",
        author: "YOUR_NAME_HERE",
        version: "1.0"
    });
}();