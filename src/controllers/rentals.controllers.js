import { db } from "../database/database.connection.js";

export async function postRent (req, res){
    res.send('postRent')
}

export async function getRentals (req, res){
    res.send('getRentals')
}

export async function updateRent (req, res){
    res.send('updateRent')
}

export async function deleteRent (req, res){
    res.send('deleteRent')
}