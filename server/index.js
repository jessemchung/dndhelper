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


console.log("hell");

connection.query('SELECT * FROM favorites', function (error, results, fields) {
  if (error) console.error(error);
  console.log('The solution is: ', results);
});



app.use(express.static('client/dist'));

console.log('hello');


app.get('/monster', (req, res) => {
  // console.log('inside get');
  // console.log(req.query, 'the query');

    // https://api.open5e.com/monsters/?challenge_rating=3&format=json&search=dragon
  axios.get(`https://api.open5e.com/monsters/?${req.query.type}=${req.query.name}`)
  .then(function (response) {
    // handle success
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

  console.log(req.query.name);

  connection.query(`INSERT INTO favorites (name) values ("${req.query.name}")`, function (error, results, fields) {
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
      res.status(200);
      res.send(results)
    }
  });



})



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})