var emojiData;
var emojiNames;

loadJSON(function(response) {
     emojiData = JSON.parse(response);
     emojiNames = Object.keys(emojiData);

     console.log(emojiData);
     console.log(emojiNames);
});

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/emojiNameKeys.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function emojisForString(textToTranslate) {
    
    var words = textToTranslate.split(" ");

    var translatedText = "";
    
    for (var j = 0; j < words.length; ++j) {
        var word = words[j];

        var nameMatched = false

        for (var i = 0; i < emojiNames.length; ++i) {
            var emojiName = emojiNames[i];

            if (nameMatched == false) {
                var emojiNameComponents = emojiName.split(" ");

                if (emojiNameComponents.indexOf(word) > -1) {
                    nameMatched = true;

                    translatedText += emojiData[emojiName];
                    translatedText += " ";
                }
            } else {
                break;
            }
        }

        if (nameMatched == false) {
            translatedText += word;
            translatedText += " ";
        }
    }
    
    return translatedText
}