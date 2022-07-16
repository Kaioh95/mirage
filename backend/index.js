const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

// Pasta public de imagens
//app.use('/public', express.static('public'))
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./routes/UserRoutes')
const PostRoutes = require('./routes/PostRoutes')
const PostInfoRoutes = require('./routes/PostInfoRoutes')
const CommentRoutes = require('./routes/CommentRoutes')

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)
app.use('/post-info', PostInfoRoutes)
app.use('/comments', CommentRoutes)

app.listen(5000)

