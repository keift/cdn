/*
  Simple script to get user IP address.
  
  Use This Script:
    <script src="//cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
    <script src="//cdn.jsdelivr.net/gh/paiode/cdn/getip52cd9cf8.js"></script>
  
  Example Usage:
    console.log("Your IP address: " + getIP());
*/

var getIP;function updateIP(){$.get("//httpbin.org/ip",function(t){getIP=(()=>t.origin)})}$(function(){updateIP()}),setInterval(()=>{updateIP()},3e4);
