//https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
//http://ntt.cc/2008/01/19/base64-encoder-decoder-with-javascript.html
//https://web.archive.org/web/20100611210643/http://www.json.org/js.html
window.onload = function(e) {
    try {
        liff.init(function(data) {
            initializeApp(data);
        });
    } catch (error) {
        document.getElementById('message').innerHTML = error.message;
    }
};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open('GET', aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();

var keyStr = 'ABCDEFGHIJKLMNOP' +
    'QRSTUVWXYZabcdef' +
    'ghijklmnopqrstuv' +
    'wxyz0123456789+/' +
    '=';

function encode64(input) {
    input = escape(input);
    var output = '';
    var chr1, chr2, chr3 = '';
    var enc1, enc2, enc3, enc4 = '';
    var i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);

    return output;
}

function decode64(input) {
    var output = '';
    var chr1, chr2, chr3 = '';
    var enc1, enc2, enc3, enc4 = '';
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        document.getElementById('message').innerHTML = "There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.";
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';

    } while (i < input.length);

    return unescape(output);
}

function initializeApp(data) {
    var queryDict = {};
    location.search.substr(1).split('&').forEach(function(item) { queryDict[item.split('=')[0]] = item.split('=')[1] });

    //document.getElementById('message').innerHTML = JSON.stringify(queryDict);

    typeMsg = queryDict['type'];
    textB64 = queryDict['text'];
    stickerId = queryDict['stickerId'];
    packageId = queryDict['packageId'];
    previewB64 = queryDict['previewUrl'];
    downloadB64 = queryDict['downloadUrl'];
    messageB64 = queryDict['messages'];
    messageUrlB64 = queryDict['messageUrl'];

    if (typeMsg == 'text' && textB64 !== 'undefined') {
        text = decode64(decodeURIComponent(textB64));
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        liff.sendMessages([{
            type: typeMsg,
            text: text
        }]);
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'sticker' && stickerId !== 'undefined' && packageId !== 'undefined') {
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        liff.sendMessages([{
            type: typeMsg,
            packageId: packageId,
            stickerId: stickerId
        }]);
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'stickerimage' && stickerId !== 'undefined' && packageId !== 'undefined') {
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        animation = queryDict['animation'];
        if (animation !== 'undefined' && animation.toString() === 'true') {
            imageUrl = 'https://stickershop.line-scdn.net/stickershop/v1/sticker/' + stickerId + '/IOS/sticker_animation@2x.png';
        } else {
            imageUrl = 'https://stickershop.line-scdn.net/stickershop/v1/sticker/' + stickerId + '/IOS/sticker@2x.png';
        }
        liff.getProfile().then(function(profile) {
            liff.sendMessages([{
                type: 'template',
                altText: profile.displayName + ' sent a sticker.',
                template: {
                    type: 'image_carousel',
                    columns: [{
                        imageUrl: imageUrl,
                        action: {
                            type: 'uri',
                            uri: 'line://shop/sticker/detail/' + packageId
                        }
                    }]
                }
            }]);
        }).catch(function(error) {
            document.getElementById('message').innerHTML = 'Error send stickerimage ' + error.message;
        });
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'image' && previewB64 !== 'undefined' && downloadB64 !== 'undefined') {
        downloadUrl = decode64(decodeURIComponent(downloadB64));
        previewUrl = decode64(decodeURIComponent(previewB64));
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        liff.sendMessages([{
            type: typeMsg,
            originalContentUrl: downloadUrl,
            previewImageUrl: previewUrl
        }]);
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'video' && previewB64 !== 'undefined' && downloadB64 !== 'undefined') {
        downloadUrl = decode64(decodeURIComponent(downloadB64));
        previewUrl = decode64(decodeURIComponent(previewB64));
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        liff.sendMessages([{
            type: typeMsg,
            originalContentUrl: downloadUrl,
            previewImageUrl: previewUrl
        }]);
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'messages' && messageB64 !== 'undefined') {
        messages = JSON.parse(decode64(decodeURIComponent(messageB64)));
        document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
        liff.sendMessages(messages);
        document.getElementById('message').innerHTML = 'Success sending message';
    } else if (typeMsg == 'messagesUrl' && messageUrlB64 !== 'undefined') {
        messageUrl = decode64(decodeURIComponent(messageUrlB64));
        client.get(messageUrl, function(response) {
            var messages = JSON.parse(response);
            document.getElementById('message').innerHTML = 'Please wait while your message sending ...';
            liff.sendMessages(messages);
            document.getElementById('message').innerHTML = 'Success sending message';
        });
    }
}
