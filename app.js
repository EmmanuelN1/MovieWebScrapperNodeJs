const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');


app.use(bodyParser.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Routing
app.get('/', (req, res) => {
    res.send("Welcome to the movie listing app <br/> <br/> Please click <a href='/search'> here </a> to enter the search page <br/> <br/> Please click <a href='/movies'> here </a> to enter the movies page")
})
app.get('/search', (req, res) => {
    res.render('search')
})

app.get('/movies', (req, res) => {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=19de86fce1eb3786a8abce677aa81a21&query='+query, (error, response, body) => {
        if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query})
    })
    
})


app.listen(3000, () => {
    console.log('Server Started at port 3000')
})