const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());
// app.use(express.text());
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 5005;

wss.on('connection', async (ws: any, req: any) => {
    const location = new URL(req.url as string, `http://${req.headers.host}`)
    const path = location.pathname
    const headers: any = parseURLHeaders(req.url);

    console.log(`docker-example: wss: on connection:`, path, headers);
    console.log(`docker-example: wss: clients count: ${wss.clients.size}`);

    ws.on('close', (function (code: number, reason: string) {
        console.log(`docker-example: ws: on close: code: ${code}, reason: ${reason}`);
    }));

    ws.on('error', (function (error: any) {
        console.log(`docker-example: ws: on error:`, error);
    }));

    if (path == '/test') {
        try {

            ws.on('message', (message: string) => {
                console.log(`docker-example: /test ${message}`);
                ws.send(`ECHO: ${message}`);
                // const command = JSON.parse(message);
            });
        } catch (e) {
            console.log(`docker-example: socket error`);
            console.log(e);
        }
    } else {
        ws.terminate();
    }
});

wss.on('error', (error => {
    console.log(`docker-example: server error`);
    console.log(error);
}));

server.listen(port, () => {
    console.log(`docker-example: HTTP server is ready and listening at port ${port}!`)
});

function parseURLHeaders(url: string): any {
    const urlParts = url.split('?');
    if (urlParts.length <= 1) {
        return {};
    }
    const options = urlParts[1];

    const otherOptionsParts = options.split("&");
    return otherOptionsParts.reduce(function (map, variable) {
        const parts = variable.split("=");
        map[parts[0]] = decodeURI(parts[1]);
        return map;
    }, {});
}

export {};
