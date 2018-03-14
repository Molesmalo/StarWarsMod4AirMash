![Ships](https://molesmalo.github.io/StarWarsMod4AirMash/WebResources/Banner.jpg)

# StarMash - Extesnsions and Themes

This is a little guide for the creation of extensions and themes for the [StarMash Mod](https://molesmalo.github.io/StarWarsMod4AirMash/) for [AirMash](htts://airma.sh).

Read this if you are interested in creating your own features and themes for AirMash.


**What will I be able to create?**

- Well, it depends on your background. If you don't know how to write Javasctipt code, I hope that after reading this you will be able to create some basic Themes, by adapting a theme template and then editing the images in your favorite image editor. 

If you can write Javascript code, then you will be able to create complex and cool extensions and themes! The idea was to give the extensions a lot of freedom to do practically anything. That's why you'll have plenty of options for injecting code to the game at every step of the application's lifecycle.


# **The Basics**

In this document, I'll talk about extensions and themes. So, first of all, let's define those terms in the context of this document.

*What's an Extension?*

An extension is just a Javacript file, that contains the code for some new feature(s) and/or theme(s). Consider it as a StarMash plugin. What makes this Javascript file special, is that when it's loaded by the browser, it registers itself as a StarMash extension, and tells. We will see how that's done later.

An extension can have any kind of code in the file, that makes almost anything you can imagine with the game. And also, it can contain the code for new Themes.

*What's an Theme?*

A Theme is a class that defines certain methods that will be used by StarMash to change the look of the game. An extension can contain multiple Themes, but they must be declared when the extension registers itself on load, in order to let the user apply those themes.

Examples of Themes would be:  Vanilla Theme (AirMash's default look), StarMash Themes, World War 2 Theme.


**Hosting**

When you create an extension, you will need a place on the web where you can publish the file, so others can have access to it. This small guide will assume that you already have access to some hosting service. If you don't, you will first need to find a guide that teaches you how to host your own files on the web, as that exceeds the scope of this guide.


# **Getting started:**

Let's start with the most simple thing: Adding extensions to StarMash

For now, adding new extensions is a manual process, because there isn't *yet* an extensions directory/database where you can find them. So, for the time being, just follow these steps:

1. The most important thing that you need to know about an extension, is it's URL, that is, the web address for the extension. Until there's a database to search for them, a good place to find extensions' URLs is [AirMash's Reddit Page](http://www.reddit.com/r/airmash). For this example, we will use the following URL: 
    https://molesmalo.github.io/StarWarsMod4AirMash/assets/christmasmod.js
So, copy that link address.
2. Open the game. If StarMash is not installed, refer to [this page](https://molesmalo.github.io/StarWarsMod4AirMash/) and follow the instructions to install the Mod.
3. On the Main Screen, open the Extensions Window by clicking the `Themes and Extensions` button. Here, all the themes and extensions thar were loaded are displayed.
4. Click `Add new extension` and a panel with a text input box will appear.
5. Paste the URL you copied on step 1 into the input box.
6. Click the `tick-button` to initiate the loading of the extension.
7. The panel should now change, showing the following information of the extension: 
    Christmas 2017 Theme Extension
    Happy holidays and merry Christmas!
    by Bombita, ver: 1.0
Also, a new theme should be available now in the Themes section, when you open the drop-down list.
8. Click the `Accept` button.  The game will now reload to properly load the extension.

**Congratulations!**

You've loaded your first extension!  Now, you can go back to the Extensions window (clicking `Themes and Extensions`), and check that the extension is now displayed automatically in the extensions list.  You can also check that there's a toggle switch to the left of the extension's description.  This switch lets you enable/disable the loading of the extension when the game loads. There's also a Cross button, that lets you delete the extension from the list.


# Creating my first exension:

Now that you know how to load extensions, Why don't we try to create our very first custom extension?

