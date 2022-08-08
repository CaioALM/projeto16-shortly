import connection from "../../database.js"
import { nanoid } from 'nanoid'

export async function  postUrl(req, res) {
    const { url } = req.body
    const { user } = res.locals;
 try {
   
     const shortUrl = nanoid(10)
     
     await connection.query(`
     INSERT INTO urls ("url", "userId", "shortUrl") VALUES ($1, $2, $3)`,
     [ url, user.id, shortUrl ])

     return res.status(201).send({shortUrl})



 } catch(error){
    console.log(error)
    return res.sendStatus(422)
 }

}
export async function getShortUrl(req, res) {
    const { id } = req.params;

    try {
        const { rows: url } = await connection.query(`
        SELECT * FROM urls WHERE id = $1`, [ id ]);

        const data = {
            id,
            shortUrl: url.shortUrl,
            url: url.url
        }

        if (url.rowCount === 0) return res.sendStatus(404);

        return res.status(201).send(data);
    } catch (error) {
        console.log(error) 
        return res.sendStatus(404)
    }
}

export async function getUrl(req, res) {

    const { shortUrl } = req.params;
    try {


        const { rows: url } = await connection.query(`
        SELECT * FROM urls WHERE shortUrl = $1`, [ shortUrl ]);
        
        if (url.rowCount === 0) return res.sendStatus(404);

        await connection.query(`
        UPDATE "urls" SET "viewCount" = "viewCount" + 1 WHERE id = $1`,
         [url.id]);

        return res.redirect(url.url);

    } catch(error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export async function deleteUrl(req, res) {
        const { id } = req.params;
        const { users } = res.locals
    try {
            const { rows: url } = await connection.query(`
            SELECT * FROM users WHERE id = $1`, [id]);

            if (url.userId !== users.id ) return res.sendStatus(401);

            await connection.query(`
            DELETE FROM urls WHERE id = $1`, [id]);
            return res.sendStatus(401);

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

