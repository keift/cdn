var search_params = new URLSearchParams(location.search);
var timeouts = JSON.parse(localStorage.getItem("timeouts")) || {};
var token = search_params.get("token");

var info = document.querySelector("#info");

var title_interval;
var title_timeout;

function generateRandomBuffer(size) {
  let buffer = new Uint8Array(size);
  crypto.getRandomValues(buffer);
  return String.fromCharCode(...buffer);
};

function generateRandomHex(size) {
  let buffer = new Uint8Array(size);
  crypto.getRandomValues(buffer);
  return Array.from(buffer).map(byte => byte.toString(16).padStart(2, "0")).join("");
};

function blinkTitle(value) {
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  document.title = value;
  title_interval = setInterval(() => {
    document.title = value;
    title_timeout = setTimeout(() => document.title = "Ad Link Manager", 2000);
  }, 4000)
};

function startTimer(seconds) {
  function count() {
    document.title = "Please wait for " + seconds + " seconds";
    info.innerText = "Please wait for " + seconds + " seconds";
    seconds--;
    setTimeout(() => {
      if (seconds === 0) return;
      count();
    }, 1000)
  }
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  count();
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#cookieChoiceInfo").remove();
  
  history.pushState("", "", "/redirection?token=" + btoa(generateRandomBuffer(256)));
});
