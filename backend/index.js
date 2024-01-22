const express = require("express");
const app = express();
const rootRouter = require('./routes/index')
app.use(express.json());
const cors = require('cors')
app.use(cors());

app.use("/api/v1",rootRouter)


app.listen(3000);
