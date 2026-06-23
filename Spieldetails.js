

function main(){

   let id = localStorage.getItem("current_game_id");

   let matches = JSON.parse(localStorage.getItem("matches"));

   let currentMatch = matches.data[id];

   let wrapper = document.getElementsByClassName("body-wrapper");

   console.log(currentMatch);

   wrapper.innerHTML += `

   `


}

main();