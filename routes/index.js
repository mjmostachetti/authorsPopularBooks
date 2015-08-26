var express = require('express');
var router = express.Router();
var https = require('https');
var xml2js = require('xml2js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/:name', function (req, res){
  var name = req.params.name;
  res.render('partials/' + name);
});
/*
//api call to return an authors books
router.get('/findAuthorsBooks/:authorName', function(request,response){
  var authorsName = request.params.authorName;
  console.log(authorsName);
  var authorXML = '';
  var parseString = xml2js.parseString;
  https.get('https://www.goodreads.com/api/author_url/' + authorsName + '?key=qjXRyTtjvpFSAa8N8VL8Iw',function(res){
      res.on('data', function(d){
        authorXML += d;
      })
      res.on('end', function(){
        parseString(authorXML, function (err, result){
          var authorID = result.GoodreadsResponse.author[0].$.id;
          var authorsBooks = '';
          https.get('https://www.goodreads.com/author/list/' + authorID + '?format=xml&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
              res.on('data', function(d){
                authorsBooks += d
              })
              res.on('end', function() {
                console.log("yes")
                parseString(authorsBooks, function(err,result){
                  var authorObj = result.GoodreadsResponse.author[0];
                  var responseObj = {};
                  responseObj.authorInfo = authorObj;
                  https.get('https://www.goodreads.com/author/show.xml?id=' + authorID + '&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
                      var authorsInfo = '';
                      res.on('data', function(data){
                        authorsInfo += data
                      })
                      res.on('end', function(){
                        parseString( authorsInfo , function (err,result){
                          authorsInfo = result.GoodreadsResponse.author[0]
                          var arrayOfInfluences = returnInfluencesArray(authorsInfo.influences[0])
                          authorsInfo.influences = arrayOfInfluences
                          var influencesLength = arrayOfInfluences.length
                          if(influencesLength === 0){
                            responseObj.authorBio = authorsInfo
                            response.json(responseObj)
                          }
                          var counter = 0;
                          var influencesObj = [];
                          conosole.log("Before For Each")
                          arrayOfInfluences.forEach(function(author){
                            var authorXML = '';
                            https.get('https://www.goodreads.com/api/author_url/' + 
                                author + '?key=qjXRyTtjvpFSAa8N8VL8Iw',
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
                                  https.get('https://www.goodreads.com/author/show.xml?id=' +
                                    authorID + '&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
                                      res.on('data', function(d){
                                        authorsBooks += d
                                      })
                                      res.on('end', function(){
                                        parseString(authorsBooks,function (err,result){
                                          counter++;
                                          console.log(result.GoodreadsResponse.author[0])
                                          var authorObj = result.GoodreadsResponse.author[0];
                                          influencesObj.push(authorObj);
                                          if(influencesLength === counter){
                                            responseObj.authorBio = authorsInfo
                                            responseObj.influencesToAuthor = influencesObj;
                                            response.json(responseObj)
                                          }
                                        })
                                      })
                                  })
                                })
                              })
                          });
                        })
                      })
                    })
                  });
                })
            })
          })
        })
  })
})
*/
router.get('/findAuthorsBooks/:authorName', function(request,response){
  var authorsName = request.params.authorName
  //console.log(authorsName)
  var authorXML = '';
  var parseString = xml2js.parseString

  // get authors id from the database
  https.get('https://www.goodreads.com/api/author_url/' + 
    authorsName + '?key=qjXRyTtjvpFSAa8N8VL8Iw',
    function(res){
      res.on('data', function(d){
        authorXML += d;
      })

      res.on('end', function(){
        //console.log(authorXML)
        parseString(authorXML, function (err, result) {
          // Author Id
          //console.log(result.GoodreadsResponse.author[0].$.id);
          var authorID = result.GoodreadsResponse.author[0].$.id;
          var authorsBooks = ''

          //

          https.get('https://www.goodreads.com/author/list/' +
            authorID + '?format=xml&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
              res.on('data', function(d){
                authorsBooks += d
              })
              res.on('end', function(){
                parseString(authorsBooks,function (err,result){
                  //console.log(result.GoodreadsResponse.author[0])
                  var authorObj = result.GoodreadsResponse.author[0];
                  var responseObj = {
                    authorInfo : authorObj
                  }
                  https.get('https://www.goodreads.com/author/show.xml?id=' +
                    authorID + '&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
                      var authorsInfo = '';
                      res.on('data', function(data){
                        authorsInfo += data
                      })
                      res.on('end', function(){
                        parseString(authorsInfo, function (err,result){
                          authorsInfo = result.GoodreadsResponse.author[0]
                          responseObj.authorBio = authorsInfo
                          var arrayOfInfluences = returnInfluencesArray(authorsInfo.influences[0])

                          authorsInfo.influences = arrayOfInfluences
                          var influencesLength = arrayOfInfluences.length
                          console.log("There are " + influencesLength + " number of influences.")
                          if(influencesLength === 0){
                            responseObj.authorBio = authorsInfo
                            responseObj.influencesToAuthor = [];
                            response.json(responseObj)
                            return
                          }                         
                          var counter = 0;
                          var influencesObj = [];
                          console.log("Before For Each")
                          console.log(typeof arrayOfInfluences)
                          if(typeof arrayOfInfluences === 'string'){
                            arrayOfInfluences = arrayOfInfluences.split(', ')
                            influencesLength = arrayOfInfluences.length
                            console.log(arrayOfInfluences)
                          }
                          arrayOfInfluences.forEach(function(author){
                            var authorXML = '';
                            console.log(author)
                            https.get('https://www.goodreads.com/api/author_url/' + 
                              author + '?key=qjXRyTtjvpFSAa8N8VL8Iw', function(res){
                                  res.on('data', function(d){
                                    authorXML += d;
                                  })
                                  res.on('end', function(){
                                    //console.log(authorXML)
                                    parseString(authorXML, function (err, result) {
                                      //console.log(result.GoodreadsResponse.author[0].$.id);
                                      // one of these influences for faulkner isn't return any useful information
                                      // maybe can fix it in the error handling
                                      if(result.GoodreadsResponse.author === undefined){
                                        counter++;
                                        console.log("Influence has no books in goodreads")
                                      }else{
                                       var authorID = result.GoodreadsResponse.author[0].$.id;
                                      var authorsBooks = '';
                                      https.get('https://www.goodreads.com/author/show.xml?id=' +
                                        authorID + '&key=qjXRyTtjvpFSAa8N8VL8Iw', function(res) {
                                          res.on('data', function(data){
                                            authorsBooks += data;
                                          })
                                          res.on('end', function(){
                                            parseString(authorsBooks,function (err,result){
                                              if(err){
                                                console.log(err)
                                              }
                                              counter++;
                                              //console.log(result.GoodreadsResponse.author[0])
                                              var authorObj = result.GoodreadsResponse.author[0];
                                              //console.log(influencesObj)
                                              influencesObj.push(authorObj);
                                              console.log(influencesLength)
                                              console.log(counter)
                                              if(influencesLength === counter){
                                                console.log('done!')
                                                responseObj.authorBio = authorsInfo;
                                                responseObj.influencesToAuthor = influencesObj;
                                                console.log(responseObj)
                                                response.json(responseObj)
                                              }
                                            })
                                          })
                                      }) 
                                      }
                                      
                                    })
                                  })
                          })
                        })
                      })
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
})

function returnInfluencesArray(string){
  var stringSplitUp = string.split('')
  console.log(stringSplitUp)
  var keepAuthors = [];
  var authorsName = '';
  var afterClosingBracket = false;
  if(string.search('<') !== -1){
      for(var x = 0; x < stringSplitUp.length; x++){
        if(afterClosingBracket === true && stringSplitUp[x] !== '<'){
          authorsName += stringSplitUp[x]
          console.log(authorsName)
        }
        else if(stringSplitUp[x] === '>'){
          afterClosingBracket = true;
        } 
        else if(stringSplitUp[x] === '<'){
          afterClosingBracket = false;
          keepAuthors.push(authorsName)
          console.log(authorsName)
          authorsName = '';
        }
      }
  }
  else{
    console.log(string)
    return string;
  }
  console.log()
  var removeNoneSense = keepAuthors.filter(function(author){
    return author.length > 4
  })
  console.log(removeNoneSense)
  return removeNoneSense;
}

module.exports = router;