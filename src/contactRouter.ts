import express, { Request, Response } from 'express';
import { Client } from 'pg';
import { dbConfig } from './dbConfig';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('contact', { pageTitle: 'contact' });
});

router.post('/', async (req, res) => {
    const client = new Client(dbConfig);

    try {
        await client.connect();

        const userSurname = req.body.User_Surname;
        const userFirstName = req.body.User_Firstname;
        const userEmail = req.body.User_Email;
        const userMessage = req.body.User_Message;

        // Ajout des validations de champs de formulaire en utilisant regex
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!nameRegex.test(userSurname) || !nameRegex.test(userFirstName)) {
            throw new Error('Le prénom et le nom de famille ne doivent contenir que des lettres.');
        }

        if (!emailRegex.test(userEmail)) {
            throw new Error('L\'adresse e-mail n\'est pas valide.');
        }

        const insertQuery = `INSERT INTO contactuser (User_Surname, User_Firstname, User_Email, User_Message)
                             VALUES ($1, $2, $3, $4)`;

        const values = [userSurname, userFirstName, userEmail, userMessage];

        await client.query(insertQuery, values);

        console.log('Message envoyé avec succès');
        res.redirect('/accueil');

    } catch (error) {
        console.error('Assurez-vous que tous les champs (*) ont été complétés : ', error);
        res.status(400).send(`Erreur lors de l'insertion des données : ${error}`);
    } finally {
        await client.end();
    }
});

export { router as contactRouter };
