//importa um prompt sync

const prompt = require('prompt-sync')();

//Função principal 
function consultarCEP(){
    //1. solicita o cep 2. monta a url 3. faz a req(get) 4. retorna os dados.
    let cep = prompt("Digite seu CEP (somente numeros): ");
    cep =cep.trim();

const url = `https://viacep.com.br/ws/${cep}/json/`;
fetch(url)
.then((resposta) =>{
    //converte a resposta em JSON
    return resposta.json();
})
.then((dados)=>{
    //cep inválido?
    if(dados.erro){
        console.log("CEP não encontrado.");
        return;
    }
//exibe os dados do CEP:
console.log("Dados do CEP: ");
console.log("CEP: ", dados.cep);
console.log("Logradouro: ", dados.logradouro);
console.log("Bairro: ", dados.bairro);
console.log("Cidade: ", dados.localidade);
console.log("UF:: ", dados.uf);
})
.catch((erro)=>{
    console.log("Erro ao acessar a API: ");
    console.log(erro.message);
});
}
consultarCEP();