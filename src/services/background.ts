//import blah from "context?script"
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({
    url: 'https://mail.google.com',
    active: true
  });

  return false;
});
// chrome.action.onClicked.addListener((tab) => {
//   console.log(tab);
//   if(tab.id) {
//       chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: [contentPath],
//     });
//   }
// });
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.message === "recording_completed") {
      chrome.tabs.create({
        url: `http://localhost:5173/file/${request.fileName}`,
        active: true
      });
      sendResponse({response: "okay"})
    }
  }
);