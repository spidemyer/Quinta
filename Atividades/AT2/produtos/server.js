const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/produtos', (req, res) => {
    const produto = req.body;
    console.log('Produto recebido:', produto);
    res.status(201).json({ message: 'Produto criado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Pedidos rodando em http://localhost:${port}`);
});