
window.onload = function (e) {
    liff.init(function () {
        initializeApp();
    });
    $('button').hover(function(){
    $('.glitch-wrapper').toggleClass('paused');
    $('body').toggleClass('paused');
    });
};

function getJson(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function initializeApp(){
    var type = getParameterByName('type')
    var client = new HttpClient();
    if (type=== "text") {
        liff.sendMessages([{type: 'text',text: getParameterByName('text')}]).then(function () {liff.closeWindow()});
    }else if(type=="sticker"){
        var stk = getParameterByName('tstk');
        var sid = getParameterByName('stkid');
        var pkg = getParameterByName('stkpkgid');
        var send = getParameterByName('send');
        var uriz="line://shop/sticker/detail/"+pkg;
        var tp="";
        var ep = '';
        if (stk === 'animasi') {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/IOS/sticker_animation@2x.png";
            tp="a";
        } else {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/IOS/sticker@2x.png";
            tp="n";
        }
        if (send===null){
        }else{
            if(send===true || send==="true")
                if(tp==="a"){
                    uriz="line://app/1600328768-y3yq64nw/?type=sticker&tstk=animasi&stkid="+sid+"&stkpkgid="+pkg+"&send=true";
                }else{
                    uriz="line://app/1600328768-y3yq64nw/?type=sticker&tstk=anime&stkid="+sid+"&stkpkgid="+pkg+"&send=true";
                }
        }
        liff.sendMessages([{
          type: "template",
          altText: "Sticker",
          template: {
             type: "image_carousel",
             columns: [{
                 imageUrl: ep,
                 action: {
                     type: "uri",
                     uri: uriz}}
                          ]
                        }
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'audio') {
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: 60000
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img')
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'video') {
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: getParameterByName('piu')
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'textUrl') {
        liff.sendMessages([
	{
		"type": "flex",
		"altText": "Hello World",
		"contents": {
			"type": "bubble",
			"styles": {
				"footer": {
					"separator": true
				}
			},
			"body": {
				"type": "box",
				"layout": "vertical",
				"contents": [
					{
						"type": "text",
						"text": "HELLO WORLD",
						"weight": "bold",
						"size": "xl",
						"align": "center",
						"color": "#3888ff",
						"margin": "md"
					},
					{
						"type": "separator",
						"margin": "xl"
					},
					{
						"type": "box",
						"layout": "vertical",
						"margin": "xxl",
						"spacing": "sm",
						"contents": [
							{
								"type": "text",
								"text": "Price List",
								"weight": "bold",
								"color": "#aaaaaa",
								"size": "sm"
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "Selfbot Premium",
										"size": "sm",
										"color": "#555555",
										"flex": 3
									},
									{
										"type": "text",
										"text": "25k",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									},
									{
										"type": "text",
										"text": "$2.99",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									}
								]
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "Spotify Premium",
										"size": "sm",
										"color": "#555555",
										"flex": 3
									},
									{
										"type": "text",
										"text": "20k",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									},
									{
										"type": "text",
										"text": "$1.40",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									}
								]
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "Protect 6 Bots",
										"size": "sm",
										"color": "#555555",
										"flex": 3
									},
									{
										"type": "text",
										"text": "100k",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									},
									{
										"type": "text",
										"text": "$10.0",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									}
								]
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "Protect 12 Bots",
										"size": "sm",
										"color": "#555555",
										"flex": 3
									},
									{
										"type": "text",
										"text": "150k",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									},
									{
										"type": "text",
										"text": "$15.0",
										"size": "sm",
										"color": "#111111",
										"align": "end"
									}
								]
							},
							{
								"type": "separator",
								"margin": "xxl"
							}
						]
					},
					{
						"type": "box",
						"layout": "vertical",
						"margin": "xxl",
						"spacing": "sm",
						"contents": [
							{
								"type": "text",
								"text": "Info EN",
								"weight": "bold",
								"color": "#aaaaaa",
								"size": "sm"
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "All the prices above are valid for a month, except for Spotify it's valid for a lifetime. Especially for the protection bot, you can use your own VPS, and give us root permission to set it up",
										"wrap": true,
										"size": "sm"
									}
								]
							},
							{
								"type": "text",
								"text": "Info ID",
								"weight": "bold",
								"color": "#aaaaaa",
								"size": "sm"
							},
							{
								"type": "box",
								"layout": "horizontal",
								"contents": [
									{
										"type": "text",
										"text": "Semua harga diatas berlaku sebulan kecuali spotify berlaku selamanya. Terkhusus untuk bot protect jika ingin menggunakan vps sendiri, anda bisa menyiapkan dan memberikan user root vps anda",
										"wrap": true,
										"size": "sm"
									}
								]
							},
							{
								"type": "separator",
								"margin": "xxl"
							}
						]
					},
					{
						"type": "box",
						"layout": "vertical",
						"margin": "xxl",
						"spacing": "sm",
						"contents": [
							{
								"type": "button",
								"style": "primary",
								"action": {
									"type": "uri",
									"label": "ORDER NOW",
									"uri": "https://line.me/ti/p/~belongtoyuuki"
								}
							},
							{
								"type": "button",
								"style": "secondary",
								"action": {
									"type": "uri",
									"label": "LINE SQUARE",
									"uri": "https://line.me/ti/g2/JGUODBE4RE"
								}
							}
						]
					}
				]
			}
		}
	}
]);
        var messages = JSON.parse(getJson(getParameterByName('textUrl')));
        liff.sendMessages(messages);
        liff.sendMessages([{type: 'text', text: 'tests'}]);
    }
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
