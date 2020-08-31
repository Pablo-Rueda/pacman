////////////////////
/* Create a Ghosts*/
////////////////////
function ghost(id,speed,loction){
        this.type = "Ghost";
        this.GhostID = id;
        this.speed = speed;
        this.initialLocation = loction;
        this.loction = loction;
        this.moveTo = (dir,lction,playboard) => {
            if(playboard.childNodes[lction + dir].className == "pacmanPosition"){
                document.getElementById("lose").style.display = "block";
                game.playing = 0;
                pacman.loction = -1;

            }else if(playboard.childNodes[lction + dir].className != "ghost" && playboard.childNodes[lction + dir].className != "wall"){
                switch(map[lction]){
                    case 0: // empty
                        playboard.childNodes[lction + dir].className = this.GhostID; 
                        playboard.childNodes[lction].className = "boardCell";
                        this.loction = lction + dir;
                    break
                    case 1: // point
                        playboard.childNodes[lction + dir].className = this.GhostID; 
                        playboard.childNodes[lction].className = "pointsCell";
                        this.loction = lction + dir;
                    break
                    case 3: // ghostlair
                        playboard.childNodes[lction + dir].className = this.GhostID; 
                        playboard.childNodes[lction].className = "ghostLair";
                        this.loction = lction + dir;
                    break
                }
            }
        };
        this.autoMove = () => {
            if(game.playing == 1){
                var playboard = document.getElementById("playBoard");
                let ind = this.loction;
                let moveDirection = Math.floor(Math.random()*4+1);
                switch(moveDirection){
                    case 0: // stop
                    break
                    case 1: // up
                        this.moveTo(-24,ind,playboard);
                    break
                    case 2: // down
                        this.moveTo(24,ind,playboard);
                    break
                    case 3: // left
                    if((ind -1) == 119){
                        this.moveTo(23,ind,playboard);
                    } else{
                        this.moveTo(-1,ind,playboard);
                    }
                break
                case 4: // right
                    if((ind + 1) == 144){
                        this.moveTo(-23,ind,playboard);
                    } else{
                        this.moveTo(1,ind,playboard);
                    }
                break
                }
            }
        };
}
//////////////////
/* Pacman object*/
//////////////////
var pacman = {
    type: "pacman",
    moveDirection: 0,
    loction: 251,
    speed:250,
    autoMove:function(){
        if(game.playing == 1){
            let playboard = document.getElementById("playBoard");
            var ind = pacman.loction;
            switch(pacman.moveDirection){
                case 0: // stop
                break
                case 1: // up
                    pacman.moveTo(-24,ind,playboard);
                break
                case 2: // down
                    pacman.moveTo(24,ind,playboard);
                break
                case 3: // left
                    if((ind -1) == 119){ // border move
                        pacman.moveTo(23,ind,playboard);
                    } else{
                        pacman.moveTo(-1,ind,playboard);
                    }
                break
                case 4: // right
                    if((ind + 1) == 144){ // border move
                        pacman.moveTo(-23,ind,playboard);
                    } else{
                        pacman.moveTo(1,ind,playboard);
                    }
                break
            }
            var countCells = 0;
            for(var i = 0; i < map.length; ++i){
                if(map[i] == 1)
                    countCells++;
            }
            if(countCells == 0){
                document.getElementById("win").style.display = "block";
                game.playing = 0;
                pacman.loction = -1;
            }
        }
    },
    moveTo: function(dir,lction,playboard){
        if( playboard.childNodes[lction + dir].className == "ghost"){
            document.getElementById("lose").style.display = "block";
            game.playing = 0;
            pacman.loction = -1;
        }else{
            if(map[dir + lction] == 0 ){ // empty board cell 
                playboard.childNodes[lction + dir].className = "pacmanPosition";
                playboard.childNodes[lction].className = "boardCell";
                pacman.loction = lction + dir;
            }else if (map[dir + lction] == 1){ // pointcell
                game.points = game.points +10;
                playboard.childNodes[lction + dir].className = "pacmanPosition";
                playboard.childNodes[lction].className = "boardCell";
                map[dir + lction] = 0;
                pacman.loction = lction + dir;
            }else{
                pacman.moveDirection= 0;
            }
        }
    },
    pressKey: function(keyInp){
        keyInp = keyInp || window.event;
        switch(keyInp.keyCode){ // Apply move function bassed on keybord input
            case 38: // up arrow
                pacman.moveDirection = 1;
            break
            case 87: // up  W character
                pacman.moveDirection = 1;
            break
            case 40: //  down arrow
                pacman.moveDirection = 2;
            break
            case 83: // down  S character
                pacman.moveDirection = 2;
            break
            case 37: // left arrow
                pacman.moveDirection = 3;
            break
            case 65: // left A character
                pacman.moveDirection = 3;
            break
            case 39: // right arrow
                pacman.moveDirection = 4;
            break
            case 68: // right with D character
                pacman.moveDirection = 4;
            break
        }
    }
} 
//////////////////////////
/* Create the playboard */
//////////////////////////
var mapCreate = {
    type: "map",
    inputCell: function(cell){
        const newDiv = document.createElement("div"); // create a new div element 
        newDiv.classList.add(cell); // give it the cell class  
        playBoard.appendChild(newDiv);  // add cell to playboard
    },
    createMap: function(){
        for (var i = 0; i < this.mapTemplate.length; i++) {  //input the map
            switch(this.mapTemplate[i]){ // Apply move function bassed on keybord input
                case 0: 
                    this.inputCell("boardCell");
                break
                case 1: 
                    this.inputCell("pointsCell");
                break
                case 2: 
                    this.inputCell("wall"); 
                break
                case 3: 
                    this.inputCell("ghostLair");
                break
                case 4: 
                    this.inputCell("pacmanPosition");
                break
            }
        }
    },

    mapTemplate:   [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,// create the map structure
                    2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2,
                    2,0,2,2,2,1,2,2,1,2,2,2,2,2,1,2,2,1,1,2,2,2,0,2,
                    2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,
                    2,2,2,1,2,1,2,1,2,2,2,3,2,2,2,1,2,1,1,2,1,2,2,2,
                    1,1,1,1,2,1,1,1,2,3,3,3,3,3,2,1,1,1,2,2,1,1,1,1,
                    2,2,2,1,2,1,2,1,2,3,3,3,3,3,2,1,2,1,1,2,1,2,2,2,
                    2,1,1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,2,1,1,1,1,1,2,
                    2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,
                    2,0,2,2,2,1,2,2,1,2,0,2,0,2,1,2,2,1,2,2,2,2,0,2,
                    2,0,0,1,1,1,1,1,1,2,0,0,0,2,1,1,1,1,1,1,1,0,0,2,
                    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
} 
///////////////
/* Game State*/
///////////////
var game = {
    type: "state",
    playing: 0,
    gameOver: 0,
    points:0,
    pointsLeft: 0,
    play: function(){
        this.playing = 1;
        document.getElementById("stop").style.display = "none";
      },
    pause: function(){
        this.playing = 0;
        document.getElementById("stop").style.display = "block";
    },
    reset: function(){
        location.reload();
    },
    displayPoints: function(){
        document.getElementById("points").innerHTML = game.points;
    }
}


////////////////////////
/* Creating setting */
//////////////////////////
mapCreate.createMap(); // create map
var map = mapCreate.mapTemplate;
ghosts =[ // create mobs
    new ghost("ghost",250,131),
    new ghost("ghost",300,132),
    new ghost("ghost",350,153),
    new ghost("ghost",200,157),
]

document.getElementById("playBoard").childNodes[251].className = "pacmanPosition"; // add packman to map
for(var i = 0; i< ghosts.length; i++){ // add ghosts to map
    document.getElementById("playBoard").childNodes[ghosts[i].loction].className = ghosts[i].GhostID;
}

//////////////////////
/* Moving Creatures */
//////////////////////
document.onkeydown = pacman.pressKey;  // Pacman key press 
setInterval(pacman.autoMove, pacman.speed); // move packman
setInterval(game.displayPoints, pacman.speed); // update points 
for(var i = 0; i< ghosts.length; i++){ // Ghosts moves
    setInterval(ghosts[i].autoMove,  ghosts[i].speed);
}

