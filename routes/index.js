var express = require('express');
var router = express.Router();
var https = require('https')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});

//api call to return an authors books
router.get('/findAuthorsBooks/:authorName', function(request,response){
  console.log(request.body)
  console.log(request.params.authorName)
  /*
  https('https://www.goodreads.com/api/author_url/' + 
    Orson%20Scott%20Card?key=qjXRyTtjvpFSAa8N8VL8Iw')
  */
})

module.exports = router;
