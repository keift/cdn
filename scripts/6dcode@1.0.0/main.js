var searchParams = new URLSearchParams(location.search);
function randomSymbol(e, t) {
  let i = "",
    o = "";
  (t.indexOf("a") > -1 && (i += "abcdefghijklmnoprstuvyzwxq"),
    t.indexOf("A") > -1 && (i += "ABCDEFGHIJKLMNOPRSTUVYZWXQ"),
    t.indexOf("0") > -1 && (i += "0123456789"),
    t.indexOf("_") > -1 && (i += "&%@$#*!_."));
  for (let r = e; r > 0; r--) o += i[Math.floor(Math.random() * i.length)];
  return o;
}
function blinkTitle(e) {
  setTimeout(() => {
    !(function t() {
      ((document.title = e),
        setTimeout(() => {
          ((document.title = "6dcode"),
            setTimeout(() => {
              t();
            }, 2e3));
        }, 2e3));
    })();
  }, 1e3);
}
function startTimer(e) {
  ($("#timer").css({ display: "inline" }),
    !(function t() {
      ((document.title = "Please wait for " + e + " seconds"),
        $("#timer").text("Please wait for " + e + " seconds"),
        e--,
        setTimeout(() => {
          0 !== e && t();
        }, 1e3));
    })());
}
$(function () {
  if (
    (history.pushState("", "", "/?code=" + randomSymbol(256, "aA0")),
    $("#cookieChoiceInfo").remove(),
    searchParams.get("code"))
  ) {
    try {
      base64.decode(searchParams.get("code"));
    } catch (e) {
      (blinkTitle("Error 6 Digit Code"),
        $("#title").text("Error 6 Digit Code"));
    }
    isNaN(base64.decode(searchParams.get("code"))) ||
    6 !== base64.decode(searchParams.get("code")).length
      ? (blinkTitle("Error 6 Digit Code"),
        $("#title").text("Error 6 Digit Code"))
      : ($("#title").text("Your 6 Digit Code"),
        $("#code").css({ display: "inline" }),
        startTimer(10),
        setTimeout(() => {
          ((document.title =
            "Your 6 Digit Code: " + base64.decode(searchParams.get("code"))),
            blinkTitle(
              "Your 6 Digit Code: " + base64.decode(searchParams.get("code")),
            ),
            $("#code").text(base64.decode(searchParams.get("code"))),
            $("#code").css({ "user-select": "auto" }),
            $("#timer").css({ display: "none" }));
        }, 1e4));
  } else
    (blinkTitle("Error 6 Digit Code"), $("#title").text("Error 6 Digit Code"));
});
