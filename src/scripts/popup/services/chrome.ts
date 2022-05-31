function getCookie(name: string, url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ name, url }, (cookie: chrome.cookies.Cookie) => {
      if (cookie !== null) {
        resolve(cookie.value);
      } else {
        reject();
      }
    });
  });
}

function setItem(key: string, obj: any): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set({ [key]: obj }, resolve);
  });
}

function getItem<T>(key: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (result[key]) {
        resolve(result[key]);
      } else {
        reject(`${key} not found`);
      }
    });
  });
}

export const chromeService = {
  getCookie,
  getItem,
  setItem,
};
