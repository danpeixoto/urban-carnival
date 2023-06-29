const { ok, deepEqual } = require("assert");
const Database = require('./database');
const DEFAULT_ITEM_CADASTRADO = { nome: 'Flash', poder: 'speed', id: 1 };

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await Database.escreverArquivo([DEFAULT_ITEM_CADASTRADO]);
    });
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO;
        const [actual] = await Database.listar(expected.id);
        deepEqual(actual, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = { ...DEFAULT_ITEM_CADASTRADO, id: 2 };
        await Database.cadastrar(expected);
        const [actual] = await Database.listar(expected.id);
        deepEqual(actual, expected);
    });
});


// async function teste() {
//     await Database.escreverArquivo([DEFAULT_ITEM_CADASTRADO]);
//     const arquivo = await Database.obterDadosArquivo();
//     await Database.cadastrar(DEFAULT_ITEM_CADASTRADO);
// }

// teste();