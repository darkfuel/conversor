const graph = document.getElementById('myChart')
const input = document.querySelector('input')
const selec = document.querySelector('select')
const bt = document.querySelector('button')
const result = document.querySelector('p')

const value = async () => {
    const response = await fetch('https://mindicador.cl/api')
    return await response.json()
}

const renderCoin = (coin) => {
    let vPeso = input.value
    if (selec.value === 'Dolar'){
        const vDolar = coin.dolar.valor
        let vResult = vPeso * vDolar
        result.innerHTML = vResult
    } else{
        const vEuro = coin.euro.valor
        let vResult = vPeso * vEuro
        result.innerHTML = vResult
    } 
}

const main = async () => {
   try {
    const coin =  await value()
    renderCoin(coin)
   } catch (error) {
    alert('Ocurrió un error, verifique conexión y estado de mindicador.cl')
   }
    
}

bt.addEventListener('click', () => {
    main()
})


