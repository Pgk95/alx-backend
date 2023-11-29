const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 1245;

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

function getItemById(id) {
    return listProducts.find((product) => product.itemId === id);
}

async function reserveStockById(itemId, stock) {
    await setAsync(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const reservedStock = await getAsync(`item.${itemId}`);
    return reservedStock ? parseInt(reservedStock, 10) : 0;
}

app.use(express.json());

app.get('/list_products', (req, res) => {
    const productList = listProducts.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        price: item.price,
        initialAvailableQuantity: item.initialAvailableQuantity,
    }));
    res.json(productList);
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    const product = getItemById(itemId);

    if (!product) {
        return res.json({ status: 'Product not found' });
    }

    const currentQuantity = await getCurrentReservedStockById(itemId);
    const response = {
        itemId: product.itemId,
        itemName: product.itemName,
        price: product.price,
        initialAvailableQuantity: product.initialAvailableQuantity,
        currentQuantity: currentQuantity,
    };
    res.json(response);
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    const product = getItemById(itemId);

    if (!product) {
        return res.json({ status: 'Product not found' });
    }

    const currentQuantity = await getCurrentReservedStockById(itemId);
    if (currentQuantity  === 0) {
        return res.json({ status: 'Not enough stock available', itemId });
    }

    await reserveStockById(itemId, currentQuantity - 1);
    res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
});
