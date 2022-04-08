/*
  Put these codes in your page to use the npm package 'ms'.
  
  Use This Script:
    <script src="//cdn.jsdelivr.net/npm/ms/index.js"></script>
    <script src="//cdn.jsdelivr.net/gh/paiode/cdn/npm_ms81fb47f4.js"></script>
  
  Example Usage:
    console.log("1 day is " + ms("1d") + " milliseconds");
*/

function ms(n,r){r=r||{};var t=typeof n;if("string"===t&&n.length>0)return parse(n);if("number"===t&&isFinite(n))return r.long?fmtLong(n):fmtShort(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))}
