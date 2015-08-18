var express = require('express');
var router = express.Router();
var https = require('https')
var xml2js = require('xml2js')

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
  var authorsName = request.params.authorName
  console.log(authorsName)
  var authorXML = '';
  var parseString = xml2js.parseString
  https.get('https://www.goodreads.com/api/author_url/' + 
    authorsName + '?key=qjXRyTtjvpFSAa8N8VL8Iw',
    function(res){
      res.on('data', function(d){
        authorXML += d;
      })

      res.on('end', function(){
        console.log(authorXML)
        parseString(authorXML, function (err, result) {
          // Author Id
          console.log(result.GoodreadsResponse.author[0].$.id);
          var authorID = result.GoodreadsResponse.author[0].$.id;
          var authorsBooks = ''
          https.get('https://www.goodreads.com/author/list/' +
            authorID + '?format=xml&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
              res.on('data', function(d){
                authorsBooks += d
              })
              res.on('end', function(){
                parseString(authorsBooks,function (err,result){
                  console.log(result.GoodreadsResponse.author[0])
                  var authorObj = result.GoodreadsResponse.author[0];
                  var responseObj = {
                    authorInfo : authorObj
                  }
                  https.get('https://www.goodreads.com/author/show.xml?id=' +
                    authorID + '&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
                      
                    })
                  //return the author
                  //response.json(authorObj)
                })
              })
            })
          });
      })
    })
})

module.exports = router;
