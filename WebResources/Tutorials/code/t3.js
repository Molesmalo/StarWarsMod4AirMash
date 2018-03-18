/*----------------------------------------------------------
    StarMash Extensions Tutorial - Part 2
----------------------------------------------------------*/

!function() {
    // Default values for the settings
    let settings = {
        sayWhenHit: true,
        sayWhenKill: true,
        killMessage: "Sorry $player!",
    };

    // This is the handler that will be executed when new settings are applied
    function settingsApplied(values)
    {
        settings = values;
    }

    // creates an instance of SettingsProvider
    function createSettingsProvider()
    {
        let sp = new SettingsProvider(settings, settingsApplied);
    
        let section = sp.addSection("Bubble Messages");
    
        section.addBoolean("sayWhenHit", "Send bubble when I'm hit.");
        section.addBoolean("sayWhenKill", "Send bubble when I kill someone.");
        section.addString("killMessage",
            "Text to send when killing someone. Use $player to refer to your target's name.",
            {maxLength: 30});

        // we return our SettingsProvider instance
        return sp;
    }

    // When a player is killed, say Sorry to him vía a bubble!
    SWAM.on("playerKilled", function(data, dead, killer){
        if (!settings.sayWhenKill)
            return;

        if (killer.id == game.myID)
        {
            // An enemy was killed. But we are polite, so we say sorry vía a bubble!
            Network.sendSay(settings.killMessage.replace("$player", dead.name));
        }
    });


    let lastPhraseTime = 0;

    SWAM.on("playerImpacted", function(data)
    {
        if (!settings.sayWhenHit)
            return;

        let playerId = data.players[0].id;

        // If it's not me, quit
        if (playerId != game.myID)
            return;

        let now = new Date().getTime();
        
        // If the time between the last message
        // and now is less than 3 seconds, we exit
        // to avoid being throttled by the server
        if (now - lastPhraseTime < 3000)
            return;

        let phrases = null;
        let player = Players.get(playerId);
        lastPhraseTime = now;

        // If it was a 'light' hit
        if (player.health > 0.35)
        {
            phrases = ["Ahhh!", "I'm hit!", "ARRGG!", "They've got me!",
            "I need help!", "Ouch!", "Don't do that!", "Shields down!",
            "Damn!", "Nothing serious!", "Redirecting power!", "Oh dear!",
            "I'm fine!", "Still fine!", "Don't fail me now!",
            "Droid, full power!", "My ship!", "The paint is still new!",
            "Nothing to worry about", "Oh c'mon!", "You'll pay for this!",
            "Oh please!", "I'll make you pay!", "Goddam!", "I'm still here!",
            "Focus, focus!", "You've trained for this!",
            "I didn't sign up for this!", "I'm gonna get you!", "Just a scratch!",
            "C'on " + player.name + "!"];
        }
        // if it was serious, but I'm still alive
        else if (player.health > 0)
        {
            phrases = ["Heeeelp!", "Eject, eject!", "Critical hit!",
            "NOOO!", "AHHH!", "May the fo-...", "I've lost my shields!",
            "F***!", "I lost my droid!", "General failure!", "Arrrrhhh!",
            "-NOoo!", "Please please! please!", "I'm hit! I'm hit!",
            "Tell my wife...", "Come on... COME ON!", "Don't fail me now...",
            "I can do it!", "Ahhhhhrrr!!", "Nooooooooo!",
            "I can't take much more!"];
        }
        else return;
        
        // choose a random phrase
        let index = Tools.randInt(0, phrases.length - 1);

        // and send that phrase as a bubble
        Network.sendSay(phrases[index]);
    });



    // Register the file as an extension
    SWAM.registerExtension({
        name: "Tutorial - Part 3",
        id: "Tutorial3",
        description: "Using Settings",
        author: "YOUR_NAME_HERE",
        version: "1.0",
        settingsProvider: createSettingsProvider()
    });
}();