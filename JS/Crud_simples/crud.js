const fs = require("fs");
const prompt = require("prompt-sync")();

function menu() {
    console.log("\nMenu de Contatos: ");
    console.log("1. Adicionar Contato");
    console.log("2. Listar Contatos");
    console.log("3. Atualizar Contato");
    console.log("4. Excluir Contato");
    console.log("5. Sair");
}

function main() {
    let opcao;
    do {
        menu();
        opcao = prompt("Escolha uma opção: ");
        switch (opcao) {
            case "1":
                adicionar();
                break;
            case "2":
                listar();
                break;
            case "3":
                atualizar();
                break;
            case "4":
                excluir();
                break;
            case "5":
                console.log("Saindo...");
        }
    } while (opcao !== "5");
}

function lerDados() {
    const dados = fs.readFileSync("contatos.json", "utf-8");
    return JSON.parse(dados || "[]");
}

function adicionar() {
    const nome = prompt("Digite o nome do contato:");
    const telefone = prompt("Digite o telefone do contato:");
    const contatos = lerDados();
    contatos.push({ nome, telefone });
    salvarDados(contatos);
    console.log("Contato adicionado com sucesso!");
}

function listar() {
    const contatos = lerDados();
    console.log("\nContatos:");
    contatos.forEach((contato, index) => {
        console.log(`${index + 1}. ${contato.nome} - ${contato.telefone}`);
    })
}

function atulizar() {
    const indexAtualizar = parseInt(prompt("Digite o ID do contato a ser atualizdo ")) -1;
    
    const contatos = lerDados();
    if(indexAtualizar >= 0 && indexAtualizar < contatos.length) {
        const novoNome = prompt("Digite o novo nome do contato:");
        const novoTelefone = prompt("Digite o novo telefone do contato:");

        contatos[indexAtualizar] = { nome: novoNome, telefone: novoTelefone };
        salvarDados(contatos);
        console.log("Contato atualizado com sucesso!");
    } else{console.log("Indice inválido!")};
}

function excluir() {
    const indexExcluir = parseInt(prompt("Digite o ID do contato a ser excluido ")) -1;
    
    const contatos = lerDados();
    if(indexExcluir >= 0 && indexExcluir < contatos.length) {
        contatos.splice(indexExcluir, 1);
        salvarDados(contatos);
        console.log("Contato excluido com sucesso!");
    }
}

function salvarDados(contatos) {
    fs.writeFileSync("contatos.json", JSON.stringify(contatos, null, 2));
}

main();