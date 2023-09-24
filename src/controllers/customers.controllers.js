import { db } from "../database/database.connection.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        const haveCustomer = await db.query(`SELECT * FROM customers
            WHERE name = $1`,[name]);
        if(haveCustomer.rows[0]) return res.status(409).send('This customers already exist');

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    };
}

export async function getCustomers(req, res){
    try{
        const customers = await db.query(`SELECT * FROM customers`);
        res.send(customers.rows)
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function updateCustomers(req, res){
    res.send('updateCustomers')
}