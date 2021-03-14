const express = require('express')
const axios = require ('axios')
const helpers = require('./helpers.js')
const https = require('https')
const Sequelize = require('sequelize')
const cors = require('cors')


const app = express()
const port = 3030

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const sequelize = new Sequelize('mysql://webapp:aviTal92@ec2-3-14-129-145.us-east-2.compute.amazonaws.com/auditech')

let screenshotID = 1


// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })
    // sequelize
    // .query("DELETE FROM pull_requests WHERE pr_url LIKE 'www%';")
    // .then(function ([result]) {
    //     console.log(result)
    // })

    
    const getPR = async function () {
        let results = await sequelize.query("SELECT * FROM pull_requests")
        return results
    }
    
    const addPR = async function (id, url, createdTime, screenShotLocation) {
        let query =`INSERT INTO pull_requests VALUES (${id}, '${url}', '${createdTime}', '${screenShotLocation}')`
        let result = await sequelize.query(query)
        return result[0]
    }



    app.get('/pullrequests', async function (request, response) {
    // const result = await getPR()
    const result = [
        [
            {
                id: 592387136,
                pr_url: 'https://github.com/Luttennet/testrepo/pull/6',
                created_time: '2021-03-13T16:20:25Z',
                screen_shot: './screenshot1.png'
            }
        ],
        [
            {
              id: 111111,
              pr_url: 'https://github.co/il/Luttennet/testrepo/pull/6',
              created_time: '2021-03-13T324234223425Z',
              screen_shot: './scresfdsdfsft1.png'
            }
        ]
    ]
    // console.log (result)
    response.send(result)
})

app.post('/', async function (request,response){
    const result = request.body;
    // console.log (result)
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
        const screenshotName = `screenshot${screenshotID}`
        screenshotID += 1
        helpers.capture(pullRequest.html_url, screenshotName)
        const screenShotLocation = `./${screenshotName}.png`
    const query = await addPR(pullRequest.id ,pullRequest.html_url, pullRequest.created_at, screenShotLocation)
    response.end();
})

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})
// app.get('/capture', helpers.capture);
// if (helpers.showResults()) {
    //     app.get('/', helpers.latestCapturePage);
    //     app.get('/latest', helpers.latestCapture);
// }

// app.get('/check', function (req,res){
//     const url =
// })