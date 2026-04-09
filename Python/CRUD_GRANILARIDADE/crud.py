import json

#Menu principal

def menu():
    print("\n === MENU DE CONTATOS ===")
    print("1. Adicionar")
    print("2. Listar")
    print("3. Atualizar")
    print("4. Deletar")
    print("5. Sair")

#Função para escolher grupo

def escolher_grupo():
    #Pergunta ao usuário o grupo que deseja retornar
    print("\n Tipo de contato:")
    print("1. Aluno")
    print("2. Professor")

    opcao = input("Escolha: ")

    if opcao == "1":
        return "alunos"
    
    elif opcao == "2":
        return "professores"
    
    else:
        print("opção inválida!")
        return None
    
#função para ler o json
def ler_dados():
    with open("contatos.json", "r", encoding="utf-8") as arquivo:
        return json.load(arquivo)
    
#função salvar dados
def salvar_dados(dados):
    with open("contatos.json", "w", encoding="utf-8") as arquivo:
        json.dump(dados, arquivo, indent=4, ensure_ascii=False)

#Adicionar dados
def adicionar():
    grupo = escolher_grupo()

    if not grupo:
        return
    
    nome = input("Nome: ")
    telefone = input("Telefone: ")

    dados = ler_dados()

    dados[grupo].append({
        "nome": nome,
        "telefone": telefone
    })

    salvar_dados (dados)
    print("Contato adicionado com sucesso!")

#função listar contatos
def listar():
    grupo = escolher_grupo()

    if not grupo:
        return

    dados = ler_dados()
    print(f"\n Lista de {grupo.upper()}:")

    for index, contato in enumerate(dados[grupo], start=1):
        print(f"{index}. {contato['nome']} - {contato['telefone']}")

#atualizar
def atualizar():
    grupo = escolher_grupo()

    if not grupo:
        return
    
    dados = ler_dados()

    index = int(input("Index do contato: ")) -1

    if 0 <= index < len(dados[grupo]):
        nome = input("Novo nome: ")
        telefone = input("Novo telefone: ")

        dados[grupo][index] = {
            "nome": nome,
            "telefone": telefone
        }

        salvar_dados(dados)
        print("Contato atualizado com sucesso!")
    else:
        print("Indice inválido!")

#Função para excluir
def excluir():
    grupo = escolher_grupo()
    if not grupo:
        return
    
    dados = ler_dados()

    index = int(input("index do contato: ")) -1

    #verificar se o index é válido
    if 0 <= index < len(dados[grupo]):
        #remove o elemento da matriz
        dados[grupo].pop(index)

        salvar_dados(dados)
        print("Contato excluido com sucesso!")

    else:
        print("Opção inválida!")

#menu principal
def main():
    while True:
        menu()
        opcao = input("Escolha uma opção: ")
        if opcao == "1":
            adicionar()

        elif opcao == "2":
            listar()

        elif opcao == "3":
            atualizar()

        elif opcao == "4":
            excluir()

        elif opcao == "5":
            print("Saindo...")
            break

        else:
            print("Opção inválida!")

#executar o programa
main()