const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArray = []
    for (let idx = 0; idx < this.length;idx++){ 
        novoArray.push(
            callback(this[idx],idx)
        )
    }
    return novoArray
}

async function main() {
    try {
       const result = await service.obterPessoas('a') 
       console.log(result.results.map(p=>p.name))
        console.log(result.results.meuMap((p, idx) => {
           return `[${idx}]${p.name}` 
       }))
    } catch (error) {
       console.error(error) 
    }
}

main()