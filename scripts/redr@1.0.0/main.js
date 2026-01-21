var title_interval,
  title_timeout,
  search_params = new URLSearchParams(location.search),
  _token = search_params.get('token'),
  b64encode = (e) => btoa(e).split('=').join(''),
  b64decode = (e) => atob(e);
function generateRandomBuffer(e) {
  let t = new Uint8Array(e);
  return (crypto.getRandomValues(t), String.fromCharCode(...t));
}
function blinkTitle(e) {
  (clearInterval(title_interval),
    clearTimeout(title_timeout),
    (document.title = e),
    (title_interval = setInterval(() => {
      ((document.title = e), (title_timeout = setTimeout(() => (document.title = 'redr'), 2e3)));
    }, 4e3)));
}
function sleep(e) {
  return new Promise((t) => setTimeout(t, e));
}
(history.pushState(null, document.title, '/redirection?token=' + b64encode(generateRandomBuffer(256))),
  document.addEventListener('DOMContentLoaded', async () => {
    let e = _token;
    function t() {
      document.querySelector('.cc_banner-wrapper') ? document.querySelector('.cc_banner-wrapper').remove() : setTimeout(() => t());
    }
    ((_token = void 0),
      (document.querySelector('head').innerHTML += `
    <style>
      * {
        user-select: none;
      }
  	  
      body {
        color: #000000;
        font-family: sans-serif;
      }
    </style>
  `),
      (document.querySelector('body').innerHTML = `
    <div id="app" style="margin-top: 250px;text-align: center">
      <h2 id="info"></h2>
    </div>
  `),
      t());
    let r = document.querySelector('#info');
    if (!e) {
      (blinkTitle('Error Redirection Token'), (r.innerText = 'Error Redirection Token'));
      return;
    }
    try {
      let { url: n } = JSON.parse(b64decode(e));
      if (void 0 === n) throw Error();
      location.href = n.split('http://').join('//').split('https://').join('//');
    } catch (i) {
      (blinkTitle('Error Redirection Token'), (r.innerText = 'Error Redirection Token'));
      return;
    }
  }));
