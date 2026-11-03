const express = require('express');
const router = express.Router();
const produtoController = require("../controller/ProdutoController.js");

router.post('/produtos', (req, res) => {
    return produtoController.create(req, res);
});

router.delete("/produtos/:id", (req, res) => {
    return produtoController.delete(req, res);
});

router.get("/produtos/:id", (req, res) => {
    return produtoController.findById(req, res);
});

router.put("/produtos/:id", (req, res) => {
    return produtoController.update(req, res);
});

router.get("/produtos", (req, res) => {
    return produtoController.findAll(req, res);
});

module.exports = router;