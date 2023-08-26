var addresses = [
  "//gaari.glitch.me",
  "//firatozden.glitch.me",
  "//saatex.glitch.me",
  "//ipfetcher.glitch.me",
  "//dosbot.glitch.me",
  "//giftminer.glitch.me",
  "//puhu-51a9js7aj.glitch.me",
  "//mern-82ha6ng16.glitch.me",
  "//translator-91d73hsa5.glitch.me",
  "//ouo-3hq0xe4tq.glitch.me",
  "//yaai-82jd9aj2s.glitch.me",
  "//paiode-js64ds68j.glitch.me",
  "//paiodenews-84jd73gs6.glitch.me",
  "//paioderadio-93ux157s3.glitch.me",
  "//baymax-8wjd8za9a.glitch.me",
  "//roomie-o2ke2dwo2.glitch.me",
  "//blacklist-83nsd18sp.glitch.me",
  "//quick-nextjs-project.glitch.me",
  
  "//aec5fcab6c7ba4a6.glitch.me?name=uptimebot",
  
  "//584e64b01969c1c0.glitch.me?name=craftnex_bot",
  "//b5efcbe4fdf47bf3.glitch.me?name=paiode_bot",
  "//i9ejr3mv90cos0qq.glitch.me?name=tellony",
  "//p4fclfy376ej56sk.glitch.me?name=ipfetcher",
  "//fug73bqyzqdt10v8.glitch.me?name=ahmet_radyo",
  "//5vfpo3m5jqs2t3vt.glitch.me?name=discord_reklam_botu",
  "//1c2ypo4io92d4x35.glitch.me?name=wumpus",
  "//l610ig4irtqgc1en.glitch.me?name=sarayin_giderleri",
  "//pa1coxty1h2yjxm7.glitch.me?name=ayb_linkler_bot",
  "//12wnr6xwptiksc99.glitch.me?name=ayb_linkler",
  "//uo14k5mnnst2vvhg.glitch.me?name=chatship",
  "//43s8w0p8o8oytgn5.glitch.me?name=chatship",
  "//tnakjg0t8qkbclol.glitch.me?name=fir4tozden",
  "//n3045g4pxw9hn3bk.glitch.me?name=pofier",
  "//9d3713e30035c8f6.glitch.me?name=baymax_mc",
  "//h9kbuh266iwd6tmb.glitch.me?name=ahmetin_botu",
  "//hisar.glitch.me?name=erenin_botu",
  "//alert-wooden-hare.glitch.me?name=ercanin_botu"
];
let timestamp = Date.now();

function maskURL(url) {
  let splitted_url = url.split(".");
  let masked_url = "";
  
  if (splitted_url.length === 2) {
    masked_url += splitted_url[0].split("//")[0] + "//" + splitted_url[0].split("//")[1].substr(0, splitted_url[0].split("//")[1].length / 2) + "*".repeat(splitted_url[0].split("//")[1].length / 2);
    masked_url += "." + splitted_url[1];
  } else if (splitted_url.length === 3) {
    masked_url += splitted_url[0].split("//")[0] + "//" + splitted_url[0].split("//")[1].substr(0, splitted_url[0].split("//")[1].length / 2) + "*".repeat(splitted_url[0].split("//")[1].length / 2);
    masked_url += "." + splitted_url[1].substr(0, splitted_url[1].length / 2) + "*".repeat(splitted_url[1].length / 2);
    masked_url += "." + splitted_url[2];
  } else return splitted_url.join(".");
  
  return masked_url;
};

function ping() {
  document.querySelector("#responses").innerHTML = "";
  for (let i = 0;i < addresses.length;i++) {
    document.querySelector("#responses").innerHTML = `
      ${document.querySelector("#responses").innerHTML}
      <div>
        <a href="${addresses[i]}">${maskURL(addresses[i])}</a><span style="color: #808080"> - </span><span id="address--${i}" style="color: #FFA500">PENDING: --</span>
      </div>
    `
    
    fetch(addresses[i]).then(async response => {
      document.querySelector("#address--" + i).innerHTML = "SUCCESS: " + response.status;
      document.querySelector("#address--" + i).setAttribute("style", "color: #008000");
    }).catch(err => {
      document.querySelector("#address--" + i).innerHTML = "ERROR: ??";
      document.querySelector("#address--" + i).setAttribute("style", "color: #FF0000");
    })
  }
};

setTimeout(ping, 5000);

setInterval(() => {
  document.querySelector("#uptime").innerHTML = Date.now() - timestamp;
}, 100)

setInterval(ping, 60000);
