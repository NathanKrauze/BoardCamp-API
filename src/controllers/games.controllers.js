import { db } from "../database/database.connection.js";

export async function postGames(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{
        const haveGame = await db.query(`SELECT * FROM games
            WHERE name = $1`,[name]);
        if(haveGame.rows[0]) return res.status(409).send('This game already exist');

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4)`,
            [name, image, stockTotal, pricePerDay]);
    }catch(err){
        res.status(500).send(err.message);
    }
    res.send('name')
}

export async function getGames(req, res){
    res.send('getGames')
}