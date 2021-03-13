const express = require('express')
const axios = require ('axios')
const helpers = require('./helpers.js');


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 3030

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})

app.get('/', function (request, response) {
    console.log("Someone has come into the server. Brace yourselves.")
})

app.post('/', function (request,response){
    const result = request.body;
    const pullRequest = result.pull_request
    // axios.get('localhost:8080/capture?url=https://www.google.com')
    //     .then(function (res) {
    //         // handle success
    //         console.log(res);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    console.log(`prurl: ${pullRequest.html_url} timestamp: ${pullRequest.created_at}`);
    // helpers.capture()
    response.send('thanks');
})

app.get('/capture', helpers.capture);
// if (helpers.showResults()) {
//     app.get('/', helpers.latestCapturePage);
//     app.get('/latest', helpers.latestCapture);
// }

// app.get('/check', function (req,res){
//     const url =
// })