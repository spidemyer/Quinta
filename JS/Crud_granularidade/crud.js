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

function escolherGrupo() {
    console.log("\n Tipos de Contatos: ");
    console.log("1. Aluno");
    console.log("2. Professor");

    const opcao = prompt("Escolha: ");

    if (opcao === "1") return "alunos";
    if (opcao === "2") return "professores";

    console.log("Opção inválida, retornando ao menu principal.");
    return null;
}

function lerDados() {
    const dados = fs.readFileSync("contatos.json", "utf-8");
    return JSON.parse(dados);
}

function salvarDados(dados) {
    fs.writeFileSync("contatos.json", JSON.stringify(dados, null, 2));
}

function adicionar() {
    const grupo = escolherGrupo();
    if (!grupo) return;

    const nome = prompt("Nome:");
    const telefone = prompt("Telefone:");

    const dados = lerDados();
    dados[grupo].push({ nome, telefone });

    salvarDados(dados);
    console.log("Contato adicionado com sucesso!");
}

function listar() {
    const grupo = escolherGrupo();
    if (!grupo) return;

    const dados = lerDados();

    console.log(`\n$Lista de ${grupo.toUpperCase()}:`);
    dados[grupo].forEach((contato, index) => {
        console.log(`${index + 1}. ${contato.nome} - ${contato.telefone}`);
    });
}

function atualizar() {
    const grupo = escolherGrupo();
    if (!grupo) return;

    const dados = lerDados();

    const index = parseInt(prompt("Index do contato:: ")) - 1;

    if (index >= 0 && index < dados[grupo].length){
        const nome = prompt("Novo nome:");
        const telefone = prompt("Novo telefone:");

        dados[grupo][index] = { nome, telefone };
        salvarDados(dados);

        console.log("Contato atualizado com sucesso!");
    } else {
        console.log("Índice inválido!");
    }
}

function excluir() {
    const grupo = escolherGrupo();
    if (!grupo) return;

    const dados = lerDados();
    const index = parseInt(prompt("Index do contato: ")) - 1;

    if (index >= 0 && index < dados[grupo].length) {
        dados[grupo].splice(index, 1);
        salvarDados(dados);

        console.log("Contato excluído com sucesso!");
    } else {
        console.log("Índice inválido!");
    }   
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
                break;
            default:
                console.log("Opção inválida!");
        }
    } while (opcao !== "5");
}

main();

        

