const { ok, deepEqual } = require("assert");
const Database = require('./database');
const DEFAULT_ITEM_CADASTRADO = { nome: 'Flash', poder: 'speed', id: 1 };
const DEFAULT_ITEM_ATUALIZAR = { nome: 'Lanterna Verde', poder: 'Energia do anel', id: 2 };

describe('Suite de manipulação de Herois', () => {
    beforeEach(async () => {
        await Database.remover();
        await Database.cadastrar(DEFAULT_ITEM_CADASTRADO);
        await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO;
        const [actual] = await Database.listar(expected.id);
        deepEqual(actual, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = { ...DEFAULT_ITEM_CADASTRADO, id: 1 };
        await Database.cadastrar(expected);
        const [actual] = await Database.listar(expected.id);
        deepEqual(actual, expected);
    });

    it('deve remover o herói por id ', async () => {
        const expected = true;
        const result = await Database.remover(DEFAULT_ITEM_CADASTRADO.id);
        deepEqual(result, expected);
    });
    it('deve atualizar o herói pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Preparação'
        };

        await Database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, expected);
        const [result] = await Database.listar(expected.id);

        deepEqual(result, expected);
    });
});


// async function teste() {
//     await Database.escreverArquivo([DEFAULT_ITEM_CADASTRADO]);
//     const arquivo = await Database.obterDadosArquivo();
//     await Database.cadastrar(DEFAULT_ITEM_CADASTRADO);
// }

// teste();