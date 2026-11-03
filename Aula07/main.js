const express = require('express');
const cors = require('cors')
const jwt = require("jsonwebtoken")
const app = express();
const port = 3000;

const sequelize = require('./models/Bd.js').sequelize;
const {User} = require('./models/User.js');

const userController = require("./controller/UserController.js")
const clienteController = require("./controller/ClienteController.js")
const produtoController = require("./controller/ProdutoController.js")
const SECRET ="MALHADAO"

app.use(express.json());
app.options(/.*/, cors());
app.use(express.urlencoded({ extended: true }));

function verificaToken(req, res, next){

    const header = req.headers.authorization;
    
    if (!header){
        res.status(401).json({ms:"nao tem token"})
    } 

    const parte = header.split(' ');

    if (parte.length != 2 || parte[0]!=='Bearer'){
        res.status(401).json({ms:"formato invalio do token"})
    }

    const token = parte[1];
    console.log(token);
    try {
        const dados = jwt.verify(token, SECRET);
        req.usuario  = dados;
        next()
    }catch(e){
        console.log(e)
        res.status(401).json({ms:"Token invalido ou expirado"})
    }

}

app.get('/', verificaToken, (req, res) => {
    res.send('Hello World!');
});

app.post('/', verificaToken,  (req, res) => {

    const ab = {
        msg: 'Hello World!',
        status: 404
    };

    return res.status(200).json(ab);
});


app.post('/salvar', (req, res) => {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'Body is required' });
    }

    const { nome, email, peso, altura} = req.body;
    
    let imc = peso / (altura * altura);

    
    let filedsNOTVALID = [];
    for (const field of ['nome', 'email', 'peso', 'altura']) {
        if (!req.body[field]) {
            filedsNOTVALID.push(field);
        }
    }

    if (filedsNOTVALID.length > 0) {
        return res.status(400).json({ error: `Fields not valid: ${filedsNOTVALID.join(', ')}` });
    }

    const ab = {
        msg: `O Imc do ${nome} (${email}) é ${imc.toFixed(2)}`,
        status: 200
    };
    
    return res.status(200).json(ab);
   }
);

app.post("/api/v1/users/login",(req,res)=>{
  console.log("vai logar")
  return userController.login(req,res);
}) 

app.post("/api/v1/users/first",(req,res)=>{
  console.log("vai logar")
  return userController.create(req,res);
}) 

app.use("/api/v1", verificaToken, require("./router/UserRouter.js"));
app.use("/api/v1", verificaToken, require("./router/ClientRouter.js"));
app.use("/api/v1", verificaToken, require("./router/ProdutoRouter.js"));


app.listen(port, () => {
    sequelize.authenticate().then(
        sequelize.sync().then(
             console.log("synconizou")).catch((e)=>{
            console.log(e)
        })
    ).catch( (e)=>{
        console.log("erro ao conectar", e)
    })
    console.log(`Server is running on http://localhost:${port}`);
});