![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# StarMash - Extensions and Themes - Part 2 - Basic Extension

This is a guide for the creation of extensions and themes for the [StarMash Mod](https://molesmalo.github.io/StarWarsMod4AirMash/) for [AirMash](https://airma.sh).

Read this if you are interested in creating your own features and themes for AirMash.

This is part 2 of a multi-part tutorial.

[StarMash - Extensions and Themes - Part 1 - Introduction](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1).

**StarMash - Extensions and Themes - Part 2 - Basic Extension**

[StarMash - Extensions and Themes - Part 3 - Settings](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3).

[StarMash - Extensions and Themes - Part 4 - Themes](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part4).

[StarMash - Extensions and Themes - Part 5 - Advanced Themes](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part5).

&nbsp;

In this part, you will learn:

- How to create a simple, yet funny extension that interacts with the game.
- How to interact with AirMash objects.
- Send bubble messages.
- How to avoid being disconnected or banned by AirMash's server.

&nbsp;

# Moving beyond the console

In the previous part of this tutorial, we learned how StarMash Extensions work, and created our first extension. But that extension only wrote some text to the console.

Now, we will move forward, to create something that actually interacts with the game.

What we will create now, is a simple extension that responds to the `playerKilled` event. As the name implies, this event is fired when a player's ship is killed.  So, open your code editor, create a new file, and paste this code:

```js
    !function() {
        
        // When a player is killed, say Sorry to him vía a Bubble over our ship!
        SWAM.on("playerKilled", function(data, dead, killer){
            if (killer.id == game.myID)
            {
                // An enemy was killed. But we are polite, so we say sorry vía a bubble!
                Network.sendSay("Sorry " + dead.name);
            }
        });


        // Register the file as an extension
        SWAM.registerExtension({
            name: "Tutorial - Part 2",
            id: "Tutorial2",
            description: "Playing with StarMash events!",
            author: "YOUR_NAME_HERE",
            version: "1.0"
        });
    }();
```

Let's examine this code:

As usual, we create our own Module, and put our code inside it. Then we write our extension's code, and at the end, we register this file as an extension.

In this case, our code is subscribing to the `playerKilled` event.  This event sends three arguments:  
- `data` with some information sent by the server (
    - id: dead player's id
    - killer: killer player's id,
    - posX and posY: map coordinates where this event happened.
- `dead` the dead player's object
- `killer` the killer player's object

Both `dead` and `killer` object are instances of an AirMash class called Player.

You can add a breakpoint, or add a line like `console.log(data, dead, killer);` as the first line inside the handler, if you want to explore those objects a little more.

So, once StarMash triggers this event, our handler is executed receiving those arguments. We then proceed to check if killer's ID corresponds to our ID.  We do that by comparing `killer.id == game.myID`.

------------------ 

I can hear you asking:

> Hey! Where does this `game` object come from? 

This is a global object created by AirMash's original game code. It stores some important information about the current game.
There are several other global objects created by AirMash that will be useful to you when you develop your extensions. Some of them are:

    game
    config
    Games
    UI
    Players
    Mobs
    Particles
    Graphics
    Sound
    Textures
    Tools
    Network

You can write their name in the console, and hit enter (or add a watch) to explore what properties and methods each of those objects expose.

Also, sometimes you will work with object instances of classes like Player, Mob and Particle.

**This tutorial will not covered them in detail, so it's up to you explore them further.** But as they are essential to get information about the game, you will most surely interact with them, so eventually, you'll start exploring what they offer.

------------------

Let's go back to our code.
We compared `killer.id == game.myID` . If that's true, it means the user just killed an enemy ship. So then, we call `Network.sendSay` to inform the server that we want to say something vía a bubble.
If we instead wanted to say it vía the chat panel, we would have used one of the following:

```js
    // Chat to everyone:
    Network.sendChat("Sorry " + dead.name)

    // Chat to team members only:
    Network.sendTeam("Sorry " + dead.name)

    // Whisper the player:
    Network.sendWhisper(dead.id, "Sorry " + dead.name)
```

The first option would send a public message to everybody, the second only to team members, and the third only to the player you just killed.

But as that's a sure recipe for getting vote-muted or ignored, so we'll just use the bubble message. Please, please, please, avoid sending automated chat messages. Other users will not like it very much, and they will let you know this.

&nbsp;

# Adding complexity and making it fun!

Add the following lines below the playerKilled handler:

```js

    let lastPhraseTime = 0;

    SWAM.on("playerImpacted", function(data)
    {
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

        // If it was a 'light' impact
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
```

[Download the complete file](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Tutorials/code/t2.js)

What this piece of code does, is send a random bubble message every time our ship is hit. The message is selected from one of two list of messages. The list to use is determined by our ship's health.

Let's analyze the code in detail:

- We are creating a local variable for the extension, called `lastPhraseTime`. In this variable, we are going to store when we last sent a bubble message.

- Then, we declare the event handler for `playerImpacted`. This event sends one argument: a data object with data sent by the server to inform that a player was impacted. You can later debug this code, to check the details about this object.

- For now, we just care about data.players[0].id. This field indicates the ID for the player who was hit.

- As we did before, we compare that ID with `game.myID` to check if the user was hit. If it's another player, exit the handler, as we don't care for what we want to do now.

- Next, we check how much time has passed between the last time we sent a bubble message and now. If it was sooner than 3 seconds ago (time is measured in milliseconds, so that's 3000 ms), we exit.  We do this, because if we send too many messages frequently, the server will punish us blocking our messages, and if we keep doing it, we might get disconnected or even banned!

- So, after we passed those checks, we can safely assume that our user was hit, and our extension hasn't sent a bubble for the last 3 seconds.

- Then check the user's ship health points. If it's health is greater than 35 %, set the list of phrases one way, if it's between 0 and 35, set it with other phrases, and if it's 0, it means we are dead, so... exit, as dead man can't talk!

- Finally, we choose a random phrase from the list, and send it vía Bubble. To do this, we are using here another handy AirMash function called Tools.randInt that takes 2 integers and returns an integer between those numbers. There's also a Tools.rand that takes 2 double values, and returns a double value.


So, it's time to save or download the file, update your server, and add this extension to StarMash.

Test it and have some fun!

&nbsp;

# Rounding up

In this lesson we learned about some AirMash global objects and classes. We created an extension that responds to two different events, and learned how to avoid being disconnected or banned by the server.  Even when it's a very simple example, this extension shows the basics of creating an usefull extension.

Next, we will learn about storing custom settings for your extension.

[Continue to Part 3](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3)

&nbsp;

[Go back to Part 1](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1)

&nbsp;