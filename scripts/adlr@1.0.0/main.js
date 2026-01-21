var title_interval,
  title_timeout,
  profiles = [
    {
      id: '3de1f853cf7e0f2032969d59872589fa',
      accounts: [
        { name: '_trlink', token: '6c38938930f02f4559ef1dbe6ea5533a94e31d94' },
        { name: 'ouoio', token: 'aJfdQpj1' },
        { name: 'ouoio', token: 'aJfdQpj1' },
        { name: '_uiiio', token: '7c96516c8799bdd9fb480942c8d7691a311a73ec' },
        { name: '_exeio', token: '355ab59b34a04e703cd3d817dcba131f3feeb834' }
      ]
    }
  ],
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
      ((document.title = e), (title_timeout = setTimeout(() => (document.title = 'adlr'), 2e3)));
    }, 4e3)));
}
async function shortISGD(e) {
  let { data: t } = await axios.get('https://is.gd/create.php', {
    params: {
      url: 'https://redr89e90cb6.tr.gg?token=' + b64encode(JSON.stringify({ url: e })),
      format: 'json'
    }
  });
  return t.shorturl;
}
(history.pushState(null, document.title, '/redirection?token=' + b64encode(generateRandomBuffer(256))),
  document.addEventListener('DOMContentLoaded', async () => {
    let e = document.querySelector('#info'),
      t = _token;
    function o() {
      document.querySelector('#cookieChoiceInfo') ? document.querySelector('#cookieChoiceInfo').remove() : setTimeout(() => o());
    }
    if (((_token = void 0), (document.title = 'Please wait...'), (e.innerText = 'Please wait...'), o(), !t)) {
      (blinkTitle('Error Redirection Token'), (e.innerText = 'Error Redirection Token'));
      return;
    }
    try {
      let { prf_id: i, url: n } = JSON.parse(b64decode(t));
      if (void 0 === i || void 0 === n) throw Error();
      let r = profiles.find((e) => e.id === i),
        a = [],
        c = [],
        l = '12h';
      for (let s = 0; s < r.accounts.length; s++) {
        let u;
        ('trlink' === r.accounts[s].name && (u = '//is.gd/_'),
          'ouoio' === r.accounts[s].name && (u = '//is.gd/_'),
          'uiiio' === r.accounts[s].name && (u = '//is.gd/_'),
          'exeio' === r.accounts[s].name && (u = '//is.gd/_'),
          u &&
            a.push({
              acc_id: r.accounts[s].token + '::' + s,
              url: u,
              expiration_until: l
            }));
      }
      let d =
        'https://refl75df6c94.blogspot.com/redirection?token=' +
        b64encode(
          JSON.stringify({
            verified: !0,
            referral_links: a,
            target_link_url: n.split('http://').join('//').split('https://').join('//')
          })
        );
      for (let f = 0; f < r.accounts.length; f++) {
        let p;
        ('trlink' === r.accounts[f].name && (p = 'https://tr.link/full?api=' + r.accounts[f].token + '&url=' + b64encode(await shortISGD(d))),
          'ouoio' === r.accounts[f].name && (p = 'https://ouo.io/qs/' + r.accounts[f].token + '?s=' + encodeURIComponent(await shortISGD(d))),
          'uiiio' === r.accounts[f].name && (p = 'https://uii.io/full?api=' + r.accounts[f].token + '&url=' + b64encode(await shortISGD(d))),
          'exeio' === r.accounts[f].name && (p = 'https://exe.io/full?api=' + r.accounts[f].token + '&url=' + b64encode(await shortISGD(d))),
          p &&
            c.push({
              acc_id: r.accounts[f].token + '::' + f,
              url: (await shortISGD(p)).split('http://').join('//').split('https://').join('//'),
              expiration_until: l
            }));
      }
      let h =
        'https://refl75df6c94.blogspot.com/redirection?token=' +
        b64encode(
          JSON.stringify({
            verified: !1,
            referral_links: c,
            target_link_url: n.split('http://').join('//').split('https://').join('//')
          })
        );
      location.href = h;
    } catch (k) {
      (blinkTitle('Error Redirection Token'), (e.innerText = 'Error Redirection Token'));
      return;
    }
  }));
