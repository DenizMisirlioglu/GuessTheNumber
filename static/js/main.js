let socket = null;

/*function bora(param) {
  console.log(param);
}

const bora = () => console.log();
const bora2 = (num) => {
  return 'player_' + num + '_message';
}

const arr = [1,2,3,4,5];

for (let i = 0; i < arr.length; i++) {
  callback(arr[i], i, arr);
}

arr.forEach(callback)*/

const app = new Vue({
  el: '#app',
  data: {
    chosenPlayer: null,
    playerGuesses: new Array(3).fill(null).map(() => ({ value: null, error: '', disabled: false })),
    appTitle: 'guess the number!',
    winningMessage: null
  },
  mounted: function () {
    socket = io();
    [1, 2, 3].map(num => 'player_' + num + '_message').forEach((eventName, index) => {
      socket.on(eventName, msg => {
        console.log(eventName, msg, index);
        this.playerGuesses[index] = {
          ...this.playerGuesses[index],
          value: parseInt(msg)
        };
        this.$forceUpdate();
      });
    });

    socket.on('guess_high', msg => {
      console.log('Guess High');
      this.playerGuesses[this.chosenPlayer - 1].error = 'Try a lower number!';
      this.$forceUpdate();
    });

    socket.on('guess_low', msg => {
      console.log('Guess Low');
      this.playerGuesses[this.chosenPlayer - 1].error = 'Try a higher number!';
      this.$forceUpdate();
    });

    socket.on('guess_correct', msg => {
      console.log('Guess Correct');
      this.playerGuesses[this.chosenPlayer - 1].error = 'Yeyyyy!';
      this.$forceUpdate();
      confettiAnimation();
    });

    socket.on('game_finished', playerWhoWon => {
      this.playerGuesses.forEach(guess => guess.disabled = true);
      this.winningMessage = 'Player ' + playerWhoWon + ' won!';
      this.$forceUpdate();
    })

  },
  methods: {
    playerSubmit(player, event) {
      event.preventDefault();
      if (!this.chosenPlayer) {
        this.chosenPlayer = player;
        this.playerGuesses.forEach((guess, index) => {
          guess.disabled = index !== player - 1;
        });
        this.$forceUpdate();
      }
      socket.emit('player_' + player + '_message', this.playerGuesses[player - 1].value);
      console.log(event, player);
    }
  }
});

function confettiAnimation() {
  var confettiSettings = {
    target: 'confetti-canvas'
  };
  var confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}
