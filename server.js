const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const resultRoutes = require('./routes/resultRoutes');
const app = express();
const db = require('./models');
const hbs = require('hbs');
const { path } = require('express/lib/application');
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.use('/', studentRoutes);
app.use('/', resultRoutes)

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
});