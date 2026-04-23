// express para criação de APIs
import express, { json } from 'express';
//FS para leitura e escrita de arquivos
import { readFileSync, writeFileSync } from 'fs';
//cria a aplicação express
const app = express();
//define a porta do servidor
const PORT = 3000;
//permite o servidor entender JSON enviado no body
//req.body fica undefined
app.use(json());
//chama o arquivo json (BD)
const ARQUIVO =  "./contatos.json";

//ler dados 
function lerDados(){
    //lê conteúdo do arquivo
    const dados = readFileSync(ARQUIVO, "utf-8");
    //converto JSON em objeto JS
    return JSON.parse(dados);// parse transforma json em array
}

 function salvarDados(dados){
    // tranforma string em json
    // null, 2 é a identação de 2 espaços
    writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
}

//rota para  buscar contatos
app.get("/contatos/:grupo", (req, res)=> { // onde :grupo é o parâmetro que vamos receber na url
    const grupo = req.params.grupo; // faz a requisição dos parâmetros (grupo)
    const dados = lerDados();
    // validar se o grupo existe
    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    res.json(dados[grupo]);
});

//rota para adicionar contatos
app.post("/contatos/:grupo", (req, res)=>{
    const grupo = req.params.grupo;
    const{nome , telefone}= req.body;
    const dados = lerDados();

    //validar se o grupo existe
    if (!dados[grupo]){
        return res.status(404).json({ erro: "Grupo não encontrado"});
    }
    if (!nome || !telefone){
        return res.status(404).json({erro: "Nome e teefone são obrigatórios"});
    }

    //adiciona o novo contato
    dados[grupo].push({nome, telefone});

    //salva no JSON
    salvarDados(dados);

    res.status(201).json({
        mensagem: "Contato adicionado com sucesso.",
        contato: {nome, telefone}
    });
});

//rota para atualizar um contato (PUT)
app.put("/contatos/:grupo/:index", (req, res)=>{
    const grupo = req.params.grupo;
    const index = parseInt(req.params.index);
    const {nome, telefone} = req.body;

    const dados =lerDados();

    // validar se o grupo existe
    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }
    //verifica se o index existe
        if (index < 0 || index >= dados[grupo].length){
            return res.status(404).json({erro: "Contato não encontrado"});
        }

        //atualizar o contato
        dados [grupo][index] = {nome, telefone};
        salvarDados(dados);
        // retorna a confimação para o usuário
        res.json({
            mensagem: "Contato atualizado com sucesso",
            contato: dados[grupo][index]
        });
});

//rota para excluir um contato (DELETE)
app.delete("/contatos/:grupo/:index", (req, res)=>{
    const grupo = req.params.grupo;
    const index = parseInt(req.params.index);

    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    //verifica se o index existe
    if (index < 0 || index >= dados[grupo].length){
        return res.status(404).json({erro: "Contato não encontrado"});
}
    //remove o contato da variável dados
    const removido = dados[grupo].splice(index, 1);
    salvarDados(dados);

    res.json({
        mensagem: "Contato excluído com sucesso.",
        contatp: removido[0]
    });
});

app.listen(PORT, ()=>{
    console.log(`API rodando em http://localhost:${PORT}`);
});