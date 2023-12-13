import express, { Request, Response } from 'express';
import * as path from 'path';
import { Client } from 'pg';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, '../filepug'));
app.set('view engine', 'pug');

app.get('/accueil', (req: Request, res: Response) => {
    res.render('accueil', { pageTitle: 'accueil' });
});

app.get('/contact', (req: Request, res: Response) => {
    res.render('contact', { pageTitle: 'contact' });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur TypeScript !');
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});


const dbConfig = {
    user: 'adminuser',
    password: 'adminpassword',
    database: 'mydatabase',
    host: 'localhost',
    port: 5432,
};


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', async (req, res) => {
  const client = new Client(dbConfig);

  try {
    // Connexion au client PostgreSQL
    await client.connect();

    // Données du formulaire
    const userSurname = req.body.User_Surname;
    const userFirstName = req.body.User_Firstname;
    const userEmail = req.body.User_Email;
    const userMessage = req.body.User_Message;

    // Requête SQL pour insérer les données dans la table
    const insertQuery = `INSERT INTO contactuser (User_Surname, User_Firstname, User_Email, User_Message)
                         VALUES ($1, $2, $3, $4)`;

    // Paramètres à passer à la requête
    const values = [userSurname, userFirstName, userEmail, userMessage];

    // Exécution de la requête d'insertion
    await client.query(insertQuery, values);

    console.log('Message envoyé avec succès');
    res.redirect('/accueil');

  } catch (error) {
    console.error('Assurez bous que tout les champs (*) ont été complétés : ', error);
    res.status(400).send(`Erreur lors de l'insertion des données : ${error}`);
  } finally {
    // Fermeture de la connexion à la base de données
    await client.end();
  }
});



// app.post('/contact', async (req, res) => {
//   const client = new Client(dbConfig);

//   try {
//     await client.connect();

//     const { User_Surname, User_Firstname, User_Email, User_Message } = req.body;

//     const insertQuery = `INSERT INTO contactuser (User_Surname, User_Firstname, User_Email, User_Message)
//                          VALUES ($1, $2, $3, $4)`;

//     const values = [User_Surname, User_Firstname, User_Email, User_Message];

//     await client.query(insertQuery, values);

//     console.log('Message envoyé avec succès');
//     res.redirect('/accueil');

//   } catch (error) {
//     if (error.code === '23505') {  // 23505 is the error code for a unique violation in PostgreSQL
//       res.status(400).send('Cet e-mail a déjà été utilisé');
//     } else {
//       console.error('Erreur lors de l\'insertion des données : ', error);
//       res.status(400).send(`Erreur lors de l'insertion des données : ${error}`);
//     }
//   } finally {
//     await client.end();
//   }
// });

