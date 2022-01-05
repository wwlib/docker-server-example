const WebSocket = require('ws');
const readline = require("readline");

function connect() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const port = process.env.PORT || 5005;
    const url = process.env.CLIENT_URL || `ws://localhost:${port}/test`
    console.log(`URL:`, url);
    const ws = new WebSocket(url, { headers: { } })

    ws.on('open', () => {
        console.log('client connected');
        ask("> ");
    });

    ws.on('close', () => {
        console.log('client closed');
        rl.close();
    });

    ws.on('error', (error) => {
        console.log(error);
    });

    ws.on('message', function incoming(message) {
        console.log(`${message}`);
        ask("> ");
    });

    const ask = (prompt) => {
        rl.question(prompt, function (input) {
            const messageData = input;
            ws.send(messageData);
        });
    }

    rl.on("close", function () {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
}

async function doIt() {
    connect();
}

doIt();

export { };
