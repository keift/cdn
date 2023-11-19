var search_params = new URLSearchParams(location.search);
var _token = search_params.get("token");
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

function blinkTitle(title) {
  clearInterval(title_interval);
  clearTimeout(title_timeout);
  
  document.title = title;
  title_interval = setInterval(() => {
    document.title = title;
    title_timeout = setTimeout(() => document.title = "embd", 2000);
  }, 4000)
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

history.pushState("", "", "/view?token=" + b64encode(generateRandomBuffer(256)));

document.addEventListener("DOMContentLoaded", async () => {
  let token = _token;
  _token = undefined;
  
  function removeElements() {
    if (document.querySelector(".cc_banner-wrapper")) {
      document.querySelector(".cc_banner-wrapper").remove();
    } else setTimeout(() => removeElements());
  }
  removeElements();

  let info = document.querySelector("#info");
  document.title = "Loading...";
  info.innerText = "Loading...";
  
  if (!token) {
    blinkTitle("Error View Token");
    info.innerText = "Error View Token";
    return;
  }
  
  try {
    let { source } = JSON.parse(b64decode(token));
    if (source === undefined) throw new Error();
    
    await sleep(1000);

    let embed = document.createElement("iframe");
    embed.src = source;
    
    document.querySelector("#app").appendChild(embedContent);
  } catch(err) {
    blinkTitle("Error View Token");
    info.innerText = "Error View Token";
    return;
  }
});
