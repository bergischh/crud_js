const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const { connect } = require('../routes/author')
const pool = mysql.createPool(dbConfig)

const getAuthors = (req, res) => {
    const query2 = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query2,(err, results) => {
            if (err) throw err;

            responseSuccess(res, results, 'Author succesfully fetched')
        })

        connection.release()
    })
}

const getAuthor = (req, res) => {
    const id = req.params.id

    const query2 = `SELECT * FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if (err) throw err 

        connection.query(query2, (err, results) => {
            if (err) throw err

            if (results.length == 0 ) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully fetched')
        })

        connection.release()
    })
}

const addAuthor = (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query2 = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query2, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Author successfully added')
        })

        connection.release()
    })
}

const updateAuthor = (req, res) => {
    const id = req.params.id

    const data = {
        name: req.body.name,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query2 = `UPDATE author SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query2, [data], (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully updated')
        })

        connection.release()
    })
}

const deleteAuthor = (req, res) => {
    const id = req.params.id 

    const query2 = `DELETE FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query2, (err, results) => {
            if(err) throw err

            if (results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully deleted')
        })

        connection.release()
    })
}

module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}