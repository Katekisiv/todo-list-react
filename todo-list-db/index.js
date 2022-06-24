require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 3306;
const router = require('./routes/index');
const authMiddleware = require('./middleware/authMiddleware');
const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(authMiddleware)

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`)
})
