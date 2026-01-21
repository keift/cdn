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
      ((document.title = e), (title_timeout = setTimeout(() => (document.title = 'embd'), 2e3)));
    }, 4e3)));
}
function sleep(e) {
  return new Promise((t) => setTimeout(t, e));
}
(history.pushState(null, document.title, '/view?token=' + b64encode(generateRandomBuffer(256))),
  document.addEventListener('DOMContentLoaded', async () => {
    let e = _token;
    function t() {
      document.querySelector('#cookieChoiceInfo') ? document.querySelector('#cookieChoiceInfo').remove() : setTimeout(() => t());
    }
    ((_token = void 0), t());
    let n = document.querySelector('#info');
    if (((document.title = 'Loading...'), (n.innerText = 'Loading...'), !e)) {
      (blinkTitle('Error View Token'), (n.innerText = 'Error View Token'));
      return;
    }
    try {
      let { title: r, source: i } = JSON.parse(b64decode(e));
      if (void 0 === i) throw Error();
      (await sleep(1e3), n.remove(), (document.title = r || 'embd'), (document.querySelector('#view').src = i));
    } catch (o) {
      (blinkTitle('Error View Token'), (n.innerText = 'Error View Token'));
      return;
    }
  }));
