runExtension();

async function runExtension() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  // const keywords = [
  //   " Buy now ",
  //   " Buy ",
  //   " Pay ",
  //   " Pay now ",
  //   " Add to Cart ",
  // ];
  // for (let i = 0; i < keywords.length; i++) {
  //   if (window.find(keywords[i])) {
  //     ans = true;
  //     break;
  //   }
  // }
  let budget = ["Appareal, Foods & grocery", "Transportation", "Internet"];
  let budgetObject = {
    appareal: 1000,
    foodgrocery: 2000,
    transportation: 1000,
    internet: 300,
  };

  let ans = (window.location.href == "https://www.amazon.in/gp/cart/view.html?ref_=nav_cart")
  console.log(ans);
  if(ans){
    if (confirm("Looks like you want to buy something")) {
      let category = prompt("Enter the category");
      category = category.toLowerCase;
      let amount = Number(prompt("Enter the amount"));
      if (budgetObject.category < amount) {
        alert("You are in your" + category + "budget, good to Go");
      } else if (budgetObject.category == amount) {
        alert("You exactly consumed the budget of " + category);
      } else {
        alert("You are out of budget");
      }
    }
  }
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
});

