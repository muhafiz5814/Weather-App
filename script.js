const inputEl = document.getElementById("input-city")

inputEl.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        document.getElementById("search-btn").click()
    }
})

const searchCity = () => {
    const inputEl = document.getElementById("input-city")
    const city = inputEl.value
    
    getWeather(city)
    .then(data => {
        showWeather(data)
        removeError()
    })
    .catch(err => {

        showError()
        console.log(err)
        console.log("Something Happened")
    })
}

const getWeather = (city) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '448f6e6646mshae8d1b83e3bf9dcp19d66cjsndf02efe18abe',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
    
    return fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`, options)
        .then(response => response.json())
        .catch(err => console.error(err))
        // .then(response => response)
        

}


const showWeather = (data) => {
    document.getElementById("city1").textContent = `${data.location.city} (${data.location.country})`
    
    document.getElementById("main").textContent = data.current_observation.condition.text
    
    document.getElementById("temp").textContent = data.current_observation.condition.temperature
    
    document.getElementById("min-temp").textContent = data.forecasts[0].low
    
    document.getElementById("max-temp").textContent = data.forecasts[0].high

}

const showError = () => {
    const errorEl = document.getElementById("error-box")

    errorEl.innerHTML = `<h3> Invalid Input! Please type a city name. </h3>`
}

const removeError = () => {
    const errorEl = document.getElementById("error-box")

    errorEl.innerHTML = ``
}