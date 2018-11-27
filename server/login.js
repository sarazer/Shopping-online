const express = require('express');
const jwt  = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var con = require('./config');
const MAX_AGE = 86400 * 1000;
const router = express.Router();
let token_user = {};
let user_id = '';

module.exports = { router, token_user };

router.get('/cities', (req, res) => {
    con.getQuery('SELECT * FROM cities ORDER BY name', (cities, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(cities);
        }
    });
});

router.get('/orderCount', (req, res) => {
    con.getQuery('SELECT COUNT(id) count FROM orders', (count, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(count[0]);
        }
    });
});

router.get('/productCount', (req, res) => {
    con.getQuery('SELECT COUNT(product_id) count FROM products', (count, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(count[0]);
        }
    });
});
const createToken = user => {
    return jwt.sign(user, 'aetbikauhgihnkjbnikasbugfui', {
        expiresIn: MAX_AGE 
    });
}

const decodeToken = (token, callback) => {
    jwt.verify(token, 'aetbikauhgihnkjbnikasbugfui', callback);
}

router.use(cookieParser());



router.get('/isValidId/:id', (req, res) => {
    const id = req.params.id;
    const selectQuery = 'SELECT id FROM users WHERE id=' + id;
    con.getQuery(selectQuery,(user, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ valid: user.length == 0 });
            }
        }
    )

});


router.post('/login', (req, res) => {
    const { id, password } = req.body.user;
    if (validateID({ id }) && password && password.length > 4) {
        con.getQuery(`SELECT first_name FROM users WHERE id='${id}' AND password='${password}'`,
         (data, err) => {
            if (!err && data.length > 0) {
                con.getQuery(`SELECT * FROM admins WHERE id='${id}'`, (data, err) => {
                    res.cookie('tokenid', createToken({ id }), { maxAge: MAX_AGE });
                    if (!err && data.length > 0)
                        res.status(200).send({ success: true, toUrl: '/admin' });
                    else
                        res.status(200).send({ success: true, toUrl: '/home' });
                });
            } else {
                res.status(400).send({ success: false, message: ' Login Failes' });
            }
        });
    } else {
        res.status(400).send({ success: false, message: 'Invalid Data' });
    }
});

router.post('/register', (req, res) => {
    if (validateRegisterForm(req.body.user)) {
        
        const {id, first_name, last_name, phone, email, password, city_id, street, house_number} = req.body.user;
        con.addQuery('users',
            { id, first_name, last_name, phone, email, password,street, house_number},{city_id},           
            (data, err) => {
                if (!err && data.success) {
                    res.cookie('tokenid', createToken({ id, created: new Date() }), { maxAge: 86400 });
                    res.send({ success: true, toUrl: '/home' });
                } else {
                    res.status(500).send({ success: false, message: 'Register is Failed.' });
                }
            });
    } else {
        res.status(400).send({ success: false, message: 'Invalid Data' });
    }
});
router.get('/logout', (req, res, next) => {
    res.cookie('tokenid', '', { expires: new Date(1), path: '/' });
    res.send('logged out');

});

router.use((req, res, next) => {
    token_user.id = '';
    if (req.cookies.tokenid) {
        decodeToken(req.cookies.tokenid, (err, decoded) => {
            if (!err) {
                token_user.id = decoded.id;
                token_user.isAdmin = decoded.isAdmin;
                token_user.created = decoded.created;
                user_id = token_user.id;
                res.cookie('tokenid', req.cookies.tokenid, { maxAge: MAX_AGE });
            }
        });
    }
    next();
});

router.use(['/home', '/admin'], (req, res, next) => {
    if (!token_user.id) {
        res.redirect('/login');
        return;
    }
    next();
});

router.use('/welcome', (req, res, next) => {
    if (!token_user.id) {
        res.status(401).send('Please log in to our supermarket');
        return;
    }
    next();
});


router.get('/user', (req, res) => {
    con.getQuery(`SELECT * FROM users WHERE id="${user_id}"`, (users, err) => {
        if (err || !users.length) {
            res.status(500).send(err);
        } else {
            let user = users[0];
            delete user.password;
            user.isNew = token_user.created ? true : false;
            res.send(user);
        }
    });
});


function validateRegisterForm(user) {
    return (
        validateID(user) &&
        user.first_name &&
        user.last_name &&
        user.phone && user.phone.length >= 10 &&
        validateEmail(user) &&
        user.password && user.password.length >= 4 &&
        user.repeatPassword === user.password &&
        user.city_id &&
        user.street &&
        user.house_number
    );
}

function validateID({ id }) {
    if (id && id.length == 9) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            if (!isNaN(id.charAt(i))) {
                var template = id.charAt(i) * (i % 2 == 0 ? 1 : 2);
                sum += (Math.floor(template / 10) + template % 10);
            }
        }
        return (sum % 10 == 0);
    }
    return false;
}

function validateEmail({ email }) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

