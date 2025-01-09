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
    const data = response.json();
    console.log(data);
    return data;
}
function fetchUsers(url) {
    myCustomFetch(url, {});
}
