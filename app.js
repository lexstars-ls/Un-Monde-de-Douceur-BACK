
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;



app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// ...

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter); 

// ...

app.listen(port, () =>
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
);