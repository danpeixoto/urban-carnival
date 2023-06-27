const service = require('./service')

Array.prototype.meuFilter = function (callback) {
    const novoArray = []
    for (let idx = 0; idx < this.length;idx++){ 
        if(callback(this[idx],idx))
            novoArray.push(this[idx]);
    }
    return novoArray
}

async function main() {
    try {
       const result = await service.obterPessoas('a') 
       console.log(result.results.filter(p=>p.name.length < 8))
        console.log(result.results.meuFilter((p, idx) => {
           return p.name.length <=9
       }))
    } catch (error) {
       console.error(error) 
    }
}

main()