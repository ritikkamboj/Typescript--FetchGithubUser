"use strict";
const formInput = document.querySelector("#form");
const inputValue = document.querySelector("#user");
const mainContainer = document.querySelector("#main");
fetchUsers("https://api.github.com/users");
async function myCustomFetch(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`There is some issue in fetching data as ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
function showResultUI(user) {
    const { login, avatar_url, location, url } = user;
    const template = `<div> <img src="${avatar_url}" alt="${login}"/> <div>   </div> <span>${login} <a href="${url}"> Github </a> </span> <hr/> </div>`;
    // Use a container to convert the string into a DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = template;
    // Extract the newly created element
    const element = tempDiv.firstElementChild;
    console.log(element, "jai");
    console.log(template, "jai2");
    if (element) {
        mainContainer.appendChild(element); // Replace `parentElement` with your target DOM element
    }
    else {
        console.error("Failed to create the DOM element.");
    }
    // mainContainer.insertAdjacentElement(
    //   "beforeend",
    //   `<div> <img src=${avatar_url} alt=${login}/> <a href="${url}"> Github </a>  </div>`
    // );
}
function fetchUsers(url) {
    myCustomFetch(url, {}).then((userinfo) => {
        for (const singleUser of userinfo) {
            showResultUI(singleUser);
            console.log("login " + singleUser.login);
        }
    });
}
formInput.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = inputValue.value.toLocaleLowerCase();
    let url = `https://api.github.com/users`;
    mainContainer.innerHTML = "";
    let response1 = await myCustomFetch(url, {});
    let matched = response1.filter((item) => {
        return item.login.toLocaleLowerCase().includes(name);
    });
    if (matched.length === 0) {
        const newElement = document.createElement("div");
        newElement.textContent = "NO Matched Github ID found ";
        mainContainer.appendChild(newElement);
    }
    else {
        for (const singleUser of matched) {
            showResultUI(singleUser);
            // console.log("login " + singleUser.login);
        }
    }
});
