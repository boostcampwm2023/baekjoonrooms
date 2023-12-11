let isActive = false;
let userInfo;

chrome.action.setBadgeText({ text: 'off' });
chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });

chrome.runtime.onMessage.addListener(function (req) {
  if (req.data === 'toggle') {
    isActive = !isActive;
  } else {
    isActive = req.isActive;
  }

  if (isActive) {
    chrome.action.setBadgeText({ text: 'on' });
    chrome.action.setBadgeBackgroundColor({ color: '#528BFF' });
    userInfo = req.userInfo;
  } else {
    chrome.action.setBadgeText({ text: 'off' });
    chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });
  }
});

// const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://api.baekjoonrooms.com';

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (isActive && userInfo && userInfo.provider) {
      if (details.method === 'POST') {
        const submitURL = details.responseHeaders.filter((item) => item.name === 'location')[0].value;
        fetch(`${BASE_URL}/submission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ submitURL, provider: userInfo.provider, providerId: userInfo.providerId }),
        });
      }
    }
  },
  { urls: ['https://www.acmicpc.net/submit/*'] },
  ['responseHeaders'],
);
