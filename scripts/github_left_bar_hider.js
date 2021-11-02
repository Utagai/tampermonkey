// ==UserScript==
// @name         Hide Github left activity side bar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // This super long class name is what the Github sidebar class name is. This
  // is kind of brittle for obvious reasons, but it's quick and fast and should
  // be trivial to update if Github ever changes the class name (and easy to
  // notice when it breaks).
  document.getElementsByClassName(
    "dashboard-sidebar js-sticky top-0 px-3 px-md-4 px-lg-5 overflow-auto"
  )[0].style.display = "none";
})();
