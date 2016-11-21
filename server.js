const express = require('express'),
      moment = require('moment'),
      app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var host = req.hostname;
  console.log('Host:', host);
  res.render('index', {host: host});
});

app.get('/:timestamp', (req, res) => {
  var timestamp = req.params.timestamp;
  var dateObj = {
    unix: null,
    natural: null
  };
  if (moment(timestamp, 'X', true).isValid()) {
    var natural = moment(timestamp, 'X', true).format('MMMM D, YYYY');
    dateObj = {
      unix: parseInt(timestamp, 10),
      natural
    };
  } else if (moment(timestamp, 'MMMM D, YYYY', true).isValid()){
    var unix = moment(timestamp, 'MMMM D, YYYY', true).format('X');

    dateObj = {
      unix: parseInt(unix, 10),
      natural: timestamp
    };
  }

  res.json(dateObj);
});

app.listen(port, () => console.log('App listen on port', port));
