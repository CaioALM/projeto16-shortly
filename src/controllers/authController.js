import bcrypt from 'bcrypt';
import registerSchema from '../schemas/registerSchema.js';


export async function postRegister(req, res) {
    const user = req.body;
    const validation = registerSchema.validate(user, { abortEarly: false});
    
    if (validation.error ) {
        return res.status(422).send(validation.error.details.map((el) => el.message));
    }

    try {
        
        const { rows: users } = await connection.query("SELECT * FROM users");

        if ( users.find(el => el.email === user.email)) return res.sendStatus(409);

        let bcryptPassword = bcrypt.hashSync(user.password, 10);

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", user.name, user.email, bcryptPassword);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }

}

