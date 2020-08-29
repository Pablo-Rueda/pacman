
/* Ghost object*/


/* Pacman object*/

var pacman = {
    type: "pacman",
    moveDirection: 0,
    speed:500,
    autoMove:function(){
        var playboard = document.getElementById("playBoard");
        var ind = map.indexOf(4);
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
                if(ind -1 == 119){
                    playboard.childNodes[143].className = "pacmanPosition"; 
                    map[143] = 4; // change map location of pacman
                    playboard.childNodes[ind].className = "boardCell";
                    map[ind] = 0;     // remove the empty cell pacman
                } else{
                pacman.moveTo(-1,ind,playboard);
                }
            break
            case 4: // right
                console.log("moveDirection");
                if(ind + 1 == 144){
                    playboard.childNodes[120].className = "pacmanPosition"; 
                    map[120] = 4; // change map location of pacman
                    playboard.childNodes[ind].className = "boardCell";
                    map[ind] = 0;     // remove the empty cell pacman
                } else{
                    pacman.moveTo(1,ind,playboard);
                }
            break
        } 
    },
    moveTo: function(dir,lction,playboard){
        if(map[dir + lction] == 1){ // wall there
           // this.moveDirection = 0;
        }else if (map[dir + lction] == 2){ // ghost lair there
          //  this.moveDirection = 0;
        }else if (map[dir + lction] == 3){ // ghost there
          //  let somethingToHappen;
        }else if (map[dir + lction] == 4){ // pacman there
          //  let somethingToHappen;
        }else{
            playboard.childNodes[lction + dir].className = "pacmanPosition"; 
            map[lction+dir] = 4; // change map location of pacman
            playboard.childNodes[lction].className = "boardCell";
            map[lction] = 0;     // remove the empty cell pacman
        }
    },
    pressKey: function(keyInp){
        keyInp = keyInp || window.event;;
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
                    this.inputCell("pointsCell");
                break
                case 1: 
                    this.inputCell("wall");
                break
                case 2: 
                    this.inputCell("ghostLair");
                break
                case 3: 
                    this.inputCell("ghost");
                break
                case 4: 
                    this.inputCell("pacmanPosition");
                break
            }
        }
    },

    mapTemplate:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,// create the map structure 
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                    1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,0,1,1,1,0,1,
                    1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,
                    1,1,1,0,1,0,1,0,1,1,1,2,1,1,1,0,1,0,0,1,0,1,1,1,
                    0,0,0,0,1,0,0,0,1,2,2,2,2,2,1,0,0,0,1,1,0,0,0,0,
                    1,1,1,0,1,0,1,0,1,2,2,2,2,2,1,0,1,0,0,1,0,1,1,1,
                    1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,
                    1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,
                    1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,1,1,1,0,1,
                    1,0,0,0,0,0,0,0,0,1,0,4,0,1,0,0,0,0,0,0,0,0,0,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
} 

/* Commands*/
map.createMap();
document.onkeydown = pacman.pressKey;   /* Pacman moves */

setInterval(pacman.autoMove, pacman.speed);


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

