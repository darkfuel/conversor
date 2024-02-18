const graph = document.getElementById('myChart')
const input = document.querySelector('input')
const selec = document.querySelector('select')
const bt = document.querySelector('button')
const result = document.querySelector('p')

//valores actual
const value = async () => {
    const response = await fetch('https://mindicador.cl/api')
    return await response.json()
}
//calculo peso a dolar
async function createChartDolar() {
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
        {
            label: "Variación",
            borderColor: "rgb(255,99,132",
            data: ultiValor
        }
    ]
    return { labels, datasets }
}
//calculo de peso a euro
async function createChartEuro() {
    const res = await fetch('https://mindicador.cl/api/euro')
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
        {
            label: "Variación",
            borderColor: "rgb(255,99,132",
            data: ultiValor
        }
    ]
    return { labels, datasets }
}
//generador de grafico
async function renderChart() {
    const graph = document.getElementById('myChart')
    if (selec.value === 'Dolar') {
        const data = await createChartDolar()
        let config = {
            type: 'line',
            data
        };
        const myChart = new Chart(graph, config)

    } else {

        const data = await createChartEuro()
        let config = {
            type: 'line',
            data
        };
        const myChart = new Chart(graph, config)
    }


}
//calculo de conversion
const renderCoin = (coin) => {

    let vPeso = input.value
    if (selec.value === 'Dolar') {
        const vDolar = coin.dolar.valor
        let vResult = vPeso * vDolar
        result.innerHTML = '($)  ' + vResult.toFixed(2)
    } else {
        const vEuro = coin.euro.valor
        let vResult = vPeso * vEuro
        result.innerHTML = '(€)  ' + vResult.toFixed(2)
    }
}
//control principal
const main = async () => {
    try {
        const coin = await value()
        renderChart()
        renderCoin(coin)
        Chart.helpers.each(Chart.instances, function (instance) {
            instance.destroy();
        });

    } catch (error) {
        alert('Ocurrió un error, verifique conexión y estado de mindicador.cl')
    }
}

bt.addEventListener('click', () => {
    main()
})