const keyApi = "e953f74cd6e4f5324c0b52713a2a3abb"


function colocarDadosNaTela(dados) {
    try {
        console.log(dados)
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
        document.querySelector(".pais").innerHTML = "PAÍS: " + dados.sys.country
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°c"
        document.querySelector(".lat").innerHTML = "LATITUDE: " + dados.coord.lat
        document.querySelector(".lon").innerHTML = "LONGITUDE: " + dados.coord.lon
        document.querySelector(".wind").innerHTML = "VENTO: " + dados.wind.speed + "m/s"
        document.querySelector(".tezto-previsao").innerHTML = dados.weather[0].description
        document.querySelector(".umidade").innerHTML = "UMIDADE: " + dados.main.humidity + "%"
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    } catch (error) {
        document.querySelector(".cidade").innerHTML = "Cidade não encontrada! verifique o nome escrito!"
        document.querySelector(".pais").innerHTML = "PAÍS: --"
        document.querySelector(".temp").innerHTML = "°c"
        document.querySelector(".lat").innerHTML = "LATITUDE: "
        document.querySelector(".lon").innerHTML = "LONGITUDE: "
        document.querySelector(".wind").innerHTML = "VENTO: m/s"
        document.querySelector(".tezto-previsao").innerHTML = ""
        document.querySelector(".umidade").innerHTML = "UMIDADE: %"
        document.querySelector(".img-previsao").src = ``

    }
}


async function BuscarCidade(cidade) {

    // Exibir o loading
    document.getElementById("load").classList.add("loading");

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${keyApi}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    // Remover o loading após 1.5 segundos
    setTimeout(() => {
        document.getElementById("load").classList.remove("loading");
    }, 215);
    if (cidade === "") {
        document.querySelector(".cidade").innerHTML = "Digite o nome de alguma cidade "
        document.querySelector(".pais").innerHTML = "PAÍS: --"
        document.querySelector(".temp").innerHTML = "°c"
        document.querySelector(".lat").innerHTML = "LATITUDE: "
        document.querySelector(".lon").innerHTML = "LONGITUDE: "
        document.querySelector(".wind").innerHTML = "VENTO: m/s"
        document.querySelector(".tezto-previsao").innerHTML = ""
        document.querySelector(".umidade").innerHTML = "UMIDADE: %"
        document.querySelector(".img-previsao").src = ``
        return
    }

    setTimeout(() => {
        colocarDadosNaTela(dados);
    }, 216);

}

document.querySelector(".imput-city").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        CliqueiNoBotao();
    }
});



function CliqueiNoBotao() {
    const cidade = document.querySelector(".imput-city").value
    BuscarCidade(cidade)
}

