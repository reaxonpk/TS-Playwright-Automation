const bodyEl = document.body;
bodyEl.style.backgroundColor = "#000";
bodyEl.style.color = "#fff";

bodyEl.style.border = "2px solid red";

console.log("body background", bodyEl.style.backgroundColor);

const divEls: HTMLCollectionOf<HTMLDivElement> =
    document.getElementsByTagName("div");

const btn: HTMLButtonElement = document.getElementsByTagName("button")[0];

btn.style.background = "green"
btn.textContent = "About me"

const headingsTwo: HTMLCollectionOf<HTMLHeadingElement> =
    document.getElementsByTagName("h2")

const paragraphs: HTMLCollectionOf<HTMLParagraphElement> =
    document.getElementsByTagName("p")

const shops: HTMLElement | null = document.getElementById("shops")

const items: HTMLCollectionOf<Element> =
    document.getElementsByClassName("list-item");

const secondItem: Element = document.getElementsByClassName("list-item")[1];

secondItem.textContent = "Second Element";

const selectedH2 = document.querySelector("h2") as HTMLHeadElement;

selectedH2.style.color = "blue";

const aboutUsBtn = document.querySelector(".about button") as HTMLButtonElement;

console.log("aboutUsBtn", aboutUsBtn);
