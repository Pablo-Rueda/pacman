document.body.onload = createMap(); /* Call the playboard*/

document.onkeydown = checkKey;




/* Move Packman*/
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
    /* Apply move function bassed on keybord input*/
    if (keyInp.keyCode == '38') {// up arrow
        console.log("up");
        moveTo(-24);
    }else if (keyInp.keyCode == '40') { // down arrow
        moveTo(24);
    }else if (keyInp.keyCode == '37') {// left arrow
        moveTo(-1);
    }else if (keyInp.keyCode == '39') {// right arrow
        moveTo(1);
    }
}

/* Create the playboard*/
function createMap () { 
    function inputCell(cell){
        const newDiv = document.createElement("div"); // create a new div element 
        newDiv.classList.add(cell); // give it the cell class  
        playBoard.appendChild(newDiv);  // add cell to playboard
    }
var mapTemplate =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,// create the structure 
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                    1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,0,1,1,1,0,1,
                    1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,
                    1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,1,1,
                    2,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,2,
                    1,1,1,0,1,0,1,0,1,0,3,3,3,0,1,0,1,0,0,1,0,1,1,1,
                    1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,
                    1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,
                    1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1,1,1,1,0,1,
                    1,0,0,0,0,0,0,0,0,1,0,4,0,1,0,0,0,0,0,0,0,0,0,1,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    window.map = mapTemplate;
    for (var i = 0; i < mapTemplate.length; i++) {  //input the map
        console.log(mapTemplate[i]);
        if(mapTemplate[i] === 0){
            inputCell("pointsCell");
        }else if(mapTemplate[i] === 1){
            inputCell("wall");
        }else if(mapTemplate[i] === 2){
            inputCell("exit");
        }else if(mapTemplate[i] === 3){
            inputCell("ghost");
        }else{
            inputCell("packman");
        }
    }
}
