// Artem friend

// html file
{/* <div id="output"></div>
<button id="add-element">Add</button> */}

// css file
// body {
//     font-family: monospace;
//     font-size: 20px;
//   }
  
//   #output {
//     word-break: break-word;
//     color: #999;
//   }
  
//   #output span {
//     background-color: rgba(255, 241, 94, 0.1);
//   }

// js

const MAX_LENGTH = 100
const FRAME_RATE = 16

class Game {
	constructor () {
  	this.list = Array.from({ length: MAX_LENGTH }, x => 0)
    
    this.elements = []
    
    this.init()
  }
  
  init () {
  	this.output = document.getElementById('output')
    this.button = document.getElementById('add-element')
    
    this.button.addEventListener('click', this.addElement.bind(this))
    
    this.render()
  }
  
  addElement () {
  	const shouldStart = this.elements.length === 0
    
    if (this.elements.length > 25) {
    	return
    }
    
    this.elements = [...this.elements, {
    	id: Date.now(),
    	position: 0,
      step: 1,
      color: `#${((1<<24)*Math.random()|0).toString(16)}`
    }]
    
    shouldStart && this.startAnimation()
  }
  
  startAnimation () {
    this.render()
    
  	setInterval(() => {
    	this.elements.forEach(e => {
      	const reachedTheEnd = e.step > 0 && e.position + 1 === MAX_LENGTH
        const reachedTheStart = e.step < 0 && e.position === 0
        
        let collapse = false
        
        this.elements.forEach(el => {
        	if (e.id === el.id) return
          if (e.step === el.step) return
          
        	if (
          	e.position + e.step === el.position ||
            e.position + e.step === el.position + el.step
          ) {
          	e.step = -e.step
          	el.step = -el.step
            
            collapse = true
          }
        })
        
        if (!collapse && reachedTheEnd || reachedTheStart) {
        	e.step = -e.step
        }
        
        e.position += e.step
      })
      
      this.render()
    }, 1000 / FRAME_RATE)
  }
  
  render () {
  	const resultList = [...this.list]

    this.elements.forEach(e => {
    	resultList[e.position] = `<span style="color: ${e.color}">1</span>`
    })
    
  	this.output.innerHTML = resultList.join('')
  }
}

new Game()

// -------------------------------------------------------------------------------

// Andriy
let output = document.querySelector("#output");
const addElementBtn = document.querySelector("#add-element");

let arr = [];

for (let i = 0; i<100; i++){
    arr.push("0");
}

output.textContent = arr.join("");

let arrObj = [];

addElementBtn.addEventListener("click",buttonHandler);

function buttonHandler(event){
    if (arrObj.length===100) return;
    arrObj.push(new elementOne());
}

class elementOne {

    constructor(){
        this.index = 0;
        this.isMoveForward = true;
        this.value = "1";
    }

    move(){
        if (this.isMoveForward){
            if(arr[this.index+1] === "1" || this.index+1 === arr.length){
                this.isMoveForward = false;
                if (arr[this.index-1] === "1" || this.index === 0) return;
            }
        } else if(arr[this.index-1] === "1" || this.index === 0){
                this.isMoveForward = true;
                if (arr[this.index+1] === "1" || this.index+1 === arr.length) return;
        }
        if(this.isMoveForward){
            arr.splice(this.index+1,1,this.value);
            arr.splice(this.index,1,"0");
            this.index++;
        } else {
            arr.splice(this.index-1,1,this.value);
            arr.splice(this.index,1,"0");
            this.index--;
        }
    }
}

let oneID = setInterval(oneIteration,500);

function oneIteration (){
    arrObj.map(el=>el.move());
    output.textContent = arr.join("");
}

// Nazar -------------------------------------------------------------------------------

way = new Array();
for (var i = 0; i < 102; i++) {
  way[i] = new Mover(i);
}

function init() {
  way[0].body = "|";
  way[101].body = "|";
  way[0].direction = "forward";
  way[101].direction = "back";
}

init();

function start(id, array) {
  document.getElementById(id).innerHTML = showWay(array);
}

function showWay(array) {
  var wayString = "";
  for (x in array) {
    wayString += array[x].body;
  }
  return wayString;
}

function stop(array) {
  for (var i = 0; i < array.length; i++) {
    clearTimeout(array[i].timer);
  }
}

function add(id, array) {
  array[1].move(id);
}

function Mover(position) {
  this.body = 0;
  this.position = position;
  this.direction = undefined;
  this.move = function(id) {
    this.direction = "forward";
    this.body = 1;
    go(id, this.position, this.direction, way, 1, 1);
  };
}

function go(id, position, direction, array, bodyForward, bodyBack) {
  var pos = position;
  var temporary;
  start(id, array);
  if (direction == "forward") {
    if (array[position + 1].direction) {
      array[position].direction = "back";
      array[position].body = bodyBack;
    } else {
      temporary = array[position + 1];
      array[position + 1] = array[position];
      pos = position + 1;
      array[position + 1].position = pos;
      array[position] = temporary;
      array[position].position = position;
    }
  } else {
    if (array[position - 1].direction) {
      array[position].direction = "forward";
      array[position].body = bodyForward;
    } else {
      temporary = array[position - 1];
      array[position - 1] = array[position];
      pos = position - 1;
      array[position - 1].position = pos;
      array[position] = temporary;
      array[position].position = position;
    }
  }
  array[pos].timer = setTimeout(
    go,
    50,
    id,
    array[pos].position,
    array[pos].direction,
    array,
    bodyForward,
    bodyBack
  );
}