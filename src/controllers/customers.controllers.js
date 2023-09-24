import { db } from "../database/database.connection.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        const haveCustomer = await db.query(`SELECT * FROM customers
            WHERE cpf = $1`,[cpf]);
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

export async function getCustomersById(req, res){
    const id = req.params.id;
    try{
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(!customer.rows[0]) return res.status(404).send('Customer not founded')
        res.send(customer.rows[0])
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function updateCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body;
    const id = req.params.id;
    try{
        const existentCpf = await db.query(`SELECT * FROM customers
            WHERE cpf = $1 AND id <> $2`
            ,[cpf, id]);
        if(existentCpf.rows[0]) return res.status(409).send('This cpf belongs to someone else');
        await db.query(`UPDATE customers 
            SET name = $1, phone = $2, birthday = $3
            WHERE id = $4`
            ,[name, phone, birthday, id])
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    };
}