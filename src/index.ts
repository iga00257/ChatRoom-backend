import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as http from 'http';
import * as WebSocket from 'ws';
const app = express();


//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket) => {
    ws.send(
        JSON.stringify({text:"新用戶加入聊天室"})
        );
        console.log("1")

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        const {username,text} = JSON.parse(message)

        //log the received message and send it back to the client
        console.log('received: %s', text);
        let clients = wss.clients
	    // Use loop for sending messages to each client
	    clients.forEach(client => {
	        client.send(JSON.stringify({text}))
	    })
    });

    //send immediatly a feedback to the incoming connection    
    // ws.send({text:'Hi there, I am a WebSocket server'});/
});

//start our server
server.listen( 8080, () => {
    console.log(`Server started on port ${server.address()?.toString} :)`);
});
// 動態選擇環境變數的檔案
// dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
app.get('/', (req, res, next) => {
    res.send('Hello, World!! 123');
});
// app.listen(8080,()=>{"httpserver start"})



// app.listen(3000, () => console.log('http server is running at port 3000.'));