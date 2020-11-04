const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const notesBackground = new Image();
notesBackground.src = "../images/background.jpg";

const hitNotes = new Image();
hitNotes.src = "";

const audioMusic = new Audio();
audioMusic.src = "../sounds/FISHER BEST SONGS MIX 2019  025 SRK (1).mp3";
audioMusic.volume = 1;

const imgButton = new Image()
imgButton.src = "../images/YdBO.gif"

class Component {
  constructor(x, y, width, height, speed, collor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.collor = collor;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

    hit(notes) {
    const condition = !(
      this.bottom() < notes.top() ||
      this.top() > notes.bottom() ||
      this.right() < notes.left() ||
      this.left() > notes.right()
    );

    return condition;
  }
}
class Note extends Component {
  move() {
    this.y += this.speed;
    
    
  }

  draw() {
    
    ctx.fillStyle = this.collor
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
  }
}

class Game {
  constructor(background, green, red, yellow, blue) {
    this.green = green;
    this.red = red;
    this.yellow = yellow;
    this.blue = blue;
    this.background = background;
    this.animationId;
    this.frames = 0;
    this.score = 0;
    this.notes = [];
    this.rowCollors = ["green","red", "yellow","blue"]
    this.rowNotes = [125, 250, 375, 500]; 
  }
  
  checkPick () {
    const crashedGreen = this.notes.some((notes) => {
      return this.green.hitNotes(notes);
    });
    const crashedRed = this.notes.some((notes) => {
      return this.red.hitNotes(notes);
    });
    const crashedYellow = this.notes.some((notes) => {
      return this.yellow.hitNotes(notes);
    });
    const crashedBlue = this.notes.some((notes) => {
      return this.blue.hitNotes(notes);
    });
  
    if (crashedGreen) {
      this.green.notePlayed = true
      console.log("green")
      
    }else {
      this.green.notePlayed = false
    }
  if (crashedRed) {
    this.red.notePlayed = true
    
  } else {
    this.red.notePlayed = false
  }
  if (crashedYellow) {
    this.yellow.notePlayed = true
    
  }else {
    this.yellow.notePlayed = false
  }
  if (crashedBlue) {
    this.blue.notePlayed = true
    
  }else {
    this.blue.notePlayed = false
  }
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.background.move();
    this.background.draw();
    this.green.draw();
    this.red.draw();
    this.yellow.draw();
    this.blue.draw();

    this.updatenotes();

    this.updateScore(this.score);

    this.animationId = requestAnimationFrame(this.updateGame);

    this.checkPick()
  };
  
  updatenotes = () => {
    this.frames++;

    this.notes.map((notes) => {
      notes.move();
      notes.draw();
    });

    if (this.frames % 60 === 0) {
      let y = 0;

      let minWidth = 50;
      let maxWidth = 100;
      let width = Math.floor(
        Math.random() * (maxWidth - minWidth) + minWidth
      );

      let randomNotes = Math.floor(Math.random()*4);
      let x = this.rowNotes[randomNotes];

      
      
      const notes = new Note(x, y, 80, 15, 8, this.rowCollors[randomNotes]);

      this.notes.push(notes);
    }
  };


  updateScore = document.getElementById("score").onclickq = () =>{
    ctx.font = "25px Arial";
    
    

    ctx.fillText(`Score ${this.score}`, 70, 20);
  };
}

  class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 3;
  }

  move() {
    this.y += this.speed;

    if (this.y >= canvas.height) {
      this.y = 0;
    }
  }

  draw() {
    
    ctx.drawImage(notesBackground, this.x, this.y, this.width, this.height);
    
    if (this.speed >= 0) {
      ctx.drawImage(
        notesBackground,
        this.x,
        this.y - canvas.height,
        this.width,
        this.height
      );
    }ctx.drawImage(hitNotes, 0, canvas.height -80, canvas.width , 22);
  }
}

class NoteBeat extends Component  {
  
  notePlayed = false
  
    
  draw() {
    
    
    ctx.fillStyle = this.collor
    ctx.fillRect(this.x, this.y,this.width,this.height);
   
  }


}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    audioMusic.play();
    document.getElementById("start-button").style.backgroundImage ="url('../images/equalizer.gif"
    document.getElementById("background2").style.backgroundSize ="url('../images/YdBO.gif"
  };

  function startGame() {
    const game = new Game(
      new Background(10, 0, canvas.width, canvas.height),
      new NoteBeat(125, canvas.height - 80,50, 15, 0,"green"),
      new NoteBeat(250, canvas.height - 80,50, 15, 0,"red"),
      new NoteBeat(375, canvas.height - 80,50, 15, 0,"yellow"),
      new NoteBeat(500, canvas.height - 80,50, 15, 0,"blue"),
      
    );

    game.updateGame();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { // green button
        
        if (game.green.notePlayed === true) {
          game.score += 60
      }else {
        game.score -= 35

      }

      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") { // green button
        
        if (game.red.notePlayed === true) {
          game.score += 60
      }else {
        game.score -= 35

        }
      }
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { // green button
        
        if (game.yellow.notePlayed === true) {
          game.score += 60
      }else {
        game.score -= 35

        }
      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") { // green button
        
        if (game.blue.notePlayed === true) {
          game.score += 60
      }else {
        game.score -= 35

        }
      }
    })

      



  }
}
