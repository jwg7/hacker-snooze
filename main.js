"use strict";

// load 100 top current stories
// story title should be a link to the story URL
// the story's score, number of comments, and author's username should be visible
// make it look nicer using bootstrap.
// host on github pages

/////////////////////////////////////

// query selectors

let body = document.querySelector("body");
body.style.backgroundColor = "#FFF1EB";
let parent = document.createElement("div");
parent.className = "parent";
let child = document.createElement("div");
child.className = "child";
let h1 = document.createElement("h1");
h1.innerText = "Hacker News";
let ol = document.createElement("ol");

// setting up html elements

body.appendChild(parent);
parent.appendChild(h1);
parent.appendChild(child);
child.appendChild(ol);

/////////////////////////////////////

// API request to get best stories

let topUrl =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

let topList = async () => {
  let response = await fetch(topUrl);
  let data = await response.json();

  for (let i = 0; i < 100; i++) {
    console.log(data[i]);
    let storyId = data[i];
    let storyRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
    );
    let storyData = await storyRes.json();

    console.log(storyData);
    console.log(storyData.title);

    // add new item
    let newItem = document.createElement("li");
    ol.appendChild(newItem);

    // add title and URL
    let title = document.createElement("div");
    newItem.append(title);
    title.innerText = storyData.title;
    // change css 
    title.style.fontSize = "24px";
    title.style.cursor = "pointer";
    title.style.textDecoration = "underline"; 
    // links title to url when clicked
    title.addEventListener("click", function () {
      window.location.href = storyData.url;
    });

    // add score, author and total comments to new line
    let newLine = document.createElement("span");
    newItem.append(newLine);
    newLine.innerHTML = `${storyData.score} points | by ${storyData.by} | ${storyData.descendants} comments`;
  }
};

topList();
