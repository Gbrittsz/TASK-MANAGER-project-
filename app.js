const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found');
const app = express();

// middleware
app.use(express.json())

//routes

app.use('/api/v1/tasks', tasks)

app.use(errorHandlerMiddleware)
app.use(notFound)




const PORT = process.env.PORT || 5000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`)
        })
        

    } catch (error) {
        console.log(error)

    }
}

start();