document.body.onload = newDiv(); /* Call the playboard*/



/* Create the playboard*/
function newDiv () { 
    function inputCell(cell){
        const newDiv = document.createElement("div"); // create a new div element 
        newDiv.classList.add(cell); // give it the cell class  
        playBoard.appendChild(newDiv);  // add cell to playboard
    }
                
let map =  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,// create the structure 
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
                

    for (var i = 0; i < map.length; i++) {  //input the map
        console.log(map[i]);
        if(map[i] === 0){
            inputCell("boardCell");
        }else if(map[i] === 1){
            inputCell("wall");
        }else if(map[i] === 2){
            inputCell("exit");
        }else if(map[i] === 3){
            inputCell("ghost");
        }else{
            inputCell("packman");
        }
    }
  }
