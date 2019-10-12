const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let correctNumber = Math.floor(Math.random() * 100) + 1;

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', socket => {
  for (let i = 0; i < 3; i++) {
    const eventName = 'player_' + (i+1) + '_message';
    socket.on(eventName, msg => {
      //console.log(eventName, msg);
      const guess = parseInt(msg);
      
      if (guess > correctNumber) {
        socket.emit('guess_high', guess);
      } else if (guess < correctNumber) {
        socket.emit('guess_low', guess);
      } else {
        const playerWhoWon = i + 1;
        socket.emit('guess_correct');
        socket.broadcast.emit('game_finished', playerWhoWon);
        correctNumber = Math.floor(Math.random() * 100) + 1;
      }
      
      socket.broadcast.emit(eventName, guess);
    });
  }
});

http.listen(3000, () => console.log("Listening on *:3000", correctNumber));
