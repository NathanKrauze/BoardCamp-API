import { db } from "../database/database.connection.js";
import dayjs from 'dayjs';

export async function postRent (req, res){
    const{customerId, gameId, daysRented} = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    try{
        const customerExists = await db.query(`SELECT * FROM customers WHERE id = $1`,[customerId]);
        if(!customerExists.rows[0]) return res.status(400).send('Customer not registered')

        const gameInfo = await db.query(`SELECT * FROM games WHERE id = $1`,[gameId]);
        if(!gameInfo.rows[0]) return res.status(400).send('Customer not registered');
        const originalPrice = gameInfo.rows[0].pricePerDay * daysRented;

        const rentalsInProgress = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`,[gameId]);
        if(rentalsInProgress.rows.length >= gameInfo.rows[0].stockTotal) return res.status(400).send('Game out of stock');

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, null, $5, null)`,
            [customerId, gameId, rentDate, daysRented, originalPrice]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getRentals (req, res){
    res.send('getRentals')
}

export async function finishRent (req, res){
    res.send('updateRent')
}

export async function deleteRent (req, res){
    res.send('deleteRent')
}