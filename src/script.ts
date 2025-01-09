const formInput = document.querySelector("#form") as HTMLFormElement;

const inputValue = document.querySelector("#user") as HTMLInputElement;

const mainContainer = document.querySelector("#main") as HTMLElement;

interface userData {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  url: string;
}

fetchUsers("https://api.github.com/users");

async function myCustomFetch<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `There is some issue in fetching data as ${response.status}`
    );
  }

  const data = response.json();
  console.log(data);
  return data;
}

function fetchUsers(url: string) {
  myCustomFetch<userData[]>(url, {});
}
