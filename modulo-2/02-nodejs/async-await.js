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


// 1o passo adicionar a palavra async -> automaticamente ela retornará uma promise
async function main() {
    try {
        console.time("main");
        const usuario = await obterUsuario();
        const telefone = await obterTelefone(usuario.id);
        const endereco = await obterEnderecoAsync(usuario.id);
        console.log({ endereco, usuario, telefone });
        console.timeEnd("main");
    } catch (error) {
        console.error({ error });
    }
}

async function main2() {
    try {
        console.time("main2");
        const usuario = await obterUsuario();
        const results = await Promise.all([obterEnderecoAsync(usuario.id), obterTelefone(usuario.id)]);
        console.log("main2", { usuario, endereco: results[0], telefone: results[1] });
        console.timeEnd("main2");
    } catch (error) {
        console.error({ error });
    }
}
main();
main2();