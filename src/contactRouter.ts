import express, { Request, Response } from 'express';
import { Client } from 'pg';
import { dbConfig } from './dbConfig';
import { succesRouter } from './succesRouter'; 



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
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{1,50}$/; 
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; 
        const messageRegex = /^.{1,150}$/;

        if (!nameRegex.test(userSurname) || !nameRegex.test(userFirstName)) {
            throw new Error('Le prénom et le nom de famille ne doivent contenir que des lettres et ne doivent pas dépasser 50 caractères.');
        }

        if (!emailRegex.test(userEmail) || userEmail.length > 100) {
            throw new Error('L\'adresse e-mail n\'est pas valide.'); 
        }

        if (!messageRegex.test(userMessage)) {
            throw new Error('Le message ne doit pas dépasser 150 caractères.');
        }
        
        const insertQuery = `INSERT INTO contactuser (User_Surname, User_Firstname, User_Email, User_Message)
                             VALUES ($1, $2, $3, $4)`;

        const values = [userSurname, userFirstName, userEmail, userMessage];

        await client.query(insertQuery, values);

        console.log('Message envoyé avec succès');
        res.redirect('/msgsucces');

    } catch (error) {
        console.error('Assurez-vous que tous les champs (*) ont été complétés : ', error);
        res.status(400).send(`Erreur lors de l'insertion des données : ${error}`);
    } finally {
        await client.end();
    }
});

export { router as contactRouter };