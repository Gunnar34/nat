var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var port = process.env.PORT || 4567;
var index = require('./modules/routes/index');
var voteItems = require('./modules/routes/voteItms');

app.use('/', index);
app.use('/voteItems', voteItems);
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.listen( port, function(){
  console.log('server 4567');
});
