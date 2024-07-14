require('dotenv').config()

const express = require('express')
const cors = require('cors')
const server = express()

const PORT = process.env.PORT || 9000

server.use(express.json())
server.use(cors())


const users = [
    { id : 1 , username: 'Elleanor Vaughn' , password: '1234567'},
    {id : 2 , username: 'Claire Barker' , password: 'ElephantsRock'},
    {id: 3, username: 'Johnny Outlaw' , password : 'RiskyBusiness'}, 
]

server.get('/api/users' , (req, res, next) => {
    try{
    const usernames = users.map(user => user.username)
        res.status(200).json(usernames)
    }
    catch(error){
        next(error)
    }
})


server.post('/api/register' , (req, res, next) => {
    try{
       const newUser = req.body 
       if(!newUser.username || !newUser.password){
        res.status(400).json({message: "please provide username and password"})
    }
    res.status(201).json(newUser)
    } catch(error) {
        next(error)
    }
})

server.post('/api/login' , (req, res, next) => {
    try{
        const { username , password } = req.body
        if(!username || !password){
            res.status(400).json({message: 'Please provide username and password'})
        }
        const user = users.find(user => user.username === username && user.password === password)
        if(!user){
            res.status(400).json({message: 'Please enter correct username and/or password'})
        }
        res.send(`<h1> Welcome Back ${user.username}</h1>`)

    } catch (error){
        next(error)
    }
})

server.use('*' , (req, res, next) => {
    res.send(`<h2> Hello </h2>`)
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack:err.stack,
        customMessage: 'Error has occurred'
    })
})



server.listen(PORT , () => {
    console.log(`listening on port ${PORT}`)
})