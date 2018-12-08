const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');  
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now} ${req.path} ${req.method}`);
    var log = `${now} ${req.path} ${req.method}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("Error:", err)
        }
    })
    next();
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalise', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear(),
        message: 'Welcome dude!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page dynamic',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});