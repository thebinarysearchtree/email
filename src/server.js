import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use('/', express.static('./'));
app.use('/public', express.static('../public'));
app.use('/artworkjs', express.static('../node_modules/artworkjs/src'));

app.get('*', (req, res) => res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/index.html')));

const server = app.listen(3000);

export default server;
