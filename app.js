const express = require('express');

const db = require('./data/database');
const todosRoutes = require("./routes/todos.routes");
const enableCors = require("./middlewares/cors");

const app = express();

app.use(enableCors);
app.use(express.json());


app.use((error, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong!',
  });
});

app.use("/todos", todosRoutes);


db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Connecting to the database failed!' + error);
  });
