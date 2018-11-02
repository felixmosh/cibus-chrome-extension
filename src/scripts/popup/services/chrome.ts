function getCookie(name: string, url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({name, url}, (cookie: chrome.cookies.Cookie) => {
      if (cookie !== null) {
        resolve(cookie.value);
      } else {
        reject();
      }
    });
  });
}

export const chromeService = {
  getCookie,
};
