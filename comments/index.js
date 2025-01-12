const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const commentsByPostID = {}

app.get("/posts/:id/comments", (req, res) => {
    const id = req.params.id
    res.send(commentsByPostID[id] || [])
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const id = req.params.id
    const {content} = req.body

    const comments = commentsByPostID[id] || []
    comments.push({id: commentId, content: content})
    commentsByPostID[id] = comments
    res.status(201).send(commentsByPostID[id])

});

app.listen(4002, () => {
    console.log('listening on 4002')
})