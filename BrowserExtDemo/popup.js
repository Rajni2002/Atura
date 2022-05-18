let changeColor = document.getElementById("changeColor");
let Heading = document.getElementById("Box");

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  changeColor.style.backgroundColor = "red";
  console.log(window);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  const keywords = [
    " Buy now ",
    " Buy ",
    " Pay ",
    " Pay now ",
    " Add to Cart ",
  ];
  ans = false;
  for (let i = 0; i < keywords.length; i++) {
    if (window.find(keywords[i])) {
      ans = true;
      break;
    }
  }
  if (ans) confirm("Looks like you want to buy something");
  chrome.runtime.sendMessage({ isKeyword: ans }, function (response) {
    console.log(response.isDone);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  sendResponse({ isDone: "Yes" });
  Heading.innerText = request.isKeyword;
});
