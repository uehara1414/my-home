var http = require('http');

const GOOGLE_HOME_IP = process.env.GOOGLE_HOME_IP;
const GOOGLE_HOME_NAME = process.env.GOOGLE_HOME_NAME;
const GOOGLE_HOME_LANG = process.env.GOOGLE_HOME_LANG || 'ja';

http.createServer(function (req, res) {

    var url = require('url').parse(req.url, true);
    var text = url.query.text || ' ';

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8;'});

    speak(text);

    res.end('Say ' + text);

}).listen(1337, '127.0.0.1'); // 127.0.0.1の1337番ポートで待機

function speak(text) {
    const googlehome = require('google-home-notifier');
    googlehome.device(GOOGLE_HOME_NAME, GOOGLE_HOME_LANG);
    googlehome.ip(GOOGLE_HOME_IP, GOOGLE_HOME_LANG);

    googlehome.notify(text, (res) => {
        console.log(res);
    });
}
