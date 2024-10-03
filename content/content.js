chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractContent') {
      let pageContent = document.body.innerText;
      sendResponse({ content: pageContent });
    }
  });
  // content.js
console.log("Content script loaded!");
