const observer = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach(injectScript);
});

const targetNode = document.body;
const config = { childList: true, subtree: true };

observer.observe(targetNode, config);

function injectScript() {
  const urlPattern = /^http:\/\/localhost:5173\/room\/.*$/;
  if (urlPattern.test(window.location.href)) {
    chrome.runtime.sendMessage({ data: true });
  }

  const roomExitButton = document.getElementById('room-exit-button');
  if (roomExitButton) {
    roomExitButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ data: false });
    });
  }
}
