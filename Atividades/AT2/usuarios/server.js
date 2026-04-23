const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    console.log('Usuário recebido:', usuario);
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
}
);

app.listen(port, () => {
    console.log(`Usuários rodando em http://localhost:${port}`);
});