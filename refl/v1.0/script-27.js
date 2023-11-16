var search_params = new URLSearchParams(location.search);
var recently_redirected_links = JSON.parse(localStorage.getItem("recently_redirected_links")) || [];
var token = search_params.get("token");
var standby_time = 0;

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
  let expired_recently_redirected_links = recently_redirected_links.filter(link => link.expiration_until <= Date.now());
  document.title = "Please wait...";
  info.innerText = "Please wait...";
  
  for (let i = 0;i < expired_recently_redirected_links.length;i++) recently_redirected_links.splice(recently_redirected_links.indexOf(expired_recently_redirected_links[i]), 1);
  localStorage.setItem("recently_redirected_links", JSON.stringify(recently_redirected_links));
  
  document.querySelector("#cookieChoiceInfo")?.remove();
  history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));
  
  if (!token) {
    blinkTitle("Error Redirection Token");
    info.innerText = "Error Redirection Token";
    return;
  }
  
  try {
    let { insert_recently_links, referral_links, original_link_url } = JSON.parse(b64decode(token));
    if (!insert_recently_links || !referral_links || !original_link_url) throw new Error();
    
    await sleep(1000);
    let usable_link = referral_links.find(link => !recently_redirected_links.find(_link => _link.url === link.url && _link.ip_address === __ip_addr && _link.expiration_until >= Date.now()));
    
    startTimer(standby_time, async () => {
      if (insert_recently_links === true && usable_link) {
        recently_redirected_links.push({"url": usable_link.url, "ip_address": __ip_addr, "expiration_until": Date.now() + ms(usable_link.expiration_until)});
        localStorage.setItem("recently_redirected_links", JSON.stringify(recently_redirected_links));
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
