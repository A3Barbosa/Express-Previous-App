const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient




var db, collection;

const url = "mongodb+srv://a3barbosa21:stackup@cluster0.ck4epij.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";




// function isItPalindrome(theName){
//   if (theName.toLowerCase() == theName.toLowerCase().split('').reverse().join('')){
//     return true

//   } else {

//     return false
//   }
// }


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.get('/', (req, res) => {
  db.collection('names').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {names: result})
  })
})


app.post('/names', (req, res) => {
  db.collection('names').insertOne({name: req.body.name, check:"" }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/names', (req, res) => {
  db.collection('names')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      check:req.body.name === req.body.name.toLowerCase().split('').reverse().join('') ? "yes, it is a palindrome!" : "aww, no it is not a palindrome!"
     
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/names', (req, res) => {
  db.collection('names').findOneAndDelete({name: req.body.name,}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.use(express.static('public'))
app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
  });
});



