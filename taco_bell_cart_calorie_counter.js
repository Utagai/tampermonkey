// ==UserScript==
// @name         Taco Bell Cart Calorie Counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  counts calories in a taco bell cart
// @author       may
// @match        https://www.tacobell.com/cart
// @grant        none
// ==/UserScript==


// THIS IS NOT GOOD JAVASCRIPT.
//
// In fact, I am embarrassed to let people on the internet see this. It could
// be so much better, in so many ways. There are probably ways to make it
// better that I am not aware of. The reality is, I don't know much Javascript,
// I just torture it to do my bidding when I need to do some dirty automation.
// So, although I deserve the judgment you will surely cast upon me, try to not
// judge me. :)

(function() {
  'use strict';

  let cartUL = document.getElementsByClassName("order-entry-list")[0].children[0];

  let cals = [];

  for (let i = 0; i < cartUL.children.length; i++) {
    cals.push(0);
  }

  // We try to get some fake concurrency going because waiting for multiple
  // page GETs, especially fully-fleshed out HTML/CSS/JS pages in serial
  // fashion simply takes too long.
  for (let i = 0; i < cartUL.children.length; i++) {
    setTimeout(function() {
      let order = cartUL.children[i];
      let orderLink = order.children[1].children[1].children[0].href;

      let xmlHTTP = new XMLHttpRequest();
      xmlHTTP.onreadystatechange = function() {
        if (xmlHTTP.readyState==4 && xmlHTTP.status==200) {
          return xmlHTTP.responseText;
        }
      };
      xmlHTTP.open("GET", orderLink, false);
      xmlHTTP.send(null);

      let container = document.createElement('html');
      container.innerHTML = xmlHTTP.responseText;
      let orderCalories = parseInt(container.getElementsByClassName("calorie-value")[0].innerText);
      cals[i] = orderCalories
      console.log("Cals: " + orderCalories);
    }, 0);
  }

  function check() {
    let allSet = true;
    for (let i = 0; i < cartUL.children.length; i++) {
      allSet = allSet && (cals[i] != 0)
    }

    if (allSet) {
      console.log("Done fetching pages");
    } else {
      console.log("Still waiting");
    }

    return allSet;
  }


  function waitUntilFetched() {
    console.log("Waiting...");
    if (!check()) {
      setTimeout(waitUntilFetched, 1000);
    } else {
      // At this point, we have grabbed all the calories of each menu item.

      let totalCalories = 0;
      for (let i = 0; i < cals.length; i++) {
        totalCalories += cals[i];
      }

      console.log("Total calories: " + totalCalories);

      // Now finally, let's update the UI.

      let summary = document.getElementsByClassName("order-summary")[0].children[0];
      summary.innerHTML = summary.innerHTML + " (" + totalCalories + " cals)";
    }
  }

  waitUntilFetched();
})();
