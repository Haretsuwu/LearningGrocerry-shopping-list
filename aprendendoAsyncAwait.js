function pegaDados() {
    const resultado = fetch('https://api.github.com/users/IArturRodrigues').then((res) => {
        console.log(res);
    });
    
    console.log(resultado);
}

async function testeSimples() {
    let result = await fetch('https://api.github.com/users/IArturRodrigues');
    console.log(result);
}

async function testeSimples2() {
    let result = await fetch('https://api.github.com/users/IArturRodrigues');
    let resultConverted = await result.json()
    console.log(resultConverted);
}

pegaDados();
testeSimples();

// console.log(fetch('https://api.github.com/users/IArturRodrigues'));