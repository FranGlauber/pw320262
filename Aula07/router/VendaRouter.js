const express = require('express');
const router = express.Router();
const vendaController = require("../controller/VendaController.js");

router.post('/vendas', (req, res) => {
    return vendaController.create(req, res);
});

router.delete("/vendas/:id", (req, res) => {
    return vendaController.delete(req, res);
});

router.get("/vendas/:id", (req, res) => {
    return vendaController.findById(req, res);
});

router.put("/vendas/:id", (req, res) => {
    return vendaController.update(req, res);
});

router.get("/vendas", (req, res) => {
    return vendaController.findAll(req, res);
});

module.exports = router;