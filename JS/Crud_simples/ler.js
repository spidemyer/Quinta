const fs = require('fs');
const dados = fs.readFileSync("contatos.json", "utf-8");
console.log(dados);