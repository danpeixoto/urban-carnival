const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    const program = new Commander.Command();
    program.version('v1')
        .option('-n, --nome [value]', 'Nome do heroi')
        .option('-p, --poder [value]', 'Poder do heroi')
        .option('-i, --id [value]', 'Id do heroi')
        .option('-d, --deletar', 'Deletar um heroi por id, ou toda base caso não tenha um id')
        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-a, --atualizar [value]', 'Atualizar um heroi pelo id')
        .option('-l, --listar', 'Lista todos os heróis');

    program.parse(process.argv);
    const options = program.opts();
    const heroi = new Heroi({ ...options, id: options.id || options.atualizar });
    try {
        if (options.cadastrar) {
            await Database.cadastrar(heroi);
        }
        if (options.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }
        if (options.deletar) {
            await Database.remover(options.id);
        }
        if (options.atualizar) {
            await Database.atualizar(options.atualizar, heroi);
        }

    } catch (error) {
        console.error('Deu ruim', { error });
    }
}

main();