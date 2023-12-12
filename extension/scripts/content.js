const observer = new MutationObserver(injectScript);
let isRoom = false;

const targetNode = document.body;
const config = { childList: true, subtree: true };

observer.observe(targetNode, config);
function injectScript() {
  // const urlPattern = /^http:\/\/localhost:5173\/room\/.*$/;
  const urlPattern = /^https:\/\/baekjoonrooms.com\/room\/.*$/;
  if (urlPattern.test(window.location.href) && !isRoom) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    chrome.runtime.sendMessage({ isActive: true, userInfo });
    isRoom = true;
  } else if (!urlPattern.test(window.location.href) && isRoom) {
    chrome.runtime.sendMessage({ isActive: false, userInfo: undefined });
    isRoom = false;
  }
}
