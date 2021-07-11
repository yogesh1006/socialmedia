const { check } = require('express-validator');

module.exports = {

    validateSignup: () => {
        return ([
            check('name', 'Name is required.').notEmpty(),
            check('email', 'Email is required.').notEmpty().isEmail(),
            check('password', 'Password is required.').notEmpty(),
        ])
    },

    validateLogin: ()=> {
        return ([
            check('email', 'Email is required.').notEmpty().isEmail(),
            check('password', 'Password is required.').notEmpty(),
        ])
    },
}