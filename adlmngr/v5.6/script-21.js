var search_params = new URLSearchParams(location.search);
var links = JSON.parse(localStorage.getItem("links")) || {};
var token = search_params.get("token");

var title_interval;
var title_timeout;

var b64encode = value => btoa(value).split("=").join("");
var b64decode = value => atob(value);

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

async function SHA256(data) {
  let encoder = new TextEncoder();
  let uint8_data = encoder.encode(data);
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", uint8_data))).map(byte => byte.toString(16).padStart(2, "0")).join("");
};

function blinkTitle(title) {
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  document.title = title;
  title_interval = setInterval(() => {
    document.title = title;
    title_timeout = setTimeout(() => document.title = "Ad Link Manager", 2000);
  }, 4000)
};

function startTimer(seconds, callback) {
  function count() {
    document.title = "Please wait for " + seconds + " seconds";
    info.innerText = "Please wait for " + seconds + " seconds";
    seconds--;
    setTimeout(() => {
      if (seconds === 0) return callback();
      count();
    }, 1000)
  }
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  count();
};

document.addEventListener("DOMContentLoaded", async () => {
  var info = document.querySelector("#info");
  document.title = "Please wait...";
  info.innerText = "Please wait...";
  
  document.querySelector("#cookieChoiceInfo")?.remove();
  history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));
  
  if (!token) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
  
  try {
    let data = JSON.parse(b64decode(token));
    let data_id = await SHA256(JSON.stringify(data));
    let link = links.find(link => link._id === data_id);

    startTimer(5, () => {
      document.title = "Redirecting...";
      info.innerText = "Redirecting...";
    })
  } catch(err) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
});
