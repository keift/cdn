var search_params = new URLSearchParams(location.search);
var timeouts = JSON.parse(localStorage.getItem("timeouts")) || [];
var token = search_params.get("token");
var standby_time = 5;

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
    if (seconds === 0) return callback();
    document.title = "Please wait for " + seconds + " seconds";
    info.innerText = "Please wait for " + seconds + " seconds";
    seconds--;
    setTimeout(count, 1000);
  }
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  count();
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

document.addEventListener("DOMContentLoaded", async () => {
  let info = document.querySelector("#info");
  let expired_timeouts = timeouts.filter(timeout => timeout.expiration_until <= Date.now());
  
  for (let i = 0;i < expired_timeouts.length;i++) timeouts.splice(timeouts.indexOf(expired_timeouts[i]), 1);
  localStorage.setItem("timeouts", JSON.stringify(timeouts));
  
  document.querySelector("#cookieChoiceInfo")?.remove();
  history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));
  
  if (!token) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
  
  try {
    let { verify, referral_links, original_link_url } = JSON.parse(b64decode(token));
    let usable_link = referral_links.find(link => !timeouts.find(timeout => timeout.referral_link_url === link.url && timeout.ip_address === __ip_addr && timeout.expiration_until >= Date.now()));
    
    startTimer(standby_time, async () => {
      if (verify === true && usable_link) {
        timeouts.push({"referral_link_url": usable_link.url, "ip_address": __ip_addr, "expiration_until": Date.now() + ms(usable_link.expiration_until)});
        localStorage.setItem("timeouts", JSON.stringify(timeouts));
      }
      
      document.title = "Redirecting...";
      info.innerText = "Redirecting...";
      await sleep(1000);
      info.innerText = usable_link?.url || original_link_url;
    })
    
  } catch(err) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
});
