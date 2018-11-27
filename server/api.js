const express = require('express');

const { token_user } = require('./login');
const con = require('./config');

const router = express.Router();

let user_id;

module.exports = router;

router.use((req, res, next) => {
    user_id = token_user.id;
    next();
});


// *************************
//  API Products/ Categries
// *************************


router.get('/categories', (req, res) => {
    con.getQuery(`SELECT * FROM categories ORDER BY category_id`, (category, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(category);
        }
    });
});
router.get('/products', (req, res) => {
    con.getQuery(`SELECT product_id, product_name, price, image FROM products`,
        (products, err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(products);
            }
        }
    )
});

router.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    con.getQuery('SELECT * FROM `products` INNER JOIN `categoriestoproducts` ON `product_id`=`product` WHERE `category`=' + category,
        (product, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(product);
            }
        }
    )
});


router.get('/products/search/:text', (req, res) => {
    var text = req.params.text;
    con.getQuery(`SELECT DISTINCT p.product_id, p.product_name, p.image, p.price
         FROM products p INNER JOIN categoriestoproducts cp ` +
        ' ON `product_id`=`product` INNER JOIN categories c ON c.category_id = cp.category ' +
        `WHERE p.product_name LIKE '%${text}%' OR
        c.category_name LIKE '%${text}%'`,
        (product, err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(product);
            }
        }
    )
});


router.post('/insertProduct', (req, res) => {
    const { product, categories } = req.body;
    const { image, product_id, product_name, price } = product;
    con.addQuery('products',
        { image, product_id, product_name },
        { price },
        (data, err) => {
            if (!err && data.success) {
                for (let category in categories) {
                    if (categories[category] == true) {
                        con.addQuery('categoriesToProducts', { product: product_id }, { category: category }, dt => console.log(dt));
                    }
                }
                res.send({ success: true });
            } else {
                console.log(err);
                res.status(500).send({ success: false, message: 'Insert new product Failed.' });
            }
        });
});


router.put('/editProduct/:product_id', (req, res) => {
    const { product, categories } = req.body;
    const { product_id, product_name, price, image } = product;
    editQuery = `UPDATE products SET product_id="${product_id}", product_name="${product_name}", price="${price}", image="${image}" WHERE product_id="${req.params.product_id}";`;
    con.getQuery(editQuery, (result, err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ success: false, message: 'Update product Failed.' });
        } else {
            con.getQuery(`DELETE FROM categoriestoproducts WHERE product="${req.params.product_id}";`, d => { });
            for (let category in categories) {
                if (categories[category] == true) {
                    con.addQuery('categoriesToProducts', { product: product_id }, { category: category }, dt => console.log(dt));
                }
            }
            res.send({ success: true, message: 'Edited  product success' });
        }
    }
    )
});

router.get('/product/:product_id', (req, res) => {
    con.getQuery(`SELECT * FROM products WHERE product_id="${req.params.product_id}"`,
        (product, err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                con.getQuery(`SELECT * FROM categoriesToProducts WHERE product="${req.params.product_id}"`, (categories, err2) => {
                    if (err2) {
                        res.status(500).send(err2);
                    } else {
                        res.send({ product: product[0], categories });
                    }
                });
            }
        }
    )
});
router.delete('/deleteProductCart/:product_id', (req, res) => {
    deleteQuery = `DELETE FROM carts WHERE product_id='${req.params.product_id}' AND user_id='${user_id}'`;
    con.getQuery(deleteQuery, (result, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getCart(res);
        }
    }
    );
});



// *************
//  API Cart
// *************

function getCart(res) {
    var getQueryCart = "SELECT `image`, `product_name`, `quantity`, `price`, p.`product_id`," +
        "`quantity` * `price` AS `total`" +
        " FROM `carts` c INNER JOIN `products` p ON " +
        "  p.`product_id` = c.`product_id` " +
        "WHERE c.`user_id` = '" + user_id + "'";
    con.getQuery(getQueryCart, (cart, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(cart);
        }
    }
    );
}
router.get('/cart', (req, res) => {
    getCart(res);
});

router.delete('/deleteCart:/product_id', (req, res) => {
    deleteQuery = `DELETE FROM carts WHERE user_id='${user_id}'`;
    con.getQuery(deleteQuery, (result, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getCart(res);
        }
    }
    );
});
router.delete('/cart', (req, res) => {
    emptyCart(() => getCart(res),
        err => res.status(500).send(err)
    );
});

function emptyCart(successCallback, errorCallback) {
    deleteQuery = `DELETE FROM carts WHERE user_id='${user_id}'`;
    con.getQuery(deleteQuery, (data, err) => {
        if (err && typeof errorCallback == "function") {
            errorCallback(err);
        } else if (!err && typeof successCallback == "function") {
            successCallback(data);
        }
    }
    );
}

function editCart(res, { product_id, quantity }) {
    var editQuery = `UPDATE carts SET quantity=${quantity} WHERE product_id='${product_id}' AND user_id = '${user_id}'`;
    con.getQuery(editQuery, (result, err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            getCart(res);
        }
    }
    );
}
router.put('/setCart', (req, res) => {
    editCart(res, req.body);
});


router.post('/insertCartProduct', (req, res) => {
    const { product_id, quantity } = req.body;
    con.addQuery('carts', { user_id: user_id, product_id: product_id }, { quantity },
        (data, err) => {
            if (!err && data.success) {
                getCart(res);
            } else {
                editCart(res, { product_id, quantity: 'Quantity: + ' + quantity });
            }
        });

});

// *************
//  API orders
// *************

router.get('/deliveryDate', (req, res) => {
    const deliveryDate = `SELECT DATE_FORMAT(delivery_date, '%Y-%m-%d') delivery_date 
        FROM orders WHERE delivery_date >= CURDATE() 
        GROUP BY delivery_date 
        HAVING COUNT(delivery_date) > 2`;
    con.getQuery(deliveryDate, (data, err) => {
        if (err) {
            res.status(500).send("Error");
        } else {
            res.send(data);
        }
    }
    );
})

router.post('/createOrder', (req, res) => {
    makeOrder({ ...req.body, user_id: user_id },
         order_id => {
        if (order_id > 0) {
            cartOrder(order_id, () => getLastOrder(res),
                err => res.status(500).send(err));
        } else {
            res.status(500).send("Create new order is failed");
        }
    }
    );
});

function makeOrder({ user_id, delivery_street, delivery_date, order_date, credit_card_info, city_code }, callback) {
    con.addQuery('orders', { user_id, delivery_street, delivery_date, order_date, credit_card_info }, { city_code },
        (data, err) => {
            if (!err && data.success) {
                callback(data.insertedId);
                return;
            }
            callback(-1);
        });
}

function cartOrder(order_id, successCallback, errorCallback) {
    const addQuery = `INSERT INTO orders_products (order_id, product_id, quantity)
        SELECT ${order_id}, product_id, quantity FROM carts WHERE user_id=${user_id}`;
    con.getQuery(addQuery, (data, err) => {
        if (err && typeof errorCallback == "function") {
            errorCallback(err);
        } else if (!err) { emptyCart(successCallback, errorCallback); }
    }
    );
}

router.get("/lastOrder", (req, res) => {
    getLastOrder(res);
});


function getLastOrder(res) {
    const selectOrder = `SELECT id, user_id, city_code, delivery_street,
    DATE_FORMAT(delivery_date, '%Y-%m-%d') delivery_date,
    DATE_FORMAT(order_date, '%Y-%m-%d') order_date,
    credit_card_info,
    cities.name cityName FROM orders LEFT JOIN cities
    ON orders.city_code = cities.value
    WHERE user_id=${user_id} ORDER BY orders.id DESC LIMIT 1`
    con.getQuery(selectOrder, (order, err) => {
        if (err || !order.length) {
            res.send({ order: {}, data: [] });
        } else {
            order = order[0];
            const getCartQuery = "SELECT op.product_id, quantity, `product_name`, `price`, p.`product_id` , `quantity` * `price` AS `total`" +
                " FROM orders_products op " +
                "INNER JOIN `products` p ON p.`product_id` = op.`product_id` " +
                "WHERE op.order_id = " + order.id;
            con.getQuery(getCartQuery, (data, err) => {
                if (err || !data.length) {
                    res.status(500).send({ order: {}, data: [] });
                } else {
                    res.send({ order, data });
                }
            }
            );
        }
    }
    );
}







