let hr_num = 32;
// hr_numを更新
function updateHrNum() {
  return new Promise(resolve => {
    chrome.runtime.getBackgroundPage(function(bg) {
      hr_num = bg.getHrNum();
      console.log(`${hr_num} at 2`)
      resolve(bg.getHrNum());
    });
  })
}

// バッジを更新
let changeColorBlue = function(){
  console.log(`${hr_num} at 4`);
  chrome.browserAction.setBadgeBackgroundColor({color: "royalblue"});
  chrome.browserAction.setBadgeText({ text: chrome.i18n.getMessage('BadgeText', [hr_num]) });
}

// popupを更新
function changePopup(){
  let youtubeArea = document.getElementById("youtube")
  let twitterArea = document.getElementById("twitter")
  let youtubeText = document.getElementById("youtube-text")
  let twitterText = document.getElementById("twitter-text")
  youtubeText.innerHTML = chrome.i18n.getMessage('YoutubeText', [hr_num]);
  twitterText.innerHTML = chrome.i18n.getMessage('TwitterText', [hr_num]);
  youtubeArea.href = `https://www.youtube.com/results?search_query=%E5%A4%A7%E8%B0%B7+${hr_num}%E5%8F%B7`;
  twitterArea.href = `https://twitter.com/search?q=%E5%A4%A7%E8%B0%B7%E3%80%80${hr_num}%E5%8F%B7&src=typed_query`;
}

// hr_numを更新した後にバッジを更新
async function runInOrder(){
  console.log(`${hr_num} at 1`)
  await updateHrNum();
  console.log(`${hr_num} at 3`)
  changeColorBlue();
  changePopup();
}

runInOrder();
