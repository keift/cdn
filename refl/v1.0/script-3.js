var search_params = new URLSearchParams(location.search);
var timeouts = JSON.parse(localStorage.getItem("timeouts")) || [];
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
    title_timeout = setTimeout(() => document.title = "RefL", 2000);
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

document.addEventListener("DOMContentLoaded", async () => {
  var info = document.querySelector("#info");
  document.title = "Please wait...";
  info.innerText = "Please wait...";

  let expired_timeouts = timeouts.filter(timeout => timeout.expiration_until < Date.now());
  
  for (let i = 0;i < expired_timeouts.length;i++) timeouts.splice(timeouts.indexOf(expired_timeouts[i]), 1);
  localStorage.setItem("timeouts", JSON.stringify(timeouts));
  
  document.querySelector("#cookieChoiceInfo")?.remove();
  history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));

  await sleep(1000);
  
  if (!token) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
  
  try {
    let { verify, referral_links, original_link } = JSON.parse(b64decode(token));
    
    
    if (verify === true) {
      
    }
    
  } catch(err) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
});
