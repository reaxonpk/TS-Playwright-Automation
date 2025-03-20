var bodyEl = document.body;
bodyEl.style.backgroundColor = "#000";
bodyEl.style.color = "#fff";
bodyEl.style.border = "2px solid red";
console.log("body background", bodyEl.style.backgroundColor);
var divEls = document.getElementsByTagName("div");
var btn = document.getElementsByTagName("button")[0];
btn.style.background = "green";
btn.textContent = "About me";
var headingsTwo = document.getElementsByTagName("h2");
var paragraphs = document.getElementsByTagName("p");
var shops = document.getElementById("shops");
var items = document.getElementsByClassName("list-item");
var secondItem = document.getElementsByClassName("list-item")[1];
secondItem.textContent = "Second Element";
var selectedH2 = document.querySelector("h2");
if (selectedH2) {
    selectedH2.style.color = "blue";
}
console.log("selectedH2", selectedH2);
