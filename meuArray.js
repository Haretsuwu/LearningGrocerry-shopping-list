// como declarar um array: nomeVariavel = [] //isso nos dá um array vazio
const latinhas = ["Coca-Cola", "Sprite"]
// push: adicionar um novo elemento
latinhas.push("Guaraná")
// filter: filtra os objetos mostrados no array
const novasLatinhas = latinhas.filter(latinha => { return latinha !== "Sprite" })
// find: retorna apenas 1 elemento do array, quando encontrado o elemento a execução para,
//       sendo assim recebe uma estrutura de condição
const latinhaCoca = latinhas.find(latinha => { return latinha === "Coca-Cola" } )
// include: retorna um booleano caso encontre o item específicado dentro do array
// include(valorASerEncontrado, indexDeInícioDaPesquisa)
const found = latinhas.includes("Sprite")
// [...arrayASerUsado, novosItens]: é uma forma de dar update no array, retorna um novo objeto.
// O nome desse update é spread
const latinhasUpdate = [...latinhas, "Pepsi"]
// slice: corta o array a partir da posição index passada para início,
//        e mostra a quantidade de itens com base no número colocado
//        pode receber index negativo, valores negativos para o index faz ele começar do final
// obs: caso os parametros sejam iguais vai retonar um array vazio
const latinhasCortada = latinhas.slice(-1)
// pop: remove o utlimo item do array
latinhas.pop()
// map: muda todos os itens do array para o retorno selecionado
const guarana = latinhas.map(function(lata) {return "Guaraná"})
// reverse: reverte a ordem dos itens do array
// usando spread e isolando o array original, podemos criar um novo array com o metodo sem mudar o original
const latinhaInversa = [...latinhas].reverse()
// forEach: faz um for passando em cada item do array
latinhas.forEach(lata => console.log(lata))

const index = latinhas.findIndex(obj => obj === "Sprite");

// obs: as funções pop, push e reverse alteram o array original

console.log(latinhas)

console.log(latinhaCoca)

console.log(latinhasUpdate)

console.log(latinhasCortada)

console.log(guarana)

console.log(latinhaInversa)

console.log(novasLatinhas)

console.log("index ",index);
