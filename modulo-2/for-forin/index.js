const service = require("./service");

async function main() {
    try {
        const result = await service.obterPessoas('a');
        const names = [];
        console.time("for");
        for (let i = 0; i < result.results.length; i++) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd("for");

        const namesForIn = [];
        console.time("forIn");
        for (let i in result.results) {
            const pessoa = result.results[i];
            namesForIn.push(pessoa.name);
        }
        console.timeEnd('forIn');

        const namesForOf = [];
        console.time("forOf");
        for (let pessoa of result.results) {
            namesForOf.push(pessoa.name);
        }
        console.timeEnd('forOf');

        console.log({ names, namesForIn, namesForOf });
    } catch (error) {
        console.error("Erro interno", { error });
    }
}

main();