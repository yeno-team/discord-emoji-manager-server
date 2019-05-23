'use strict';

const app = require('./src/api.js');

app.listen(process.env.PORT || 8000, () => console.log('Started'));