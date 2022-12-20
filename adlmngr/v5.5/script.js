var searchParams = new URLSearchParams(location.search);
var timeouts = JSON.parse(localStorage.getItem("timeouts")) || {};
var args;

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
        document.title = "Ad Link Manager";
        setTimeout(() => {
          setTitle();
        }, 2000)
      }, 2000)
    }
    setTitle();
  }, 1000)
};

function startTimer(value) {
  function count() {
    document.title = "Please wait for " + value + " seconds";
    $("#text").text("Please wait for " + value + " seconds");
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
    blinkTitle("Error Redirect Code");
    $("#text").text("Error Redirect Code");
  } else {
    try {
      base64.decode(searchParams.get("code"));
    } catch(err) {
      blinkTitle("Error Redirect Code");
      return $("#text").text("Error Redirect Code");
    }
    args = base64.decode(searchParams.get("code")).split(",");
    if (!args[0] || !args[1] || !args[2] || !args[3] || ms(args[3]) === undefined) {
      blinkTitle("Error Redirect Code");
      $("#text").text("Error Redirect Code");
    } else {
      startTimer(10);
      setTimeout(() => {
        document.title = "Redirecting...";
        $("#text").text("Redirecting...");
        function redirection() {
          if (typeof getIP !== "function") {
            setTimeout(() => {
              redirection();
            }, 1000)
            return;
          }
          let code = base64.encode(args[2] + "@" + getIP()).split("=").join("");
          if (!timeouts[code] || timeouts[code] < Date.now()) {
            if (args[4] && args[4] === "true") {
              timeouts[code] = Date.now() + ms(args[3]);
              localStorage.setItem("timeouts", JSON.stringify(timeouts));
              location.href = args[1];
            } else location.href = args[0];
          } else location.href = args[1];
        }
        redirection();
      }, 10000)
    }
  }
});
