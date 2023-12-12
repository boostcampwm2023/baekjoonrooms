const bojroomsLink = 'https://baekjoonrooms.com';
const bojroomsLinkElement = document.querySelector('.bojrooms-link');
bojroomsLinkElement.addEventListener('click', () => {
  chrome.tabs.create({ url: bojroomsLink, active: true });
});

const toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ data: 'toggle' });
});
