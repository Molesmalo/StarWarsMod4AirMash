# StarMash - A Star Wars Mod for AirMash

Hi! Welcome to StarMash's Home planet.... I mean, home repo! 

What's StarMash?

- It's a Star Wars Mod for an cool web game called [AirMash](htts://airma.sh).

What does StarMash add to the game? What's included in this mod?

- While it originally started as just a cosmetic MOD, eventually StarMash added A LOT of new features to the base game. Here, I'll try to cover most of the more important features, but it will most surely be an incomplete list, because... believe me, there's a lot of stuff!

The very first thing you will notices, is the entirely new graphics and sounds (over 30 new sounds!).

But that is just the beginning... There's a lot of other things...

https://www.reddit.com/r/airmash/comments/7mr3r5/starmash_a_star_wars_mod_is_now_released/
https://www.reddit.com/r/airmash/comments/7kkjye/a_star_wars_mod/

https://molesmalo.github.io/StarWarsMod4AirMash/redirect_rules/requestly_rules.txt

# Features


## Paralaxing Background

The game now represents space in a simil-3D way, with depth simulation. Closer elements move faster than distant elements, taking the game to a whole new Dimension!

(This is best viewd in the youtube videos)



## Graphics

### 12 New Ships:

12 new ships, divided in two different graphics sets. When playing Capture the Flag, one team looks like Rebel forces, the other like Imperial ships!

In FFA and Battle Royale you can change the graphics set used by your ship, by clicking the Graphics button that is placed over the ship type icons.

Imperial Ships:
- Tie Fighter
- Tie Bomber
- Tie Interceptor
- Tie Advanced
- Tie Phantom

Rebel Ships:
- X-Wing
- B-Wing
- A-Wing
- Y-Wing
- Scout Ship


### Random Background Generation

No two matches look the same! The background is generated for each match.  

The background is composed by 3 main nebula layers, a planet, some other celestial object (still not uploaded), a randomized fleet of Imperial capital ships, and a randomized fleet of Rebel Capital ships.


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

![Asteroids](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Asteroids.jpg)


### New icons

Almost every resource used by the game was changed, even the icons! They now reflect their Star Wars equivalents, including icons for Lasers, Deflector Shields, etc.

Even the Connected Users icon was replaced by a Rebel pilot Icon.



## Audio

### 30 New Ambient Sounds!

Every sound of the game was changed, and then I added a lot more! Because the sounds are as important as the graphics to achieve a good level of immersion in the game.

## Each Ship has its own sound

No two ship types use the same ambient sound... every single one of them (10) have their own distintive ambient sound, respecting the base material (Star Wars).

### Main Menu Music

Disabled by default. 

But you can enable it via the Mod Settings window. It's just a small element to add some sentimentalism and inspiration before playing. Even when enabled, the music stops when you join a game.



## Gameplay


### Non-printable characters replaced with [WS]

Non-printable unicode characters are replaced with [WS], to avoid some players using (abusing) those chars as names, which affects the game when playing CTF (because you can't see that the flag has been taken).

![Non-print Chars](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/WSNames.jpg)


### Customizable Radio Messages

Radio messages are predefined messages that can be sent by pressing a 2-keys combination.

![Radio Panels](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/RadioPanels.jpg)

First press a radio the key:
- Z, for sending to All Players
- X, for sending only Team Members
- C, to send using a Bubble over your ship

Then, press a number key (0-9), to send the desired message.  You can also cancel (and hide this panel), by pressing the respective radio key again.

You can also customize the messages for each panel, by clicking the Customize Messages link in each panel.
You can customize up to 30 messages, 10 for each panel.

Customized messages are saved in the browser's local storage, so they persist between gaming sessions.

You can make multilined messages by using the "|" character. Multiline messages are sent in parts every couple of seconds.  E.g:  "This is my|multiline message|please don't use it|to spam the chat panel."


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

Press 5 or END key, or click the Cruise Control button below the upgrades icons, to enable or disable.

Cruise Press makes your ship  moving forward, until you disable it, by either pressed 5/END again, or UP/DOWN.

![Cruise Control](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/CruiseControl.jpg)


### Auto-Pilot

*This is an experimental feature.*

Alt+Click on the minimap to activate a pathfinding Auto-pilot that will avoid obstacles and reach to the selected destination. It's disabled when arriving at destination or pressing a movement key.

Note: It's a little bit slow to avoid being banned for packet flooding. Its an experiment I made for fun, and as a self-challenge. I might optimize it eventually... or not.

![Auto-Pilot](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/CruiseControl.jpg)


### Mimick other Players

Just for fun.  Imitate other players' movements.

It's currently disabled but I might enable it in the next release.


## User Interface and Shotcuts

### Drop Flag Shortcut

When playing Capture The Flag (CTF), press Y to /drop the flag. The flag will be left floating for others to grab.


### Mod Settings Window

A window that lets you enable/disable several mod options.

NOTE TO MAC USERS:  As Airmash is pretty heavy for Macs (I don't know why), this is where you can play enabling/disabling background layers, to make the game run better.   I would reccomend disabling just the nebula layers for Mac Users.


It can be accessed via the Main Menu (clicking the big button called... *suspense* .... Mod Settings), or by clicking the gear button in the upper right corner while playing.

![Auto-Pilot](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ModSettings.jpg)


### Reddit Panel

Displays the first page of posts for the discussion in reddit.com/r/AirMash on the main screen.
This panel can be disabled in the Mod Settings window.

![Reddit Panel](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/RedditPanel.jpg)


### Who-killed-Who Log

As the name implies, it's a log that shows who was killed, and by who. It's displayed in the upper right corner of the screen and can be disabled via the Mod Settings Panel.

![Who Killed Who](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/WhoKilledWho.jpg)


### "Player joined/left" Log

Placed in the same panel as the Who-Killed-Who log, there's also a log of players joining and leaving the game.
This can also be enabled/disabled via the Mod Settings window.


### Mod Section in the Help Window

A Mod shortcuts section is added to the Help window, describing the shortcuts used by the Mod.

![Help Panel](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/HelpPanel.jpg)


### Show / Hide User Interface elements.

These options let you have a cleaner screen to play.

While playing, in the upper right corner of the screen, there is a button that shows/hides the leaderboard. 

F3 shortcut:  You can also use F3 key to toggle leaderboard (F3).

F4 shortcut:  Use the F4 key to show/hide the majority of the other user User Interface controls (logo, users connected, left-sidebar icons, leaderboard, etc).  This can be used in conjunction with F3 key.


### FPS / Debug Information

As this is intended to be used for debug, it's only accessible via a console command:   SWAM.showDegubInfo();


### Move Minimap to Upper Right corner

As the title implies, moves the minimap from the bottom, to the upper right corner of the screen.

This is only accesible via console, but was requested by a user:   SWAM.moveMinimap();


### Ship Names

This is just a cosmetic change, but the tooltips for the ships now display the respective star wars ship names.



## Chat

### Unlimited length for chat messages

Messages that are longer than the maximum lenght are split and sent in parts. This applies for messages to All, Team, Whisper and Say (bubble).

![Split Chat](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/SplitChat.jpg)

Thanks to player "Linus Torvalds" for this idea.


### URL Links
URLs sent and received are converted into links, for easy opening.

Note: right now it works pretty poorly because I used a weak regular expression... I have to google for a better one to replace that :P.... I'll update this when I do that.

Thanks to player "Linus Torvalds" for this idea.


### Resend previous messages

When you have the chat input box open, and you havent written anything, press UP or DOWN to navigate previous sent messages. It behaves similar to a console window (for the players who are developers).

NOTE: If you edit one of the previous messages, you can't keep navigating, you have to clear the box or undo the change.


### Team Colors in chat window

Player's name is colored in the chat box, when playing CTF.

![Chat Colors](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ChatColors.jpg)

### Clear chat panel

I added a button to clear the chat box. Just click the button that says: "Clear chat" in the chat box!

![Chat Colors](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/ChatClear.jpg)



## Spectator Mode

#### Free Camera Spectator Mode

This is a completely new way to watch the game.  When you are in spectator mode, press the Free Camera button at the bottom center of the screen. You can also activate this clicking your name in the leaderboard (and the View All scoreboard).

The game will stop following the player, ZOOM OUT and now you can navigate the map freely with a wider view of the map using the Arrow Keys.

This is ideal and inspired for those players who love to commentate the match.

To exit Free Camera Spectator,  just click the Spectate Next/Spectate Previous  buttons at the bottom of the screen,   click on player, or click a player's name in the scoreboard.

You can enable/disable the ZOOM OUT in free camera spectator, in the Mod Settings window.


#### Click to spectate

When in Spectator mode, click over a player, a name on the leaderboard, or a name in the "View All scoreboard", to spectate the selected player. (Note that u can't see enemy prowlers when they are hidden).



## HOW TO USE IT








## Acknowledgements

First of all, thanks to the Airmash developers for making this great game, and be cool with me modding it.
Thanks to Lucasfilms for the Star Wars franchise.

To a lot of players that helped me testing this Mod,
The ones I can remember of the top of my head:
Detect, Romario, THOM182, MATTDAMON, yutru, jediMaster, Maximous, Sky Lounge, Moz://a, Linus Torvalds, Akaryatrh (for opening issues on the GH repo)... Sorry if I forgot somebody!


.

.

.

.


## Legal and Disclaimer

Disclaimer: 
I am not responsible for any damages that the use of this mod can cause to you, or the device. Use it at your own risk!


Star Wars, its Intellectual Property (ships, names, images, sounds and logos) are property of Lucasfilm LTE and The Walt Disney Company. All the resources used for this mode are for non-commercial use, fan made and under fair use.