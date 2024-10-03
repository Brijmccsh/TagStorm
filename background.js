chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    console.log("Bookmark added to TagStorm:", bookmark);
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: analyzePageContent,
        }, (results) => {
          if (chrome.runtime.lastError) {
            console.error("Error executing script: ", chrome.runtime.lastError);
          } else {
            console.log("Page analysis result: ", results[0].result);
          }
        });
      }
    });
  });
  
  function analyzePageContent() {
    let pageContent = document.body.innerText || "";
    console.log("Analyzing content for TagStorm:", pageContent);
  
    let tags = [];
    if (pageContent.includes("space")) tags.push("Space");
    if (pageContent.includes("WW2")) tags.push("History");
    if (pageContent.includes("military")) tags.push("Military");
  
    return tags;
  }
  