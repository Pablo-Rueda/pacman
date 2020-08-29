
/* Create a Ghosts*/
function ghost(id,speed,loction){
        this.type = "Ghost";
        this.GhostID = id;
        this.speed = speed;
        this.loction = loction;
        this.moveTo = (dir,lction,playboard) => {
            if(playboard.childNodes[lction + dir].className != "ghost"){
                if(map[dir + lction] == 0 ){ // empty board cell 
                    playboard.childNodes[lction + dir].className = this.GhostID; 
                    playboard.childNodes[lction].className = "boardCell";
                    this.loction = lction + dir;  
                }else if (map[dir + lction] == 1){ // pointcell
                    playboard.childNodes[lction + dir].className = this.GhostID; 
                    playboard.childNodes[lction].className = "pointsCell";
                    this.loction = lction + dir;
                }else if(map[dir + lction] == 3){
                    playboard.childNodes[lction + dir].className = this.GhostID; 
                    playboard.childNodes[lction].className = "ghostLair";
                    this.loction = lction + dir;
                }else{
                    this.autoMove();
                }
            }
        };
        this.autoMove = () => {
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
        };
    }

/* Pacman object*/

var pacman = {
    type: "pacman",
    moveDirection: 0,
    loction: 251,
    speed:500,
    autoMove:function(){
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
                if((ind -1) == 119){
                    console.log(ind - 1)
                    pacman.moveTo(23,ind,playboard);
                } else{
                    pacman.moveTo(-1,ind,playboard);
                }
            break
            case 4: // right
                if((ind + 1) == 144){
                    console.log(ind + 1)
                    pacman.moveTo(-23,ind,playboard);
                } else{
                    pacman.moveTo(1,ind,playboard);
                }
            break
        } 
    },
    moveTo: function(dir,lction,playboard){
        if(map[dir + lction] == 0 ){ // empty board cell 
            playboard.childNodes[lction + dir].className = "pacmanPosition";
            playboard.childNodes[lction].className = "boardCell";
            pacman.loction = lction + dir;
        }else if (map[dir + lction] == 1){ // pointcell
            playboard.childNodes[lction + dir].className = "pacmanPosition";
            playboard.childNodes[lction].className = "boardCell";
            pacman.loction = lction + dir;
        }else{
            pacman.moveDirection= 0;
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

/* Create the playboard */
var map = {
    type: "map",
    inputCell: function(cell){
        const newDiv = document.createElement("div"); // create a new div element 
        newDiv.classList.add(cell); // give it the cell class  
        playBoard.appendChild(newDiv);  // add cell to playboard
    },
    createMap: function(){
        window.map = this.mapTemplate;
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




/* Creating setting */
map.createMap(); // create map
ghosts =[ // create mobs
    new ghost("ghost",500,131),
    new ghost("ghost",450,132),
    new ghost("ghost",300,153),
    new ghost("ghost",250,157),
]

document.getElementById("playBoard").childNodes[251].className = "pacmanPosition"; // add packman to map
for(var i = 0; i< ghosts.length; i++){ // add ghosts to map
    document.getElementById("playBoard").childNodes[ghosts[i].loction].className = ghosts[i].GhostID;
}

/* Movement */
document.onkeydown = pacman.pressKey;  // Pacman moves 
setInterval(pacman.autoMove, pacman.speed);

for(var i = 0; i< ghosts.length; i++){ // Ghosts moves
    setInterval(ghosts[i].autoMove,  ghosts[i].speed);
}










    

/*  Move Overlay
function checkKey(keyInp) {
    keyInp = keyInp || window.event;
    var playboard = document.getElementById("playBoard");
    var ind = map.indexOf(4);

    function moveTo(direction) {  // function to move packman to another cell
        if(map[ind+direction] == 1){
            let stop = 1;
        } else {
            playboard.childNodes[ind + direction].className = "packman";
            map[ind+direction] = 4;
            playboard.childNodes[ind].className = "boardCell";
            map[ind] = 0;
        }
    }
    if (keyInp.keyCode == '38') {// Apply move function bassed on keybord input
        let packman = document.getElementsByClassName("packman");
        let dir = packman[0].offsetTop;
        console.log()
        let newDir = dir - 5;
        packman[0].style.top = newDir.toString().concat("px");
    }else if (keyInp.keyCode == '40') { // down arrow
        let packman = document.getElementsByClassName("packman");
        let dir = packman[0].offsetTop;
        let newDir = dir + 5;
        packman[0].style.top = newDir.toString().concat("px");
        console.log(newDir)
    }else if (keyInp.keyCode == '37') {// left arrow
        let packman = document.getElementsByClassName("packman");
        let dir = packman[0].offsetLeft;
        let newDir = dir - 5;
        packman[0].style.left = newDir.toString().concat("px");
        console.log(newDir)
    }else if (keyInp.keyCode == '39') {// right arrow
        let packman = document.getElementsByClassName("packman");
        let dir = packman[0].offsetLeft;
        let newDir = dir + 5;
        packman[0].style.left = newDir.toString().concat("px");
    }
}


*/

