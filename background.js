let hr_num = 32

let setBadgeText = function(){
  chrome.browserAction.setBadgeBackgroundColor({color: "tomato"});
  chrome.browserAction.setBadgeText({ text: chrome.i18n.getMessage('BadgeText', [hr_num]) });
}

(function(){
  setBadgeText();
});

let firebaseConfig = {
  apiKey: "AIzaSyAjdKSN2TEvf7lEbd0gejkJ9Novu9TqBYQ",
  authDomain: "bigflyohtanisan-88335.firebaseapp.com",
  projectId: "bigflyohtanisan-88335",
  storageBucket: "bigflyohtanisan-88335.appspot.com",
  messagingSenderId: "191680536865",
  appId: "1:191680536865:web:1326bd327e888815b79e60",
  measurementId: "G-1Q0DMQ168D"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

// リアルタイムリスナー
db.collection('mlb_data').doc('ohtani').onSnapshot(function(doc){
  console.log(doc.data().hr_num);
  hr_num = doc.data().hr_num;
  // setBadgeText()と同じ処理
  chrome.browserAction.setBadgeBackgroundColor({color: "tomato"});
  chrome.browserAction.setBadgeText({ text: chrome.i18n.getMessage('BadgeText', [hr_num]) });
}, err => {
  console.log(err);
});

// popup.jsで使うための関数
window.getHrNum = function(){
  return hr_num
}
