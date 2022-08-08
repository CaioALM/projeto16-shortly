import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connection from '../../database.js';

dotenv.config();

export async function postRegister(req, res) {
    const user = req.body;

    try {
        const { rows: users } = await connection.query(
            `SELECT * FROM users WHERE email=$1`, 
            [user.email]);

        if ( users.rowCount == 0 ) return res.sendStatus(409);

        const bcryptPassword = bcrypt.hashSync(user.password, 10);

        await connection.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", 
            [user.name, user.email, bcryptPassword]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

}

export async function postLogin(req, res) { 

    const user = req.body;
    
    try {

        const  { rows: users } = await connection.query(
            `SELECT * FROM users WHERE email=$1`, 
            [user.email]);

        console.log("Usuários do banco", users.rowCount);
        if(users.rowCount == 0){
            return res.sendStatus(401);
        }

        if(bcrypt.compareSync(user.password, users.password)){

            const data = {
                id: users.id,
                name: users.name,
            }
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(data, secretKey);

            await connection.query(
                `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
             [token, users.id])
            return res.status(200).send(token);
        }

        res.sendStatus(401);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


//testado