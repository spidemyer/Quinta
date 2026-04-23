const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/pedidos', (req, res) => {
    const pedido = req.body;
    console.log('Pedido recebido:', pedido);
    res.status(201).json({ message: 'Pedido criado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Pedidos rodando em http://localhost:${port}`);
});