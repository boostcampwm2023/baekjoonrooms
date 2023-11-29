let isActive = false;

chrome.action.setBadgeText({ text: 'off' });
chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });

chrome.runtime.onMessage.addListener(function (req) {
  if (req.data === 'toggle') {
    isActive = !isActive;
  } else {
    isActive = req.data;
  }

  if (isActive) {
    chrome.action.setBadgeText({ text: 'on' });
    chrome.action.setBadgeBackgroundColor({ color: '#528BFF' });
  } else {
    chrome.action.setBadgeText({ text: 'off' });
    chrome.action.setBadgeBackgroundColor({ color: '#c0c0c0' });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (isActive) {
      if (details.method === 'POST') {
        const sourceCode = details.requestBody.formData.source[0];
        console.log(sourceCode);
        // fetch('', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(sourceCode),
        // });
      }
    }
  },
  { urls: ['https://www.acmicpc.net/submit/*'] },
  ['requestBody'],
);

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (isActive) {
      if (details.method === 'POST') {
        const submitURL = details.responseHeaders.filter((item) => item.name === 'location')[0].value;
        console.log(submitURL);

        // fetch('', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(submitURL),
        // });
      }
    }
  },
  { urls: ['https://www.acmicpc.net/submit/*'] },
  ['responseHeaders'],
);
