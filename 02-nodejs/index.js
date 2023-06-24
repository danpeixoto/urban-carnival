/*
    0. obter um usuário
    1. preciso obter o numero de telefone de um usuário a partir de seu id
    2. obter o endereço do usuário pelo id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'aladin',
            dataNascimento: new Date(),
        });
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '19213019123',
            ddd: 66,
        });
    }, 1000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'mario quatrin',
            numero: 4061,
        });
    }, 1000);
}

const usuario = obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) throw new Error('erro ao buscar usuário');
    const r = obterTelefone(
        usuario.id,
        function resolverTelefone(erro, telefone) {
            if (erro) throw new Error('erro ao buscar telefone');
            const b = obterEndereco(
                usuario.id,
                function resolverEndereco(erro, endereco) {
                    if (erro) throw new Error('erro ao buscar enderoco');
                    console.log({ usuario, telefone, endereco });
                }
            );
            console.log({ b, r });
        }
    );
});

// const telefone = obterTelefone(usuario.id);
// const endereco = obterEndereco(usuario.id);

// console.log({ usuario, telefone, endereco });
