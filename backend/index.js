const express = require('express');
const app = express();

app.use(express.json());

const rootRouter = require('./routes/index');

app.use('/api/v1', rootRouter);

app.listen(3000, () => {
    console.log("your port is listening at port 3000");
})
