chrome.storage.local.get(['isActive'], function (result) {
  if (result.isActive) {
    chrome.action.setBadgeText({ text: 'on' });
    chrome.action.setBadgeBackgroundColor({ color: '#528BFF' });
  } else {
    chrome.action.setBadgeText({ text: 'off' });
    chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });
  }
});

chrome.runtime.onMessage.addListener(async function (req) {
  const { isActive } = await chrome.storage.local.get(['isActive']);
  if (req.data === 'toggle') {
    chrome.storage.local.set({ isActive: !isActive });
    if (!isActive) {
      chrome.action.setBadgeText({ text: 'on' });
      chrome.action.setBadgeBackgroundColor({ color: '#528BFF' });
    } else {
      chrome.action.setBadgeText({ text: 'off' });
      chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });
    }
  } else {
    chrome.storage.local.set({ isActive: req.isActive });
    chrome.storage.local.set({ userInfo: req.userInfo });
    if (req.isActive) {
      chrome.action.setBadgeText({ text: 'on' });
      chrome.action.setBadgeBackgroundColor({ color: '#528BFF' });
    } else {
      chrome.action.setBadgeText({ text: 'off' });
      chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });
    }
  }
});

// const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://api.baekjoonrooms.com';

chrome.webRequest.onHeadersReceived.addListener(
  async function (details) {
    const { isActive } = await chrome.storage.local.get(['isActive']);
    const { userInfo } = await chrome.storage.local.get(['userInfo']);
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
