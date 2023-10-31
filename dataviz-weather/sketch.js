let apiKey = 'c5495bbee562ce0fe8e2df1fe7e2680f';

// initialize an empty object to store the weather data for different cities.
let weather = {};

// variable to represent the input field where the user will enter the city name.
let cityInput;

// set default values for minimum and maximum temperatures for later calculations.
let minTemp = 1000;
let maxTemp = -1000;

function setup() {
  createCanvas(800, 600);
  // create an input field for the user to enter the name of a city.
  cityInput = createInput();
  // set the position of the input field on the canvas.
  cityInput.position(10, 10);

  // create a button with the label "Check Weather".
  let button = createButton('Check Weather');

  // set the position of the button right next to the input field.
  button.position(cityInput.x + cityInput.width + 10, 10);

  // assign a function to be executed when the button is pressed.
  button.mousePressed(getWeather);
}

function draw() {
  background(220);

  // check if there's weather data available for the city the user entered.
  if (weather[cityInput.value()]) {
    // if there's data, display it using the showWeather() function.
    showWeather(cityInput.value());
  }
}

// a custom function to fetch the weather data for a given city.
function getWeather() {
  // get the name of the city from the input field.
  let city = cityInput.value();
  let proxy = 'https://corsproxy.io/?';
  let url = proxy + 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

  // fetch the weather data in JSON format.
  loadJSON(url, function(data) {
    // store the fetched data in the 'weather' object, using the city name as a key.
    weather[city] = data.list;

    // iterate over the fetched data to find the lowest and highest temperatures.
    for (let i = 0; i < data.list.length; i++) {
      // convert temperature from Kelvin to Celsius.
      let temp = data.list[i].main.temp - 273.15;
      if (temp < minTemp) 
        minTemp = temp;
      if (temp > maxTemp) 
        maxTemp = temp;
    }
  });
}

function showWeather(city) {
  // shift the origin of the canvas to its center.
  translate(width / 2, height / 2);

  // display the name of the city.
  text(city, 0, -120);

  // start plotting the temperature graph.
  beginShape();
  // loop through the weather data points for the city.
  for (let i = 0; i < weather[city].length; i++) {
    // convert temperature from Kelvin to Celsius.
    let temp = weather[city][i].main.temp - 273.15;
    // map the temperature value to a y-coordinate for the graph.
    let y = map(temp, minTemp, maxTemp, 100, -100);
    // add the current point to the temperature graph.
    vertex(i * 5, y);
  }
  // finish plotting the temperature graph.
  endShape();

  // display y-axis labels showing temperature values.
  for (let i = Math.floor(minTemp); i <= maxTemp; i++) {
    // map each temperature value to a y-coordinate.
    let y = map(i, minTemp, maxTemp, 100, -100);

    // display the temperature label.
    text(i.toFixed(2) + "°C", -40, y);
  }

  // display x-axis labels showing time values.
  let timeLabels = 8;
  let spacing = Math.floor(weather[city].length / timeLabels);
  let initialHour = int(weather[city][0].dt_txt.split(' ')[1].split(':')[0]);
  for (let i = 0; i < timeLabels; i++) {
    // calculate the hour for each label. (duration 3 hours)
    let hour = (initialHour + i * 3) % 24;

    // display the hour label.
    text(str(hour).padStart(2, '0'), i * spacing * 5, 110);
  }
}
