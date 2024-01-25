/** Select the Input Element from the DOM */
const inputEl = document.getElementById("input-city")

/** 
 * Change the default working of "Enter" key.
 * First Prevent the default working of "Enter" keypress event.
 * Then make the search-btn click.
 */
inputEl.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        document.getElementById("search-btn").click()
    }
})

/**
 * It gets the value of input, which is a city name.
 * It then passes the value to another function which gets the weather data of the city.
 * If we get the response, then show data on screen.
 * If we get some error, then show the error message to the user for better communication and better user experience.
 */
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

/**
 * Gets the weather data of the city and returns the promise.
 * @param {String} city holds the city name, of which weather data we want to get.
 * @returns Promise if successfull or error if something wrong happened.
 */
const getWeather = (city) => {
    const options = {
        method: 'GET',
        headers: {
            // The old API Key has been deleted successfully.
            // Provide your RapidAPI key to make a request
            'X-RapidAPI-Key': 'YOUR API KEY',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
    
    return fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`, options)
        .then(response => response.json())
        .catch(err => console.error(err))
}

/**
 * Renders the weather details on the website page.
 * @param {JSON} data Weather details of the city.
 */
const showWeather = (data) => {
    document.getElementById("city1").textContent = `${data.location.city} (${data.location.country})`
    document.getElementById("main").textContent = data.current_observation.condition.text
    document.getElementById("temp").textContent = data.current_observation.condition.temperature
    document.getElementById("min-temp").textContent = data.forecasts[0].low
    document.getElementById("max-temp").textContent = data.forecasts[0].high
}

/**
 * Shows error message to the user if invalid city name is entered.
 */
const showError = () => {
    const errorEl = document.getElementById("error-box")
    errorEl.innerHTML = `<h3> Invalid Input! Please type a city name. </h3>`
}

/**
 * Removes the error message from DOM.
 */
const removeError = () => {
    const errorEl = document.getElementById("error-box")
    errorEl.innerHTML = ``
}