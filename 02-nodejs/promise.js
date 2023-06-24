/*
    0. obter um usuário
    1. preciso obter o numero de telefone de um usuário a partir de seu id
    2. obter o endereço do usuário pelo id
*/
/*
 importamos um módulo interno do node.js
 */

const util = require('node:util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'aladin',
                dataNascimento: new Date(),
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            return res({
                telefone: '19213019123',
                ddd: 66,
            });
        }, 1000);
    });
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'rua dos bobos',
            numero: 0,
        });
    }, 1000);
}
// function obterEndereco(idUsuario) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             return res({
//                 rua: 'mario quatrin',
//                 numero: 4061,
//             });
//         }, 1000);
//     });
// }

// const usuario = obterUsuario(function resolverUsuario(erro, usuario) {
//     if (erro) throw new Error('erro ao buscar usuário');
//     const r = obterTelefone(
//         usuario.id,
//         function resolverTelefone(erro, telefone) {
//             if (erro) throw new Error('erro ao buscar telefone');
//             const b = obterEndereco(
//                 usuario.id,
//                 function resolverEndereco(erro, endereco) {
//                     if (erro) throw new Error('erro ao buscar enderoco');
//                     console.log({ usuario, telefone, endereco });
//                 }
//             );
//             console.log({ b, r });
//         }
//     );
// });

const userPromise = obterUsuario();

userPromise
    .then((usuario) => {
        return obterTelefone(usuario.id).then(function resolverTelefone(
            result
        ) {
            return { usuario, telefone: result };
        });
    })
    .then(function resolverPromise(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result,
            };
        });
    })
    .then((resultadoFinal) => console.log(resultadoFinal));
