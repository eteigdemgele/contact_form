import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import { dbConfig } from './dbConfig';
import { contactRouter } from './contactRouter';
import { accueilRouter } from './accueilRouter';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, '../filepug'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/accueil', accueilRouter);
app.use('/contact', contactRouter);

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur TypeScript !');
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
