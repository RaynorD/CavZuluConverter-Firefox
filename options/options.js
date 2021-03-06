function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    timezoneLabel: document.querySelector("#timezoneLabel").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#timezoneLabel").value = result.timezoneLabel || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("timezoneLabel");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);