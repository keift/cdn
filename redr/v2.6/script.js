var title_interval,title_timeout,search_params=new URLSearchParams(location.search),token=search_params.get("token"),b64encode=e=>btoa(e).split("=").join(""),b64decode=e=>atob(e);function generateRandomBuffer(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),String.fromCharCode(...t)}function generateRandomHex(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),Array.from(t).map(e=>e.toString(16).padStart(2,"0")).join("")}async function SHA256(e){let t=new TextEncoder().encode(e);return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",t))).map(e=>e.toString(16).padStart(2,"0")).join("")}function blinkTitle(e){clearInterval(title_interval),clearTimeout(title_timeout),document.title=e,title_interval=setInterval(()=>{document.title=e,title_timeout=setTimeout(()=>document.title="Redr",2e3)},4e3)}function startTimer(e,t){clearInterval(title_interval),clearTimeout(title_timeout),function n(){if(0===e)return t();document.title="Please wait for "+e+" seconds",info.innerText="Please wait for "+e+" seconds",e--,setTimeout(n,1e3)}()}function sleep(e){return new Promise(t=>setTimeout(t,e))}history.pushState("","","/redirection?token="+b64encode(generateRandomBuffer(256))),document.addEventListener("DOMContentLoaded",async()=>{function e(){document.querySelector(".cc_banner-wrapper")?document.querySelector(".cc_banner-wrapper").remove():setTimeout(()=>e())}e(),document.querySelector("head").innerHTML+=`
    <style>
      * {
        user-select: none;
      }
  	  
      body {
        color: #000000;
        font-family: sans-serif;
      }
    </style>
  `,document.querySelector("body").innerHTML=`
    <div id="app" style="margin-top: 250px;text-align: center">
      <h2 id="info"></h2>
    </div>
  `;let t=document.querySelector("#info");if(document.title="Please wait...",t.innerText="Please wait...",!token){blinkTitle("Error Redirection Token"),t.innerText="Error Redirection Token";return}try{let{redirection_url:n}=JSON.parse(b64decode(token));if(void 0===n)throw Error();startTimer(standby_time,async()=>{document.title="Redirecting...",t.innerText="Redirecting...",await sleep(1e3),location.href=n.split("http://").join("//").split("https://").join("//")})}catch(r){blinkTitle("Error Redirection Token"),t.innerText="Error Redirection Token";return}});
