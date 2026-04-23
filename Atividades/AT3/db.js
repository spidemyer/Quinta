usuarios = []
listarUsuarios = () => {
    return usuarios
}
adicionarUsuario = (usuario) => {
    usuarios.push(usuario)
}
deletarUsuario = (id) => {
    usuarios = usuarios.filter(usuario => usuario.id !== id)
}
atualizarUsuario = (id, usuarioAtualizado) => {
    usuarios = usuarios.map(usuario => {
        if (usuario.id === id) {
            return { ...usuario, ...usuarioAtualizado }
        }
        return usuario
    })
}
let tarefas = []

const listarTarefas = () => tarefas;

const adicionarTarefa = (nome) => {
    const novaTarefa = { id: tarefas.length + 1, nome };
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const deletarTarefa = (id) => {
    tarefas = tarefas.filter(t => t.id !== id);
};

module.exports = {
    listarUsuarios,
    adicionarUsuario,
    deletarUsuario,
    atualizarUsuario,
    listarTarefas,
    adicionarTarefa,
    deletarTarefa
}