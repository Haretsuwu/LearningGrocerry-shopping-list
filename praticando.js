let soma = 0

const latinhas = [{"name": "Coca-Cola", "id": 1}, {"name": "Sprite", "id": 2}, {"name": "Skol", "id": 10}]

latinhas.push({"name": "Guaraná", "id": 3})

const encontrarLatinha = latinhas.find(function(lata) { return lata.id === 1 })

const filtroLatina = latinhas.filter(lata => { return lata.id < 3 })

const existe = latinhas.some(lata => lata.id === 1)

const novasLatinhas = [...latinhas, {"name": "Pepsi", "id": 4}]

latinhas.pop({"name": "Guaraná", "id": 3})

const guarana = latinhas.map(lata => {return {"name": "Guaraná", "id": lata.id}})

const latasInversa = [...latinhas].reverse()

const cortar = latinhas.slice(-2)

console.log("Latas originais " + JSON.stringify(latinhas))

console.log("Existe latinha com index 1? " + existe)

console.log("Buscando latinha " + JSON.stringify(encontrarLatinha))

console.log("Latas filtradas " + JSON.stringify(filtroLatina))

console.log("Novas Latas " + JSON.stringify(novasLatinhas))

console.log("Tirando as duas ultimas latinhas " + JSON.stringify(cortar))

console.log("Guaraná " + JSON.stringify(guarana))

console.log("Invertendo a ordem " + JSON.stringify(latasInversa))

latinhas.forEach(lata => {soma += +lata.id})

console.log("Soma id's " + soma)

latinhas.forEach(lata => {
  nome = "Artur"
  nome += lata.name;
  console.log(nome)
})
