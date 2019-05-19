'use strict';

const app = require('./src/');

app.listen(process.env.PORT || 8000, () => console.log('Started'));