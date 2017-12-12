const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// register partials of views
hbs.registerPartials(__dirname + '/views/partials')

app.set('view.engine', 'hbs');

// middleware for static pages. will be render before other middlewares
app.use(express.static(__dirname + '/public'));

// middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintance.hbs');
// });

// global function called in hbs views
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Gena',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });

    // choose view with data
    res.render('home.hbs', {
        pageTitle: 'Wellcome to my blog!',
        welcomeMessage: 'Made with love for you',

    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(port, () => {
    console.log(`Server up on ${port} port`);
});