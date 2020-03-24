const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express(); //variavel constante que equivale ao sevidor

mongoose.connect('mongodb+srv://Vinicius:vncssnts321@cluster0-lgyco.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());  //configurando o express pra aceitar requisições do tipo JSON
app.use(routes);

// métodos HTTP: get, put, post, delete

//Tipos de parâmetros

//query params: request.query(paginação, filtros, ordenação, ...)
//Route params: request.params(Identificar um recurso na allteração ou remoção)
//body: request.body (Dados para a ciração ou alteração de um registro)


app.listen(8888) //definindo uma porta valida para o servidor

