console.log('Loading restify server...');

var restify = require('restify');

var api = restify.createServer({name: 'some-random-api'});
api.listen(process.env.PORT || 5000, function () {
    console.log('%s listening at %s', api.name, api.url)
});

// api.pre(restify.CORS({
//     origins: ['*'],
//     credentials: false,
//     headers: ['X-Requested-With', 'Authorization']
// }));
// api.pre(restify.fullResponse());

api.use(restify.bodyParser());

api.get('/api/ping', function (req, res, next) {
    console.log("ping called");
    res.send(200, {response: true});
});

api.get('/api/users', function (req, res, next)
{
  res.json([
    {firstName: 'Jesse', lastName: 'Warden'},
    {firstName: 'Brandy', lastName: 'Fortune'},
    {firstName: 'Sydney', lastName: 'Warden'},
    {firstName: 'Rowan', lastName: 'Warden'},
    {firstName: 'Albus', lastName: 'Warden'}
  ]);
});