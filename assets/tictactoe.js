const cells=document.querySelectorAll('.cell');
const statusTxt=document.querySelector('#status');
const RestartBtn=document.querySelector('#restart');
let x="<img src='xphoto.png'>";
let o="<img src='redcircale.png'> ";

const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],  
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
rungame();

function rungame(){
  cells.forEach(cell=>cell.addEventListener('click',cellClick));
  RestartBtn.addEventListener('click',restartGame);
  statusTxt.textContent=`${player} Your Turn`;
  running=true;
}

function cellClick(){
  const index=this.dataset.index;
  if(options[index]!="" || !running){
    return;
  }
  updateCell(this,index);
  checkWinner();
}

function updateCell(cell,index){
  options[index]=player;
  cell.innerHTML=currentPlayer;
}

function changePlayer(){
    player=(player=='X') ? "O" :"X";
    currentPlayer=(currentPlayer==x) ? o :x;
    statusTxt.textContent=`${player} Your Turn`;
}

function checkWinner(){
  let isWon=false;
  for(let i=0;i<win.length;i++){
    const condition=win[i]; //[0,1,2]
    const cell1=options[condition[0]]; //x
    const cell2=options[condition[1]]; //''
    const cell3=options[condition[2]]; //''
    if(cell1=="" || cell2=="" || cell3==""){
      continue;
    }
    if(cell1==cell2 && cell2==cell3){
      isWon=true;
      cells[condition[0]].classList.add('win');
      cells[condition[1]].classList.add('win');
      cells[condition[2]].classList.add('win');
    }
  }

  if(isWon){
    statusTxt.textContent=`${player} Won..`;
    running=false;
  }else if(!options.includes("")){
    statusTxt.textContent=`Game Draw..!`;
    running=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
  options=["","","","","","","","",""];
  currentPlayer=x;
  player="X";
  running=true;
  statusTxt.textContent=`${player} Your Turn`;

  cells.forEach(cell=>{
      cell.innerHTML="";
      cell  .classList.remove('win');
  });
}