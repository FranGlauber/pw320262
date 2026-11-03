const Produto = require("../models/Produto");

exports.findAll = async (req, res) => {

    let page = 1;
    let limit = 5;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    const offset = (page - 1) * limit;

    Produto.findAndCountAll({ limit, offset }).then(({ count, rows }) => {
        return res.status(200).json({
            produtos: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        });
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
}

exports.findById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    Produto.findByPk(id).then((produto) => {
        if (!produto) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        } else {
            return res.status(200).json(produto);
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    Produto.findByPk(id).then((produto) => {
        if (!produto) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        } else {
            Produto.destroy({
                where: { id }
            }).then(() => {
                return res.status(200).json({ msg: "Produto deletado com sucesso" });
            }).catch((e) => {
                const ret = {
                    msg: "Erro no banco de dados",
                    exp: e,
                };
                return res.status(500).json(ret);
            });
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
}

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, descricao, precoCompra, precoVenda } = req.body;

    let filedsNOTVALID = [];
    for (const field of ['nome', 'precoCompra', 'precoVenda']) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    const lucro = parseFloat(precoVenda) - parseFloat(precoCompra);

    let ab = {
        msg: `Operação realizada com sucesso`,
        status: 200
    };

    Produto.create({
        nome,
        descricao,
        precoCompra,
        precoVenda,
        lucro
    }).then(() => {
        return res.status(201).json(ab);
    }).catch((e) => {
        ab.msg = e;
        return res.status(500).json(ab);
    });
}

exports.update = async (req, res) => {
    const { id } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, descricao, precoCompra, precoVenda } = req.body;

    let filedsNOTVALID = [];
    for (const field of ['nome', 'precoCompra', 'precoVenda']) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    const lucro = parseFloat(precoVenda) - parseFloat(precoCompra);

    Produto.findByPk(id).then((produto) => {
        if (!produto) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        } else {
            produto.nome = nome;
            produto.descricao = descricao;
            produto.precoCompra = precoCompra;
            produto.precoVenda = precoVenda;
            produto.lucro = lucro;

            produto.save().then(() => {
                return res.status(200).json({ msg: "Produto atualizado com sucesso" });
            }).catch((e) => {
                return res.status(500).json(produto);
            });
        }
    }).catch((e) => {
        const ret = {
            msg: "Erro no banco de dados",
            exp: e,
        };
        return res.status(500).json(ret);
    });
}