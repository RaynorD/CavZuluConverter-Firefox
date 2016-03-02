var timezoneLabel, timezoneOffset;;

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}

function walk(node) {
  var child, next;

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  textNode.nodeValue = textNode.nodeValue.replace(/(\d{2}:?\d{2}(?: Zulu(?=\W|$)|Zulu(?=\W|$)|Z(?=\W|$)| Z(?=\W|$)))/gi, appendTimezone);
}

function appendTimezone(match) {
  var oldText = match;
  
  var hasColon = (oldText.indexOf(':') > -1);
  if(hasColon) {
     oldText = oldText.replace(":","");
  }
  
  var hasSpace = (oldText.indexOf(" ") === 4);
  
  var timeRegex = /^\d{4}/;
  var oldTime = Number(timeRegex.exec(oldText));

  var newTime = oldTime - (timezoneOffset * 100);
  
  if(newTime > 2400) {newTime -= 2400};
  if(newTime < 0) {newTime += 2400};
  
  newTime = pad(newTime, 4);
  
  if(hasColon) {
    newTime = (newTime.slice(0,2) + ":" + newTime.slice(2));
  }
  
  var spacePad = " ";
  if(!hasSpace || (timezoneLabel == "")) {
    spacePad = "";
  }
  
  var newString = match.concat(" (", newTime, spacePad, timezoneLabel, ")");
  return newString;
}

self.port.on("timezoneLabel", function(port_timezoneLabel) {
  var d = new Date();
  var offset = d.getTimezoneOffset();
  timezoneOffset = (offset / 60);

  timezoneLabel = port_timezoneLabel;
  walk(document.body);
});
