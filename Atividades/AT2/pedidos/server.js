const express = require('express'); // importei o express pra criar o servidor
const app = express();
const port = 3000; //porta do servidor de pedidos

app.use(express.json());

app.post('/pedidos', (req, res) => { //pra conseguir criar um pedido
    const pedido = req.body; //corpo da requisição, onde ta os dados do pedido
    console.log('Pedido recebido:', pedido); //mostra no console o pedido recebido
    res.status(201).json({ message: 'Pedido criado com sucesso!' }); //responde pro cliente que foi criado com sucesso
});

app.listen(port, () => { //faz o servidor receber na porta definida (3000)
    console.log(`Pedidos rodando em http://localhost:${port}`); //mostra a mensagem de que o servidor ta rodando e onde ele ta
});