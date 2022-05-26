const express = require('express');
const PORT = process.env.PORT || 4000;
const books = require('./routes/api/books.routes');
const borrowings = require('./routes/api/borrowings.routes');
const students = require('./routes/api/students.routes');
const users = require('./routes/users_service/users.routes');

const passport = require('passport');
const cors = require('cors');

// const apiLogger = require('./middleware/apiLogger');
const helmet = require('helmet');

const bodyParser = require('body-parser');
// const logger = require('./middleware/logger');
const requestId = require('./middleware/requestId');
const path = require('path');

require('./middleware/passport/config')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(passport.initialize());

app.use(requestId);
// app.use(apiLogger);

app.use(express.static(path.resolve(__dirname, 'public/index.html')));

app.get('/', async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.use('/service/', users);
app.use('/api/v1/books', books);
app.use('/api/v1/borrowings', borrowings);
app.use('/api/v1/students', students);

app.set('port', PORT);

app.listen(app.get('port'), () => {
    console.log(`Serwer is running on ${PORT} port`);
});
