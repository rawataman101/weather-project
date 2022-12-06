const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// get info when go to the root page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res) {
  // get data from external servers
  const city = req.body.cityName;
  const appID = "f276c19df6cf8e6b0ff9f1cad85f1afe";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weahterData = JSON.parse(data);
      const temp = weahterData.main.temp
      const des = weahterData.weather[0].description
      const icon = weahterData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + des);
      res.write("<h1>The temprature in "+ city + " is " + temp + " degrees Celicius.</h1>")
      res.write("<img src = " + imageURL + ">")
      res.write("<body  style = background-color:#898AA6;>")

      res.send();
    })
  })
})

// listening
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
