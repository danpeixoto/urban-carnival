const EventEmmiter = require("node:events");

class MeuEmissor extends EventEmmiter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', { click });
});

meuEmissor.emit(nomeEvento, 'na barra de rolagem');
meuEmissor.emit(nomeEvento, 'no ok');

// let count = 0;
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, "clicou no ok " + (++count));
// }, 2000);

const stdin = process.openStdin();
stdin.addListener('data', function (value) {
    console.log('Você digitou: ', value.toString().trim());
});

const teste = new EventEmmiter();
teste.on("data", function (value) {
    console.log("dentro de outro lugar veio o valor:", value);
});