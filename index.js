const express = require('express')
const cypress = require('cypress')
const path = require('path')

const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Handles any requests that don't match the ones above
app.use(express.static(path.join(__dirname, 'mochawesome-report')))

app.get('/run', async function (req, res) {
  const date = new Date()
  await cypress.run({
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'yyyy-mm-dd',
      reportTitle: `Test title ${date.toISOString}`,
    },
    video: false,
  })
  const jsonReport = await merge({
    files: ['./cypress/results/*.json'],
  })
  await generator.create(jsonReport, { charts: true })
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
