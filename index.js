const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const dbConfig = require ('./config/database')
const pool = mysql.createPool(dbConfig)

pool.on('error', (err) => {
    console.log(err)
})

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded ({
	extended: true
}))

//membuat parameter harus diawali : 
//parameter ini dibutuhkan ketika kita sedang update
app.get('/contohparameter/:username/:jurusan/:kelas', (req, res) => {
    res.json(req.params)
})

//kalo bikin parameter nya kaya gini berarti tidak terbatas, tidak seperti yang diatas 
app.get('/contohparam', (req, res) => {
    res.json(req.query)
})
app.get('/', (req, res) => {
    res.write('Hello World')
    res.end()

    koneksi.query('select * from books', (err, result) => {
        if (err) {
            console.log('error')
        }else {

        }
    })
})

app.use('/book', bookRoute)
app.use('/author', authorRoute)

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})