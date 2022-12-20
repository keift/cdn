var searchParams = new URLSearchParams(location.search);

function randomSymbol(length, symbol) {
  let mask = "";
  let total = "";
  if (symbol.indexOf("a") > -1) mask += "abcdefghijklmnoprstuvyzwxq";
  if (symbol.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPRSTUVYZWXQ";
  if (symbol.indexOf("0") > -1) mask += "0123456789";
  if (symbol.indexOf("_") > -1) mask += "&%@$#*!_.";
  for (let i = length;i > 0;i--) {
    total += mask[Math.floor(Math.random() * mask.length)];
  }
  return total;
};

function blinkTitle(value) {
  setTimeout(() => {
    function setTitle() {
      document.title = value;
      setTimeout(() => {
        document.title = "6dcode";
        setTimeout(() => {
          setTitle();
        }, 2000)
      }, 2000)
    }
    setTitle();
  }, 1000)
};

function startTimer(value) {
  $("#timer").css({"display": "inline"});
  function count() {
    document.title = "Please wait for " + value + " seconds";
    $("#timer").text("Please wait for " + value + " seconds");
    value--;
    setTimeout(() => {
      if (value === 0) return;
      count();
    }, 1000)
  }
  count();
};

$(function() {
  history.pushState("", "", "/?code=" + randomSymbol(256, "aA0"));
  $("#cookieChoiceInfo").remove();
  if (!searchParams.get("code")) {
    blinkTitle("Error 6 Digit Code");
    $("#title").text("Error 6 Digit Code");
  } else {
    try {
      base64.decode(searchParams.get("code"));
    } catch(err) {
      blinkTitle("Error 6 Digit Code");
      $("#title").text("Error 6 Digit Code");
    }
    if (isNaN(base64.decode(searchParams.get("code"))) || base64.decode(searchParams.get("code")).length !== 6) {
      blinkTitle("Error 6 Digit Code");
      $("#title").text("Error 6 Digit Code");
    } else {
      $("#title").text("Your 6 Digit Code");
      $("#code").css({"display": "inline"});
      startTimer(5);
      setTimeout(() => {
        blinkTitle("Your 6 Digit Code: " + base64.decode(searchParams.get("code")));
        $("#code").text(base64.decode(searchParams.get("code")));
        $("#code").css({"user-select": "auto"});
        $("#timer").css({"display": "none"});
      }, 5000)
    }
  }
});
