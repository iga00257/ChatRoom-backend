import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
const app = express();


// 動態選擇環境變數的檔案
dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
app.get('/', (req, res, next) => {
    res.send('Hello, World!! 123');
});

app.listen(3000, () => console.log('http server is running at port 3000.'));