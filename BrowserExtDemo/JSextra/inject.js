function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}
injectScript(chrome.extension.getURL('content.js'), 'body');



function SearchForKeywords() {
    const keywords = ["Buy now", "Buy", "Pay", "Pay now", "Add to Cart"];
    ans = false;
    for (let i = 0; i < keywords.length; i++) {
      if (window.find(keywords[i])) {
        ans = true;
        break;
      }
    }
    return ans;
  }
  let TransactionCheck = SearchForKeywords();
  console.log(TransactionCheck);
  document.getElementById("Box").innerText = TransactionCheck;
  