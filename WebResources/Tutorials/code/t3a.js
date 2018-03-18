/*----------------------------------------------------------
    StarMash Extensions Tutorial - Part 3 A - Controls
----------------------------------------------------------*/
!function()
{
    function createSettingsProvider()
    {
        // This is the handler that will be executed when new settings are applied
        function onApply(values)
        {
            console.log ("New settings applied: ", values);
        }

        // Default values for the settings
        let defaultValues = {
            bool1: false,
            bool2: true,
            string1: "hello world",
            values1: "b",
            slider1: 25,
            category1: {
                n1: true
            }
        };

        let sp = new SettingsProvider(defaultValues, onApply);
    
        let section = sp.addSection("First Section");
    
        section.addBoolean("bool1", "This is a checkbox.", {useToggle: false});
        section.addBoolean("bool2", "And this is a toggle switch.");
    
        let section2 = sp.addSection("Second Section");
        section2.addString("string1", "This is an input box for string1.", {maxLength: 10});
        section2.addSeparator();
        section2.addValuesField("values1", "A selection box with some values.",
        {
            "a": "Value A",
            "b": "Value B",
            "c": "Value C"
        });
        section2.addSliderField("slider1", "This is a slider control.",
        {
            min: 0,
            max: 100,
            step: 5
        });
        section2.addSeparator();
        section2.addBoolean("category1.n1", "N1 is inside category1.");

        // we return our SettingsProvider instance
        return sp;
    }

    // Register the file as an extension
    SWAM.registerExtension({
        name: "Tutorial - Part 3 A",
        id: "Tutorial3a",
        description: "An useless settings demo!",
        author: "YOUR_NAME_HERE",
        version: "1.0",
        settingsProvider: createSettingsProvider()
    });
}();