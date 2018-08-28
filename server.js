const express = require('express');

const app = express();

// Server Routes, have to be above *, to get recognized first
app.get('/hello', (req, res) => res.send({ hi: 'there'}));

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    // open dist directory available for users
    app.use(express.static('dist'));
    // makesure react router browserhistory working correctly
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
