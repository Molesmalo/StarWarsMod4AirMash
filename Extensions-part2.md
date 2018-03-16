![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# StarMash - Extensions and Themes - Part 2

This is a guide for the creation of extensions and themes for the [StarMash Mod](https://molesmalo.github.io/StarWarsMod4AirMash/) for [AirMash](https://airma.sh).

Read this if you are interested in creating your own features and themes for AirMash.

This is part 2 of a multi-part tutorial.

Check [StarMash - Extensions and Themes - Part 1(https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1) for the first part of this tutorial.


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

In this case, our code is subscribing to the `playerKilled`.  This event sends 3 arguments:  
- `data` with some information sent by the server (
    - id: dead player's id
    - killer: killer player's id,
    - posX and posY: map coordinates where this event happened.
- `dead` the dead player's object
- `killer` the killer player's object

You can add a breakpoint, or add a line like `console.log(data, dead, killer);` as the first line inside the handler, if you want to explore this objects a little more.

So, once StarMash triggers this event, our handler is executed receiving those arguments. We then proceed to check if killer's ID corresponds to our ID.  We do that by comparing `killer.id == game.myID`.

------------------ 

I can hear you asking:

> Hey! Where does this `game` object come from? 

This is a global object created by AirMash's original game code. It stores some important information about the current game.
There are several other objects created by AirMash that will be useful to you when you develop your extensions. Some of them are:

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

But as that's a sure recipe for getting vote-muted or ignored, we just use the bubble message.

&nbsp;

Let's add some more complexity now, and let's make it fun!




