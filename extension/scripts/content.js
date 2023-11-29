const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    injectScript();
  });
});

const targetNode = document.body;
const config = { childList: true, subtree: true };

observer.observe(targetNode, config);

function injectScript() {
  const urlPattern = /^http:\/\/localhost:5173\/room\/.*$/;
  console.log(window.location.href);
  const roomExitButton = document.getElementById('room-exit-button');
  if (urlPattern.test(window.location.href)) {
    chrome.runtime.sendMessage({ data: true });
  }
  if (roomExitButton) {
    roomExitButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ data: false });
    });
  }
}
