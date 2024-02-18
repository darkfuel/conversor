const graph = document.getElementById('myChart')
const input = document.querySelector('input')
const selec = document.querySelector('select')
const bt = document.querySelector('button')
const result = document.querySelector('p')

const value = async () => {
    const response = await fetch('https://mindicador.cl/api')
    return await response.json()
}

async function createChart() {
    const res = await fetch('https://mindicador.cl/api/dolar')
    const fechas = await res.json()

    const labelsF = fechas.serie.map((date) => {
        
        return date.fecha.slice(5, 10)
    })
    const labels = labelsF.slice(0, 10)
    const labelsV = fechas.serie.map((tasa) => {
        return tasa.valor
    })
    const ultiValor = labelsV.slice(0, 10)
    
    const datasets = [
        {   label: "Histórico",
            borderColor: "rgb(255,99,132",
            data: ultiValor
        }
    ]
     console.log(labels)
     console.log(ultiValor)
    // console.log(datasets)
    return { labels, datasets }
}

async function renderChart() {
    const data = await createChart()
    console.log(data)
    const config = {
        type: 'line',
        data
    };
    new Chart(graph, config)
}


const renderCoin = (coin) => {
    let vPeso = input.value
    if (selec.value === 'Dolar') {
        const vDolar = coin.dolar.valor
        let vResult = vPeso * vDolar
        result.innerHTML = vResult
    } else {
        const vEuro = coin.euro.valor
        let vResult = vPeso * vEuro
        result.innerHTML = vResult
    }
}

const main = async () => {
    try {
        const coin = await value()
        renderChart()
        createChart()
        renderCoin(coin)
    } catch (error) {
        alert('Ocurrió un error, verifique conexión y estado de mindicador.cl')
    }
}
bt.addEventListener('click', () => {
    main()
})