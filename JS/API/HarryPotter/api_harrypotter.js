// Definir a URL da API
const url = 'https://hp-api.onrender.com/api/characters';

// criar uma função para buscar os dados da api
async function buscarPersonagens() {
    try {
        console.log("Buscando dados da API... Aguarde um instante.");

        // espera a resposta da API antes de continuar
        const resposta = await fetch(url);
        
        // converter em json
        const dados = await resposta.json();

        console.log("Personagens de Harry Potter encontrados: \n");

        // lista de personagens
        dados.forEach((personagem) => {
            // so vai mostrar se o personagem estiver em uma casa pra n ter nada vazio
            if (personagem.house) {
                console.log(`Nome: ${personagem.name}`);
                console.log(`Casa: ${personagem.house}`);
                console.log(`Ator: ${personagem.actor}`);
                console.log(`Imagem: ${personagem.image}`);
                console.log("-".repeat(30));  // separa os personagens com as linhas (30 linhas)
            }
        });

        console.log(`\nTotal de personagens listados: ${dados.length}`); //total de personagens

    } catch (erro) {
        // se der erro aparece a mensagem 
        console.error("Erro ao acessar a API:", erro.message);
    }
}

//executa a função
buscarPersonagens();