/*
  Simple script to get user IP address.
  
  Use This Script:
    <script src="//cdn.jsdelivr.net/gh/keift/cdn/getip52ac9cf8.js"></script>
  
  Example Usage:
    console.log("Your IP address: " + __ip_addr);
*/

var __ip_addr="0.0.0.0";function __updateIPADDR(){fetch("//httpbin.org/ip").then(async a=>{__ip_addr=(await a.json()).origin})}__updateIPADDR(),setInterval(__updateIPADDR,1e4);
