var profiles = [
  {
    "id": "3de1f853cf7e0f2032969d59872589fa",
    "accounts": [
      {
        "name": "trlink",
        "token": "6c38938930f02f4559ef1dbe6ea5533a94e31d94"
      },
      {
        "name": "ouoio",
        "token": "aJfdQpj1"
      },
      {
        "name": "uiiio",
        "token": "7c96516c8799bdd9fb480942c8d7691a311a73ec"
      },
      {
        "name": "exeio",
        "token": "355ab59b34a04e703cd3d817dcba131f3feeb834"
      },
    ]
  }
];

var search_params = new URLSearchParams(location.search);
var recently_redirected_links = JSON.parse(localStorage.getItem("recently_redirected_links")) || [];
var _token = search_params.get("token");

var b64encode = value => btoa(value).split("=").join("");
var b64decode = value => atob(value);

function generateRandomBuffer(size) {
  let buffer = new Uint8Array(size);
  crypto.getRandomValues(buffer);
  return String.fromCharCode(...buffer);
};

async function shortISGD(url) {
  let { data } = await axios.get("https://is.gd/create.php", {"params": {"url": "https://redr89e90cb6.tr.gg?token=" + b64encode(JSON.stringify({url})), "format": "json"}});
  return data.shorturl;
};

history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));

document.addEventListener("DOMContentLoaded", async () => {
  let token = _token;
  _token = undefined;

  if (!token) return;

  try {
    let { prf_id, url } = JSON.parse(b64decode(token));
    if (prf_id === undefined || url === undefined) throw new Error();
    
    let profile = profiles.find(profile => profile.id === prf_id);
    let referral_links = [];
    let expiration_until = "1m";

    let verified_refl = "https://refl75df6c94.blogspot.com/redirection?token=" + b64encode(JSON.stringify(
      {
        "verified": true,
        "referral_links": profile.accounts.map(account => ({"acc_id": account.token, "url": "_blank", expiration_until})),
        "target_link_url": url.split("http://").join("//").split("https://").join("//")
      }
    ))
    
    for (let i = 0;i < profile.accounts.length;i++) {
      let shrink_url;
      if (profile.accounts[i].name === "trlink") shrink_url = "https://tr.link/full?api=" + profile.accounts[i].token + "&url=" + b64encode(verified_refl);
      if (profile.accounts[i].name === "ouoio") shrink_url = "https://ouo.io/qs/" + profile.accounts[i].token + "?s=" + verified_refl;
      if (profile.accounts[i].name === "uiiio") shrink_url = "https://uii.io/full?api=" + profile.accounts[i].token + "&url=" + b64encode(verified_refl);
      if (profile.accounts[i].name === "exeio") shrink_url = "https://exe.io/full?api=" + profile.accounts[i].token + "&url=" + b64encode(verified_refl);
      referral_links.push({"acc_id": profile.accounts[i].token, "url": (await shortISGD(shrink_url)).split("http://").join("//").split("https://").join("//"), expiration_until});
    }

    let unverified_refl = "https://refl75df6c94.blogspot.com/redirection?token=" + b64encode(JSON.stringify(
      {
        "verified": false, referral_links,
        "target_link_url": url.split("http://").join("//").split("https://").join("//")
      }
    ))

    console.log(verified_refl, unverified_refl)
    
    console.log(await shortISGD(unverified_refl))
  } catch(err) {
    return;
  }
});
