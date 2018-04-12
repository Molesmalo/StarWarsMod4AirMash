![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# Index / Short Summary:

If you are in a hurry, a very short list would summarize the main features as follow. Please, be reminded this is not a complete list. I'll add more as I remember them (sorry about that).

- *Extensions*
    - Extensions created by other users can be added.

- *Default Themes*
    - StarMash v.1 Theme - No Parallaxing
    - StarMash v.2 Theme (default)
        - New graphics stack, containing:
            - Parallaxing (depth-illusion)
            - 12 new Ships randomized background (new background every match)
            - 10 planets drawn by me
            - Capital ships for Imperials and Rebels
            - Asteroid layers
        - Different graphics for each team, and different colors for each teams' shots.
        - All new sounds! Every ship has its own characteristic sound.
        - Cosmetic changes in the UI (icons/fonts/sizes/etc)
    - Vanilla Theme (AirMash's default look)

- *Improvements in gameplay, including:*
    - Non-printable characters in player's names replaced with �
    - Customizable radio messages (Press `Z`, `X` or `C`,  then choose a message with a number key `0`-`9`)
    - 1, 2, 3 Leaders tracking
    - Targeted Player tracking (click a player's name in either of the scoreboards)
    - Arrow Indicators
    - Missile/Laser colors in CTF
    - Player's position and team member's health
    - Flag events informed vocally
    - Visual FX for Respawn and Power ups
    - Kill Streaks
    - Leader's ship
    
    - Cruise Control (Press `5` or `END` to activate/deactivate,  you can also disable pressing `UP/DOWN`)
    - AutoPilot (Experimental...  `ALT + Left Click` on the minimap)
    - Mimic other players
    - Drop Flag shortcut (`Y`)
    
- *Improvements in User Interface:*
    - Mod settings window
    - Zoom Level
    - Reddit discussion panel
    - Changelog panel
    - Who killed who log
    - Game Log window
    - Player joined/left log
    - Kills / Deaths Counters
    - Mod section for help window
    - Show/Hide Leaderboard (`F3` key)
    - Show/Hide User Interface (`F4` key)
    - FPS / Debug Information (via console)
    - Move Minimap (via console)
    - Pan the camera along the X or Y axis (via console)

- *Chat improvements:*
    - Unlimited length for messages
    - Links for URLs
    - Navigate and Resend previous messages
    - Team colors in chat window
    - Sound on Whisper
    - Copy to clipboard
    - Clear chat button (`DEL` key)
    - -SWAM-PING Command

- *Spectator Mode:*
    - Free Camera spectator Mode (move around the map freely with a Zoomed Out view)
    - Click to spectate (click a player's ship or a player's name in the scoreboards)

- *Future features*
    There are several new features coming!

<br><br>
-------------------------------------------------------
<br><br>


# **Features**

Here, I will give a litte more detailed explanation for each feature. It's still an incomplete list. I'll have to re-check the code to find other things I forgot to add here...


## **Extensions**

Extensions are plugins for StarMash, that can add new features and Themes. For a complete description of how to use them and how to create new ones, you can read the following tutorials:


### **TUTORIALS**

&nbsp;

- **[Extensions - Part 1:   Introduction](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part1):** 
 My very first StarMash tutorial.  In this article, you will learn:
    - How StarMash works.
    - How StarMash Extensions work.
    - How to respond to StarMash events.
    - How to create the most basic extensions.
    - I hope you like it!

- **[Extensions - Part 2:   Having fun with extensions ](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part2):** 
 In this article, you will learn:
    - How to create a simple, yet funny extension that interacts with the game.
    - How to interact with AirMash objects.
    - Send bubble messages.
    - How to avoid being disconnected or banned by AirMash's server.

- **[Extensions - Part 3:   Settings ](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part3):** 
 In this article, you will learn:
    - How to show custom settings for your extensions and themes in the Mod Settings Window.

- **[Extensions - Part 4:   Themes ](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part4):** 
 In this article, you will learn:
    - Assets and Textures used by AirMash.
    - What files I need to edit for my themes.
    - How to build super simple themes with almost no coding.

- **[Extensions - Part 5:   Advanced Themes ](https://molesmalo.github.io/StarWarsMod4AirMash/Extensions-part5):** 
 In this article, you will learn:
    - AirMash graphics and layers.
    - Loading your own files and textures.
    - Replacing the CSS file.
    - Using your own audio files.
    - Final thoughts

&nbsp;

## **StarMash v1 and v2 Themes**

### Paralaxing Background

The game now represents space in a simil-3D way, with depth simulation. Closer elements move faster than distant elements, taking the game to a whole new Dimension!

(This is best viewd in the youtube videos)


### 12 New Ships:

12 new ships, divided in two different graphics sets. When playing Capture the Flag, one team looks like Rebel forces, the other like Imperial ships!

In FFA and Battle Royale you can change the graphics set used by your ship, by clicking the Graphics button that is placed over the ship type icons.

Imperial Ships:
- Tie Fighter
- Tie Bomber
- Tie Interceptor
- Tie Advanced
- Tie Phantom
- Leader:  Sith Infiltrator

Rebel Ships:
- X-Wing
- B-Wing
- A-Wing
- Y-Wing
- Scout Ship
- Leader:  Golden X-Wing

![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Ships.jpg)

Each ship has also it's own style for the thrusters... a small cosmetic change that adds to the overall experience.

![Imperial/Rebel Button](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/GraphicsSwitch.jpg)

### Random Background Generation

No two matches look the same! The background is generated for each match.  

The background is composed by 3 main nebula layers, a planet, some other celestial object (still not uploaded), a randomized fleet of Imperial capital ships, and a randomized fleet of Rebel Capital ships.

After a background is generated, a panel is shown for 10 seconds with a button to generate a new one.

You can also generate a new background after those 10 seconds, by opening the Mod Settings window, and clicking the button `Generate New Background`.

![Generate New Background Panel](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/GenerateNewBackgroundPanel.png)

![Generate New Background Button](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/GenerateNewBackground.png)



### 10 different background planets

I have drawn 10 different background planets (I might add more in the future).  Which planet will be shown is chosen randomly for each match.

![10 Planets](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/10Planets.jpg)

I must give a big thanks to the people posting great tutorials on deviantart and youtube about how to draw photo-realistic planets... It was great thing to learn! :D

Now... those planets are still unnamed... should I organize a contest to name them?


### Background Capital Ships for Imperials and Rebels

Another big thanks I want to give, is to the people posting CC-Zero models (public domain) in https://www.blendswap.com 

That page was a godsend for me while creating a lot of the resources for this Mod...

### Asteroids

We are in space, so we can't have mountains... But we can have asteroids!  

And given that the background now moves very slowly because of its distance to the camera, I created several background asteroid layers, that helps the user know how much he/she is moving.

Those layers can be enabled/disabled in the Mod Settings window, but I would recommend you to keep them, because given the immensity of space, it can be confusing to pilot your ship without close reference points.

![Asteroids](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/asteroids.jpg)


### New icons

Almost every resource used by the game was changed, even the icons! They now reflect their Star Wars equivalents, including icons for Lasers, Deflector Shields, etc.

Even the Connected Users icon was replaced by a rebel pilot icon.


<br><br>
<br>


## **Audio**

### 30 New Ambient Sounds!

Every sound of the game was changed, and then I added a lot more! Because the sounds are as important as the graphics to achieve a good level of immersion in the game.

### Each Ship has its own sound

No two ship types use the same ambient sound... every single one of them (10) have their own distinctive ambient sound, respecting the base material (Star Wars).

### Main Menu Music

Disabled by default. 

But you can enable it via the Mod Settings window. It's just a small element to add some sentimentalism and inspiration before playing. Even when enabled, the music stops when you join a game.


<br><br>
<br>

## Vanilla Theme

It's airmash's default look, with all the other features from StarMash. Also, in CTF missiles and players are optionally colored to their teams' colors.


## **Gameplay**


### Non-printable characters replaced with �

Non-printable unicode characters are replaced with �, to avoid some players using (abusing) those chars as names, which affects the game when playing CTF (because you can't see that the flag has been taken).

![Non-print Chars](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/WSNames.jpg)


### Customizable Radio Messages

Radio messages are predefined messages that can be sent by pressing a 2-keys combination.

![Radio Panels](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/RadioPanels.jpg)

First press a radio key:
- `Z`, for sending to All Players
- `X`, for sending only to Team Members
- `C`, to say something using a bubble over your ship

Then, press a number key (`0`-`9`), to send the desired message.  You can also cancel (and hide this panel), by pressing the respective radio key again.

You can also customize the messages for each panel, by clicking the Customize Messages link in each panel.
You can customize up to 30 messages, 10 for each panel.

Customized messages are saved in the browser's local storage, so they persist between gaming sessions.

You can make multilined messages by using the '`|`' character. Multiline messages are sent in parts every couple of seconds.  E.g:  `This is my|multiline message|please don't use it|to spam the chat panel.`


![Radio Customization](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/RadioCustomization.jpg)


### Minimap Leaders Tracking

The minimap displays the position of players ranked 1, 2 and 3 on the scoreboard, for an extra challenge to both, the leaders and the rest.

![Leaders Tracking](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/MinimapLeaders.jpg)


### Player Tracking

You want to play with real-life friends and family, but it gets tedious trying to find yourselves between all those other users?   Just activate Player Tracking.

- While you are alive, click the name of the Targeted Player in the scoreboard (or the extended scoreboard, by clicking View All).
- The target's location is displayed in the minimap, with a crosshair icon.

![Player Tracking](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/TargetedPlayer.jpg)

Note:  I understand that for some people, this feature might be polemical. I myself keept it removed when releasing previous versions of the mod, but it was requested to me BY A LOT OF PLAYERS who wanted it to play with real life friends/family, and I think that in those cases, given that there are not private servers, it's a really useful feature.

### Arrow Indicators

In Capture The Flag, when a flag is being carried or dropped outside of its original position, an arrow is shown pointing in its direction.

![CTF Arrows](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/CTFArrows.png)


### Laser colors

Lasers! Who needs missiles when you can have pwew-pwew-lasers? And they are colored according to the team.
Green lasers for the Imperials (blue team), red lasers for the Rebels (red team).

![Laser Colors](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/LaserColors.jpg)


### Player's position and team member's health

 The player's position in the scoreboard, is shown in the ship's name.

 Also, in CTF the health is shown in numeric form, only for teammates.

![Player Score Place](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/PlayersPlace.jpg) 


### Voice Messages for Flag Events

When playing Capture The Flag (CTF), you will hear a voice informing you when your flag or the enemies' flag has been taken, recovered or captured.

There are two voices:
- A Male Stormtrooper voice for Imperials.
- A Female for Rebels.

Voice Messages can be enabled / disabled in the Mod Settings window.

### HyperSpace Visual Effects

When you start a match, change server or respawn, you will land at the new coordinates vía an Hyperspace Jump.

The screen will display an animated hyperspace visual FX for a very brief moment...

![Hyperspace Jump](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Hyperspace.jpg)


### Powerup Visual Effects

When picking up an Inferno or Shield crate, the game now displays some visual effects to make you feel more into the action.

With Inferno, the screen gets a reddish hue, to make you feel like a true sith, with your powers increasing while the you are pulled into the Dark side of the Force.

With Shield, the screen becomes brighter, more energetic, letting you see more details, thanks to the power of the Force!

![Power Ups](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Inferno.jpg)


### Kill Streaks

So, you have killed 5 players without daying?  Let's make you feel more proud, and let the others know that you are
a powerful pilot, by making your ship glow in the colors of your team!

![Kill Streaks](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/KillStreakBlue.jpg)


### Team Leader's Ship

The fist player in the scoreboard (in FFA and BR), and the first player in each team (CTF) gain a special ship.
Because, a fine leader needs a fine ship!

Currently, it's only available for predators (tie fighter/x-wings).  Imperials get a Sith Infiltrator, and Rebels get a Golden X-Wing.

![Leader Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/LeaderShips.jpg)


### Cruise Control

Press `5` or `END` key, or click the Cruise Control button below the upgrades icons, to enable or disable.

Cruise Control makes your ship keep moving forward automatically, until you disable it, by either pressing `5`/`END` again, or `UP`/`DOWN`.

A![Cruise Control](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/CruiseControl.jpg)


### Auto-Pilot

*This is an experimental feature.*

Alt+Click on the minimap to activate a pathfinding Auto-pilot that will avoid obstacles and reach to the selected destination. It's disabled when arriving at destination or pressing a movement key.

Note: It's a little bit slow to avoid being banned for packet flooding. Its an experiment I made for fun, and as a self-challenge. I might optimize it eventually... or not.

![Auto-Pilot](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/AutoPilot.jpg)


### Mimick other Players

Replicate another user's movements.  To avoid this being exploited, I removed most automation. So, now it depends on some manual actions, but it can still be really fun to use and even super dangerous when used by some skilled and coordinated users.

How to use it:

- `ALT + [Right Click]` on a player to select as mimic target.
- `ALT + [Right Click]` on you, to stop mimicking (remove target).
- `INS` or `,` to align the ship with the mimic target.
- `HOME` or `.` to pause/resume mimicking.
- `-` to toggle between normal or mirrored mimic (180 degrees rotation of actions).

### Drop Flag Shortcut

When playing Capture The Flag (CTF), press `Y` to /drop the flag. The flag will be left floating for others to grab.

<br><br>
<br>


## **User Interface and Shotcuts**

### Mod Settings Window

A window that lets you enable/disable several mod options.

NOTE TO MAC USERS:  As Airmash is pretty heavy for Macs (I don't know why), this is where you can play enabling/disabling background layers, to make the game run better.   I would reccomend disabling just the nebula layers for Mac Users.


It can be accessed via the Main Menu by clicking the button Mod Settings, or by clicking the gear button in the upper right corner while playing.

Shortcut: `F10` (only when playing)

![Mod Settings](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ModSettings.jpg)


### Zoom Level

Zoom slider in Settings window. Now that a lot of players are playing with expanded Field of View, having this option might help to level the field. 

Set the zoom level by dragging the slider. Default is 2500.


### Reddit Panel

Displays the first page of posts for the discussion in reddit.com/r/AirMash on the main screen.
This panel can be disabled in the Mod Settings window.

![Reddit Panel](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/RedditPanel.jpg)


### Changelog Panel

Displays the latest changes to the mod in the Main Screen.


### Who-killed-Who Log

As the name implies, it's a log that shows who was killed, and by who. It's displayed in the upper right corner of the screen and can be disabled via the Mod Settings Panel.

![Who Killed Who](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/WhoKilledWho.jpg)


### Game Log

A window containing the complete log of the events occured since the user joined. It can be opened by clicking the Who-Killed-Who Log.

Shortcut: `F9`

![Game Log](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/GameLog.png)


### "Player joined/left" Log

Placed in the same panel as the Who-Killed-Who log, there's also a log of players joining and leaving the game.
This can also be enabled/disabled via the Mod Settings window.

### Kills / Deaths Counters

A panel displaying Kills/Deaths info of the player:
- Number of Kills 
    - First line: during this life
    - Second line: Total
- Number of Deaths

![K/D Counters](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/KDCounters.png)

### Mod Section in the Help Window

A Mod shortcuts section is added to the Help window, describing the shortcuts used by the Mod.

![Help Panel](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/HelpPanel.jpg)


### Show / Hide User Interface elements.

These options let you have a cleaner screen to play.

While playing, in the upper right corner of the screen, there is a button that shows/hides the leaderboard. 

`F3` shortcut:  You can also use `F3` key to toggle leaderboard.

`F4` shortcut:  Use the `F4` key to show/hide the majority of the other user User Interface controls (logo, users connected, left-sidebar icons, leaderboard, etc).  This can be used in conjunction with `F3` key.


### FPS / Debug Information

As this is intended to be used for debug, it's only accessible via a console command:   `SWAM.showDegubInfo();`


### Move Minimap to Upper Right corner

As the title implies, moves the minimap from the bottom, to the upper right corner of the screen.

This is only accesible via console, but was requested by a user:   `SWAM.moveMinimap();`


### Ship Names

This is just a cosmetic change, but the tooltips for the ships now display the respective star wars ship names (only in StarMash v1 & v2 Themes).


<br><br>
<br>


## **Chat**

### Unlimited length for chat messages

Messages that are longer than the maximum lenght are split and sent in parts. This applies for messages to All, Team, Whisper and Say (bubble).

![Split Chat](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/SplitChat.jpg)

Thanks to player "Linus Torvalds" for this idea.


### URL Links

Valid URLs sent and received are converted to links, for easy opening.

Again, thanks to player "Linus Torvalds" for this idea.

### Resend previous messages

When you have the chat input box open, and you haven't written anything, press UP or DOWN to navigate previous sent messages. It behaves similar to a console window (for the players who are developers).

TIP: Please note that if you write something, or edit one of the previous messages, then you can't navigating the messages. You have to clear the box or undo the change. This is made intentionally because sometimes, when you are writing, an enemy comes and you need to move. Without this failsafe, if you pressed UP/DOWN to move, you would also lose the text you wrote before the interruption.


### Team Colors in chat window

Player's name is colored in the chat box, when playing CTF.

![Chat Colors](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ChatColors.jpg)

### Sound on Whisper

A double-tic (TIC TIC) Sound is played when a whisper is received.

### Copy to clipboard

Copy the text of a message to the system's clipboard by right-clicking on the message.

### Clear chat panel

I added a button to clear the chat box. Just click the button that says: "Clear chat" in the chat box!

Shortcut: `DEL` key.

![Chat Colors](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ChatClear.jpg)

### -SWAM-PING Command

Ok, this is not a Chat Improvement, but it's done in the chat.  Write and send `-SWAM-PING` in the chat, and you will receive a list of players using StarMash, and the Theme they are using.


<br><br>
<br>


## **Spectator Mode**

#### Free Camera Spectator Mode

This is a completely new way to watch the game.  When you are in spectator mode, press the `Free Camera` button at the bottom center of the screen. You can also activate this clicking your name in the leaderboard (and the View All scoreboard).

The game will stop following the player, ZOOM OUT and now you can navigate the map freely with a wider view of the map using the Arrow Keys.

This is ideal and inspired for those players who love to commentate the match.

To exit Free Camera Spectator,  just click the `Spectate Next` or `Spectate Previous`  buttons at the bottom of the screen,   click on player's ship, or click a player's name in the scoreboard.

You can enable/disable the ZOOM OUT in free camera spectator, in the Mod Settings window.


#### Click to spectate

When in Spectator mode, click over a player, a name on the leaderboard, or a name in the "View All scoreboard", to spectate the selected player. (Note that u can't see enemy prowlers when they are hidden).



## **Future features**

While I can't promise anything, I've been working on some features that are still not ready for release. Some of these, include:

    - More beautiful background resources
    - 3D animations for every ship! Let's give this 2D game a new 3D perspective!
    - ~~Statistics~~ (it's now being developed by STEAMROLLER, check for STATSBOT in CTF)
    - Friends Lists
    - And more!

Of course, feedback, opinions and feature suggestions are greatly appreciated!


<br><br><br><br>
-------------------------------------------------------
<br>

## Legal and Disclaimer

Disclaimer: 
I am not responsible for any damages that the use of this mod can cause to you, or the device. Use it at your own risk!


Star Wars, its Intellectual Property (ships, names, images, sounds and logos) are property of Lucasfilm LTE and The Walt Disney Company. All the resources used for this mode are for non-commercial use, fan made and under fair use.<>
