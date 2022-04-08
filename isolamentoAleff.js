const result = [
{valor: '12', descricao: 'coquinha', categoria: 'refrigerante'},
{valor: '15', descricao: 'skol', categoria: 'cerveja'},
{valor: '10', descricao: 'pepsi', categoria: 'refrigerante'},
{valor: '20', descricao: 'Almoço', categoria: 'Refeição'}
]
let auxArray = result;

let finalResult = [];
result.forEach((element) => {
  const isExists = finalResult.some(fResult => fResult.category === element.categoria)
  if(!isExists) {
    finalResult.push({
      category: element.categoria,
      value: element.valor
    })
  } else {
    let index = finalResult.findIndex(currentElementInFinalResult => currentElementInFinalResult.category === element.categoria);
    finalResult[index] = {
      category: finalResult[index].category,
      value: (+finalResult[index].value) + (+element.valor)
    }
  }
});




