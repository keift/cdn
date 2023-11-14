/*
  Simple script to get user IP address.
  
  Use This Script:
    <script src="//cdn.jsdelivr.net/gh/keift/cdn/getip52cd9cf8.js"></script>
  
  Example Usage:
    console.log("Your IP address: " + __ip_addr);
*/

var global.__ip_addr = "0.0.0.0";

function __updateIPADDR() {
  fetch("//httpbin.org/ip").then(response => {
    let data = await response.json();
    __ip_addr = data.origin;
  })
};

__updateIPADDR();

setInterval(__updateIPADDR, 10000);
