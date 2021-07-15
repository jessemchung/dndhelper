const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const axios = require('axios');

var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'DnD'
});

connection.connect((err)=> {
  console.error(err);
});


//the error was that the object was getting run into the browser but I needed to properlly turn it into
//a json string first before i did that.
connection.query('SELECT * FROM favorites', function (error, results, fields) {
  if (error) console.error(error);
  // console.log('The solution is: ', results);
  console.log('AAAAAAAAAAAAAAAAAAAAAAAaa');
  console.log(JSON.parse(results[0].name), 'should be stuff');
});



app.use(express.static('client/dist'));

//controller

//the second argument can be imported and called here?

//model layer handles data

//model method exports the function

//and the controller layer would import the function

//all the callbacks in a controller folder

//for each route in app.get 

//the callback has req and res

//is to build a folder for controllers

//build a folder for models?

//index should be the router

//controller files

//controller's main job is to handle requests.

//


app.get('/monster', (req, res) => {
  // console.log('inside get');
  // console.log(req.query, 'the query');

    // https://api.open5e.com/monsters/?challenge_rating=3&format=json&search=dragon
  axios.get(`https://api.open5e.com/monsters/?${req.query.type}=${req.query.name}`)
  .then(function (response) {
    // handle success
    console.log('focusing')
    // console.log(response.data);
    res.status(200);
    res.send(response.data);
    //seems to send an object with results being an array inside that we need that contains data

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


})


app.get('/singlemonster', (req, res) => {

  console.log(req.query.slug, 'should be query');
  // https://api.open5e.com/monsters/adult-black-dragon/
  axios.get(`https://api.open5e.com/monsters/${req.query.slug}/`)
  .then(function (response) {
    // handle success
    // console.log(response.data);
    console.log(response);
    res.status(200);
    res.send(response.data);
    //seems to send an object with results being an array inside that we need that contains data

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

})


app.post('/favorites', (req, res)=> {

  console.log(req.query.name, 'what is this2');


  console.log(req.query.name, 'store string', typeof(storeString));


  connection.query(`INSERT INTO favorites (name) values ('${req.query.name}')`, function (error, results, fields) {
    if (error) console.error(error);
    console.log('The solution is: ', results);
  });


  console.log('we made a favorite');
  res.status(200);
  res.send();


  // INSERT INTO tbl_name (a,b,c)
  //   VALUES(1,2,3), (4,5,6), (7,8,9);



})

app.get('/favorites', (req, res)=> {
  console.log('request for favorites has been initiated');
  connection.query('SELECT * FROM favorites', function (error, results, fields) {
    if (error) console.error(error);
    else {
      console.log(results);

      let thing = results;

      console.log(thing, 'thing');
      // let thing2;
      // // = JSON.parse(thing.name);
      // console.log((thing.name), 'maybe things needs to be parsed more?')
      // console.log(typeof(thing2), thing2, '.name');
      res.status(200);
      res.send(results.data)
    }
  });



})



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})



//control . seems to allow something to be extracted to global scope by putting the contents of said thing into a function (which you name on the spot)
//and have that function outisde in the global area.