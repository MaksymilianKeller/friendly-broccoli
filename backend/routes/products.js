const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// GET

router.get('/', async (req, res) => {
    const products = await Product.find({});

    try {
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)

    try {
        if (product == null) {
            res.status(404).send("Item not found.")
        }

        res.send(product)
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/name/:name', async (req, res) => {
    const product = await Product.find({
        name: req.params.name
    })

    try {
        if (product == null) {
            res.status(404).send("Item not found.")
        }

        res.send(product)
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/price/:price', async (req, res) => {
    const product = await Product.find({
        price: req.params.price
    })

    try {
        if (product == null) {
            res.status(404).send("Item not found.")
        }

        res.send(product)
    } catch (error) {
        res.status(500).send("Error: " + error);

    }
});

router.get('/quantity/:quantity', async (req, res) => {
    const product = await Product.find({
        quantity: req.params.quantity
    })

    try {
        if (product == null) {
            res.status(404).send("Item not found.")
        }

        res.send(product)
    } catch (error) {
        res.status(500).send("Error: " + error);

    }
});

router.get('/unitOfMeasure/:unitOfMeasure', async (req, res) => {
    const product = await Product.find({
        unitOfMeasure: req.params.unitOfMeasure
    })

    try {
        if (product == null) {
            res.status(404).send("Item not found.")
        }

        res.send(product)
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/report', async (req, res) => {
    const products = await Product.find({});
    const report = products.map((item) => {
        return {
            "Name": item.name,
            "Quantity": item.quantity,
            "TotalValue": item.quantity * item.price
        }
    })

    try {
        res.status(200).send(report);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

// POST

router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


// PUT

router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        const productToUpdate = await Product.findById(req.params.id);

        if (productToUpdate == null) {
            res.status(404).send("Item not found.")
        }

        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(body);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

// DELETE

router.delete('/:id', async (req, res) => {
    try {
        const productToDelete = await Product.findById(req.params.id);

        if (productToDelete == null) {
            res.status(404).send("Item not found.")
        }

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).send("Completed");
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


module.exports = router;
