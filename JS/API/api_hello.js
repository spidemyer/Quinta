const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

//Função para manipular requisições
const requestHandler = (req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    //Definir a lógica da rota
    if (req.url === '/hello' && req.method === 'GET'){
        res.end(JSON.stringify({message: 'Olá mundo!!'}));
    }else{
        res.statusCode = 404;
        res.end(JSON.stringify({error: 'Rota não encontrada'}));
    }
};

//criando o servidor
const server = http.createServer(requestHandler);

//iniciando o servidor
server.listen(port, hostname, ()=>{
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
});