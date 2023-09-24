import Joi from 'joi';

export const RentSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().greater(0).required()
})