const express = require('express');
const appRouter = require('./routers/appRouter');
const loggingMiddleware = require('./middlewares/custom-logging-mw');

const app = express();

app.use(express.json());
app.use(loggingMiddleware);
app.use('/api/v1', appRouter);

module.exports = app;
