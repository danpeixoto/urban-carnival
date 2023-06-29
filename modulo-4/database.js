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
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        dados.push({ ...heroi, id });
        const resultado = await this.escreverArquivo(dados);
        return resultado;
    }
    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(dado => (id ? dado.id === id : true));
        return dadosFiltrados;
    }
}

module.exports = new Database();