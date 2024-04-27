function Player(name){
let score=0;
const getScore=()=>score;
const incrementScore=()=>score++;
return{name, getScore , incrementScore};
}