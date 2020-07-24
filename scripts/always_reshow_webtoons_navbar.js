// ==UserScript==
// @name         make webtoons nav bar at top always visible.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.webtoons.com/en/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // This works because I assumed that the way Webtoon's was making this fade
  // was by grabbing the toolbar by its HTML id, and then toning down the
  // opacity gradually with a JS script. The way to break their code is to grab
  // that element and change its ID so their scripts can't find it. Then I make
  // it opaque. This lets me avoid having to keep making it visible every X
  // milliseconds to fight their scripts.  Play smart, not hard, I guess?
  let toolbar = document.getElementById("toolbar");
  console.log(toolbar);
  toolbar.id = "my_toolbar_now";

  // Wait for a second because otherwise we'll enter a race with Webtoon's own
  // scripts running on the instance of the toolbar they've already nabbed
  // before we changed the ID.
  setTimeout(function() {
    toolbar.style = {};
  }, 1000)
})();
