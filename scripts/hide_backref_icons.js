// ==UserScript==
// @name         Get rid of the ugly backref icon on hackmd when you use footnotes.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://hackmd.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // OK, I mean, it's nasty but I wait for the page load here...
    // Now the reason we can't just do something like window.addEventListener("load", ...)
    // is because the backreferences are actually not in the DOM at the time the page is
    // loaded. In fact, they are subtituted in after the page has finished loaded by some
    // client-side javascript supplied by hackmd. A better snippet would probably execute
    // a retry loop for something egregious like 10 seconds, but these scripts aren't
    // really meant to be production quality, so to speak...
    setTimeout(function() {
        let footnote_backrefs = document.getElementsByClassName("footnote-backref");
        for (let i = 0; i < footnote_backrefs.length; i++) {
            footnote_backrefs[i].style.visibility = "hidden";
        }

        console.log("Hid " + footnote_backrefs.length + " backref icons.");
    }, 3000)
})();
