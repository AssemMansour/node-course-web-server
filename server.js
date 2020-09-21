import express from 'express';
import hbs from 'hbs';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n');
    console.log(log);
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrYear', ()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our website!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Oops! Something went wrong.'
    });
});

app.listen(port, () => {
    console.log(`server up on port ${port}.`);
});