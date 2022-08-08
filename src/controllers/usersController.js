import connection from "../../database.js"

export async function getUser(req, res) {
    const user = res.locals;
    
    try {
        const urls = await connection.query(`
            SELECT * FROM urls WHERE "userId" = $1`,
            [user.id])

        const urlViews = await connection.query(`
            SELECT SUM("viewCount") AS "visitCount"
            FROM urls
            WHERE "userId" = $1`, [user.id])

        const data = {
            id: user.id,
            name: user.name,
            visitCount: urlViews.rows[0].visitCount,
            shortUrls: urls.rows
        }
            return res.status(200).send(data)

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export async function getRanking(req, res) {
    
    try {

        const users = await connection.query(`
        SELECT us."id", us."name", COUNT(ur."id") AS "linksCount",
        COALESCE( SUM(ur."viewCount"), 0) AS "visitCount" 
        FROM "users" us 
        LEFT JOIN "urls" ur 
        ON us."id" = ur."userId"
        GROUP BY us."id", us."name"
        ORDER BY "visitCount" DESC LIMIT 10`);

       res.status(200).send(users.rows);

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}