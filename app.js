const express = require('express');
const fs = require('fs');

const app = express();
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/products-simple.json`)
);

app.use(express.json());

app.get('/api/products', getAllProducts);
app.post('/api/products', createProduct);
/* app.get('/api/products/:id', getProduct);
app.patch('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.get('/api/users', getAllUsers);
app.post('/api/users', createUser);
app.get('/api/users/:id', getUser);
app.patch('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);
 */
function getAllProducts(req, res) {
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products: products
        }
    })
}

function createProduct(req, res) {
    const newId = products[products.length - 1].id + 1;
    const newProduct = Object.assign({id: newId}, req.body);

    products.push(newProduct);

    fs.writeFile(
        `${__dirname}/dev-data/data/products-simple.json`,
        JSON.stringify(products),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    product: newProduct
                }
            });
        }
    );
}

app.listen(2345);