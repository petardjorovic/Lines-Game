let container = document.querySelector('.container');
let ballColors = [
    "red","green","blue","yellow","indianred","skyblue","gray"
];
let selected = "ball";
let twoClicks = [];
let found = false;

makeGrid()
let boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.addEventListener('click', selectBall))
makeBalls(10);

function selectBall(){
    
    if(selected === "ball"){
        // from
        if(this.innerHTML !== ""){
            selected = "null";
            twoClicks[0] = this;
            twoClicks[0].querySelector('.ball').classList.add('pulse');
        }else{
            alert("Selection must be ball")
        }
    }else{
        // to
        if(this.innerHTML === ""){
            selected = "ball";
            twoClicks[1] = this;
            this.classList.add('newPos');
            findAllPosiblePaths(twoClicks[0])
            twoClicks[0].querySelector('.ball').classList.remove('pulse');
        }else{
            alert("There is a ball inside")
        }

        if(twoClicks.length === 2 && found){
            twoClicks[1].innerHTML = twoClicks[0].innerHTML;
            twoClicks[0].innerHTML = "";
            twoClicks.length = 0;
            resetAll()
            makeBalls(3)
            checkWinnings()
        }else{
            alert("There is no free path")
            resetAll()
        }
    }
    
}

function checkWinnings(){
    let lines = [
        [1,2,3,4],
        [-1,-2,-3,-4],
        [10,20,30,40],
        [-10,-20,-30,-40],
        [11,22,33,44],
        [-11,-22,-33,-44],
        [9,18,27,36],
        [-9,-18,-27,-36]
    ];
    boxes.forEach(box => {
        let boxId = parseInt(box.id);
        let boxInner = box.innerHTML;
        lines.forEach(line => {
            let boxOne = boxes[boxId + line[0]];
            let boxTwo = boxes[boxId + line[1]];
            let boxThree = boxes[boxId + line[2]];
            let boxFour = boxes[boxId + line[3]];

            if(boxOne && boxTwo && boxThree && boxFour && boxInner === boxOne.innerHTML &&
                 boxInner === boxTwo.innerHTML && boxInner === boxThree.innerHTML &&
                  boxInner === boxFour.innerHTML && boxInner !== ""){
                    // box.style.background = "red";
                    // boxOne.style.background = "red";
                    // boxTwo.style.background = "red";
                    // boxThree.style.background = "red";
                    // boxFour.style.background = "red";
                    setTimeout(()=>{
                        // box.innerHTML = "";
                        // boxOne.innerHTML = "";
                        // boxTwo.innerHTML = "";
                        // boxThree.innerHTML = "";
                        // boxFour.innerHTML = "";

                        box.style.background = "rgba(255, 166, 0, 0.8)";
                        boxOne.style.background = "rgba(255, 166, 0, 0.8)";
                        boxTwo.style.background = "rgba(255, 166, 0, 0.8)";
                        boxThree.style.background = "rgba(255, 166, 0, 0.8)";
                        boxFour.style.background = "rgba(255, 166, 0, 0.8)";
                    },200)
                    setTimeout(()=>{
                        box.innerHTML = "";
                        boxOne.innerHTML = "";
                        boxTwo.innerHTML = "";
                        boxThree.innerHTML = "";
                        boxFour.innerHTML = "";

                        box.style.background = "";
                        boxOne.style.background = "";
                        boxTwo.style.background = "";
                        boxThree.style.background = "";
                        boxFour.style.background = "";
                    },1000)
                  }
        })
    })
}

function resetAll(){
    found = false;
    boxes.forEach(box => {
        box.style.background = "";
        box.classList.remove('newPos');
        box.removeAttribute('data-id');
    })
}


function findAllPosiblePaths(selected){
    selected.setAttribute("data-id","parent");
    let boxId = parseInt(selected.id);
    let leftDiv = boxes[boxId-1];
    let rightDiv = boxes[boxId+1];
    let topDiv = boxes[boxId-10];
    let bottomDiv = boxes[boxId+10];

    let posiblePaths = [];
    // left
    if(boxId % 10 !== 0 && leftDiv.innerHTML === "" && leftDiv.getAttribute('data-id') !== "parent"){
        posiblePaths.push(leftDiv);
    }
    // right
    if(boxId % 10 !== 9 && rightDiv.innerHTML === "" && rightDiv.getAttribute('data-id') !== "parent"){
        posiblePaths.push(rightDiv);
    }
    // top
    if(topDiv && topDiv.innerHTML === "" && topDiv.getAttribute('data-id') !== "parent"){
        posiblePaths.push(topDiv);
    }
    // bottom
    if(bottomDiv && bottomDiv.innerHTML === "" && bottomDiv.getAttribute('data-id') !== "parent"){
        posiblePaths.push(bottomDiv);
    }

    posiblePaths.forEach(box => {
        if (!box.classList.contains('newPos')) {
            findAllPosiblePaths(box)
        }else{
            found = true;
        }
    })
}


function makeBalls(ballNumber){
    let rand = Math.floor(Math.random()*boxes.length);
    let rand2 = Math.floor(Math.random()*ballColors.length);
    let randColor = ballColors[rand2];
    let randBox = boxes[rand];
    if(randBox.innerHTML === ""){
        randBox.innerHTML = `<div class="ball" style="background : ${randColor};"></div>`;
        ballNumber--;
    }
    (ballNumber === 0) ? null : makeBalls(ballNumber);
}

function makeGrid(){
    let text = "";
    for (let i = 0; i < 100; i++) {
        text += `
            <div class="box" id="${i}"></div>
        `.trim(); 
    }
    container.innerHTML = text;
}