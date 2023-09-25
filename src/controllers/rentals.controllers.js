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

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, null, $5, null)`,
            [customerId, gameId, rentDate, daysRented, originalPrice]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getRentals (req, res){
    try{
        const allRentals = await db.query(`
            SELECT rentals.*, customers.id AS "custId" , customers.name AS "custName", games.id AS "gamId", games.name AS "gamName"
            FROM rentals
            JOIN customers ON "customerId" = customers.id
            JOIN games ON "gameId" = games.id;`);
        const formatRentals = allRentals.rows.map(rent => {
            const newRent = {
                    ...rent, 
                    rentDate: rent.rentDate.toISOString().slice(0,10), 
                    customer: {id: rent.custId, name: rent.custName}, 
                    game: {id: rent.gamId, name: rent.gamName}};
            delete newRent.custId; 
            delete newRent.custName;
            delete newRent.gamId;
            delete newRent.gamName;
            return newRent;
        })
        res.send(formatRentals)
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function finishRent (req, res){
    res.send('updateRent')
}

export async function deleteRent (req, res){
    res.send('deleteRent')
}