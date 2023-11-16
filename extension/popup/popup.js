const bojroomsLink = '';
const bojroomsLinkElement = document.querySelector('.bojrooms-link');
bojroomsLinkElement.addEventListener('click', () => {
  chrome.tabs.create({ url: bojroomsLink, active: true });
});
