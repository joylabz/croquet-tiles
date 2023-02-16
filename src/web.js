const path = require('path')
const express = require('express')
const app = express()
const {log} = console
const port = 3000
const distPath = 'dist'
app.use('/', express.static(distPath))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`./${distPath}/index.html`))
})

app.listen(
  process.env.PORT || port,
  process.env.HOST || 'localhost',
  () => log(`Listening at http://localhost:${port}`)
)
