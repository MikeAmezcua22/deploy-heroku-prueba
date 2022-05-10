//const http = require('http')
const express = require('express')
const app = express()
const logger = require ('./loggerMiddlerware')
const cors = require('cors')

app.use(cors())

app.use(logger)

app.use(express.json())

let notes = [
    {
        "id": 1, 
        "content": "Contenido 1",
        "date": "2019-02-02",
        "important": false
    },
    {
        "id": 2, 
        "content": "Contenido 2",
        "date": "2019-03-03",
        "important": false
    },
    {
        "id": 3, 
        "content": "Contenido 3",
        "date": "2019-04-04",
        "important": false
    }
]

/*
    const app = http.createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' })

        response.end("Hello world")
    })
*/

app.get('/', (request, response) => {
    response.send("<h1> Helo World </h2>")
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    notes = notes.filter(note => note.id === id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    console.log()

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId +1,
        content: note.content,
        important: typeof note.important === 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }
    notes = [...notes, newNote]
    response.json(note)
})

app.use((request, response) => {
    response.status(404).json({
        error: "Not found"
    })
}) 



const PORT = process.env.PORT || 3001
//app.listen(PORT)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

