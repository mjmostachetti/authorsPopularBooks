var express = require('express');
var router = express.Router();
var https = require('https')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('findAuthor', { title: 'Express' });
});

//api call to return an authors books
router.get('/findAuthorsBooks', function(request,response){
  console.log(request.body)
  /*
  https('https://www.goodreads.com/api/author_url/' + 
    Orson%20Scott%20Card?key=qjXRyTtjvpFSAa8N8VL8Iw')
  */
})

module.exports = router;
