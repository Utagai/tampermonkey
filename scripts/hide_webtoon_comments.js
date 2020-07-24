// ==UserScript==
// @name         Hide the cringey webtoons comment section
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.webtoons.com/en/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let comments = document.getElementsByClassName("comment_area")[0]
  comments.style.visibility = "hidden";

  document.onkeypress = function (e) {
    e = e || window.event;
    if (e.code === "Minus" || e.code == "Equal") {
      if (comments.style.visibility === "hidden") {
        comments.style.visibility = "";
      } else {
        comments.style.visibility = "hidden";
      }
    }
  };
})();
