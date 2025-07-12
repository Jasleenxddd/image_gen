// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000

const app = express()

// Middleware setup
app.use(express.json())     // ✅ Important: allows reading req.body
app.use(cors())             // ✅ Allows CORS

// Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => res.send("API working"))

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB()
    console.log("MongoDB connected successfully")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("DB Connection failed:", error.message)
    process.exit(1) // Exit if DB fails
  }
}

startServer()
