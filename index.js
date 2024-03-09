import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;

  if (!dateString) {
    dateString = new Date();
  } else if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    return res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
