const fs = require('fs');
const dados = fs.readFileSync("contatos.json", "utf-8");
const contatos = JSON.parse(dados)
console.log("Contatos:");
contatos.forEach((contato, index) => {
        console.log(`${index + 1}. ${contato.nome} - ${contato.telefone}`);
});