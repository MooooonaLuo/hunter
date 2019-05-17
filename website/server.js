const express = require('express');
const app = express();

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('youtuber.db');

app.get('/youtuber', (req, res) => {
  db.all('SELECT title FROM youtuber_data', (err, rows) =>{
    console.log(rows);
    const allYoutuber = rows.map(e => e.title);
    console.log(allYoutuber);
    res.send(allYoutuber);
  });
});

app.get('/youtuber/:youtuberid', (req, res) => {
  const nameToLookup = req.params.youtuberid; // matches ':userid' above
  db.all(
    'SELECT * FROM youtuber_data WHERE title = $title',
    {
      $title: nameToLookup
    },
    (err, rows) => {
      console.log(rows);
      if(rows.length > 0){
        res.send(rows[0]);
      }
      else {
        res.send({});
      }
    }
  );

});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
