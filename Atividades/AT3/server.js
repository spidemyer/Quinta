const express = require('express'); //importa o express pra criar o servidor
const db = require('./db'); //importa a conexão com o banco de dados
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
}); //n sei explicar, pedi para a ia fazer essa parte ja que não aprendemos

app.use(express.json()); //ler o campo de requisição em json

app.use(express.static('public')); //servir arquivos estaticos da pasta public

app.get('/', (req, res) => { //rota raiz que vai servir o arquivo index.html
    res.sendFile(__dirname + '/public/index.html'); //envia o arquivo index.html como resposta
});

app.get('/usuarios', (req, res) => {
    res.json(db.listarUsuarios()); //responde com a lista de usuários em formato json
});

app.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;
    db.adicionarUsuario(novoUsuario);
    res.status(201).json({ mensagem: "Usuário criado!", usuario: novoUsuario });
}); //rota para criar um novo usuário, recebe os dados do usuário no corpo da requisição e adiciona ao banco de dados, respondendo com uma mensagem de sucesso e os dados do usuário criado

// Rotas para Tarefas
app.get('/tarefas', (req, res) => {
    res.json(db.listarTarefas());
});

app.post('/tarefas', (req, res) => {
    const { nome } = req.body;
    const tarefa = db.adicionarTarefa(nome);
    res.status(201).json(tarefa);
}); //rota para criar uma nova tarefa, recebe o nome da tarefa no corpo da requisição e adiciona ao banco de dados, respondendo com a tarefa criada

//Parte feita com ia pra me ajudar a fazer os erros e os status.
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefaExiste = db.listarTarefas().find(t => t.id === id); //verifica se a tarefa existe no banco de dados, procurando pelo id fornecido na rota

    if (!tarefaExiste) {
        return res.status(404).json({ erro: "Tarefa não encontrada!" });
    } //se a tarefa não existir, responde com um erro 404 e uma mensagem de erro

    db.deletarTarefa(id);
    res.status(200).json({ mensagem: "Tarefa removida com sucesso!" });
}); //rota para deletar uma tarefa, recebe o id da tarefa na rota, verifica se a tarefa existe e, se existir, deleta a tarefa do banco de dados, respondendo com uma mensagem de sucesso

app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const dadosAtualizados = req.body; //dados atualizados do usuário, recebidos no corpo da requisição
    
    db.atualizarUsuario(id, dadosAtualizados);
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
}); //rota para atualizar um usuário, recebe o id do usuário na rota e os dados atualizados no corpo da requisição, atualiza o usuário no banco de dados e responde com uma mensagem de sucesso

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); //faz o servidor rodar na porta indicada 