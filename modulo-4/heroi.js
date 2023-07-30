class Heroi {
    constructor({ nome, poder, id }) {
        this.nome = nome;
        this.poder = poder;
        this.id = id || Date.now().toString();
    }
}

module.exports = Heroi;