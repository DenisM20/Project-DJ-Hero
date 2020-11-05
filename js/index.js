const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const notesBackground = new Image();
notesBackground.src = "./images/background.jpg";

const hitNotes = new Image();
hitNotes.src = "";

const audioMusic = new Audio();
audioMusic.src = "./sounds/FISHER BEST SONGS MIX 2019  025 SRK (1).mp3";
audioMusic.volume = 0.05;

const scratch = new Audio();
scratch.src = "./sounds/scratch.mp3";
scratch.volume = 0.5;



const imgButton = new Image()
imgButton.src = "./images/equalizer2.gif"

const greenArrow = new Image ()
greenArrow.src = "./images/arrows/left.png"

const redArrow = new Image ()
redArrow.src = "./images/arrows/up.png"

const yellowArrow = new Image ()
yellowArrow.src = "./images/arrows/down.png"

const blueArrow = new Image ()
blueArrow.src = "./images/arrows/right.png"


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
    if (this.collor === "green") {
      ctx.drawImage(greenArrow, this.x, this.y, this.width, this.height)
    }else if (this.collor === "red") {
      ctx.drawImage(redArrow, this.x, this.y, this.width, this.height)
    }else if (this.collor === "yellow") {
      ctx.drawImage(yellowArrow, this.x, this.y, this.width, this.height)
    }else {this.collor === "blue"
      ctx.drawImage(blueArrow, this.x, this.y, this.width, this.height)

    }
    
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
      return this.green.hit(notes);
    });
    const crashedRed = this.notes.some((notes) => {
      return this.red.hit(notes);
    });
    const crashedYellow = this.notes.some((notes) => {
      return this.yellow.hit(notes);
    });
    const crashedBlue = this.notes.some((notes) => {
      return this.blue.hit(notes);
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

    this.checkGameOver()
    this.checkPick()
  };
  
  updatenotes = () => {
    this.frames++;

    this.notes.map((notes) => {
      notes.move();
      notes.draw();
    });

    if (this.frames % 30 === 0) {
      let y = 0;

      let minWidth = 100;
      let maxWidth = 100;
      let width = Math.floor(
        Math.random() * (maxWidth - minWidth) + minWidth
      );

      let randomNotes = Math.floor(Math.random()*4);
      let x = this.rowNotes[randomNotes];

      
      
      const notes = new Note(x, y, 80, 60, 9, this.rowCollors[randomNotes]);

      this.notes.push(notes);
    }
  };

  checkGameOver =  () => {
    //const crashed = this.obstacles.some((obstacle) => {
      //return this.player.isCrashedWith(obstacle);
    //});

    if (this.score < - 150 ) {
      cancelAnimationFrame(this.animationId);

      scratch.play();
      audioMusic.pause()
      document.getElementById("start-button").style.backgroundImage =""

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "40px Arial";
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.fillText("Tune your finger 😜", canvas.width / 4, 100);
      ctx.fillStyle = "white";
      ctx.fillText(`Your Final Score: ${this.score}`, canvas.width / 5, 400);
    }
  };


  updateScore = (score) => {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white"
    
    

    ctx.fillText(`Score ${this.score}`, 25, 50);
  };
}

  class Background {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 4;
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
    document.getElementById("start-button").style.backgroundImage ="url('./images/equalizer2.gif"
  
  };

  function startGame() {
    const game = new Game(
      new Background(10, 0, canvas.width, canvas.height),
      new NoteBeat(130, canvas.height - 80,50, 20, 0,"green"),
      new NoteBeat(260, canvas.height - 80,50, 20, 0,"red"),
      new NoteBeat(385, canvas.height - 80,50, 20, 0,"yellow"),
      new NoteBeat(500, canvas.height - 80,50, 20, 0,"blue"),
      
    );

    game.updateGame();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { // green button
        
        if (game.green.notePlayed === true) {
          game.score += 35
      }else {
        game.score -= 100

      }

      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") { 
        
        if (game.red.notePlayed === true) {
          game.score += 35
      }else {
        game.score -= 100

        }
      }
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { 
        
        if (game.yellow.notePlayed === true) {
          game.score += 35
      }else {
        game.score -= 100

        }
      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") { 
        
        if (game.blue.notePlayed === true) {
          game.score += 35
      }else {
        game.score -= 100

        }
      }
    })

      



  }
}
