const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// outra forma de obter dados do json
// const dadosJSON = require('./herois.json');

class Database {
    constructor() {
        this.nomeArquivo = 'herois.json';
    }
    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.nomeArquivo, "utf-8");
        return JSON.parse(arquivo.toString());
    }
    async escreverArquivo(data) {
        await writeFileAsync(this.nomeArquivo, JSON.stringify(data));
        return true;
    }
    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();
        dados.push(heroi);
        const resultado = await this.escreverArquivo(dados);
        return resultado;
    }
    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(dado => (id ? dado.id === id : true));
        return dadosFiltrados;
    }
    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex((h) => h.id === parseInt(id));

        if (indice === -1) {
            throw Error('O usuário informado não existe');
        }

        dados.splice(indice, 1);
        return await this.escreverArquivo(dados);
    }

    async atualizar(id, novoDado) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex((h) => +h.id === +id);

        if (indice === -1) {
            throw Error('O usuário informado não existe');
        }

        const atual = { ...dados[indice], poder: novoDado.poder, nome: novoDado.nome };
        dados.splice(indice, 1);

        return await this.escreverArquivo([...dados, atual]);
    }
}

module.exports = new Database();