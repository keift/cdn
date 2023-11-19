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

history.pushState("", "", "/redirection?token=" + b64encode(generateRandomBuffer(256)));

document.addEventListener("DOMContentLoaded", async () => {
  let token = _token;
  _token = undefined;

  if (!token) return;

  try {
    let { prf_id, url } = JSON.parse(b64decode(token));
    if (url) throw new Error();
    
    console.log(prf_id, url)
  } catch(err) {
    return;
  }
});
