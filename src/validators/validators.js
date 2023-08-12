import { body } from 'express-validator';

export const registerUserValidators = [ 
    body('email').exists(),
    body('password').exists()
]

export const loginValidators = [
    body('email').exists(),
    body('password').exists()
]