let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c5495bbee562ce0fe8e2df1fe7e2680f';

function preload(){
  data = loadJSON(apiUrl);
}
function setup() {
  createCanvas(400, 200);
  background(220);

  console.log(data);
}

