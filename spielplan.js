

async function getData() {

   const matches = localStorage.getItem("matches");

   if(matches){
      try{
         const data = JSON.parse(matches);
         return data;
      }
      catch{
         return null;
      }
   }else {
      try {
         const response = await fetch(
            "https://api.zafronix.com/fifa/worldcup/v1/matches?year=2026",
            {
            headers: {
               "X-API-Key": "zwc_free_2af917931ea3e6ce42e9dce8"
            }
            }
         );

         console.log("Status:", response.status);

         const text = await response.text(); 
         console.log("Raw response:", text);

         if (!text) {
            throw new Error("Empty response from server");
         }

         const data = JSON.parse(text); 
         console.log(data);

         localStorage.setItem("matches", JSON.stringify(data))

         return data;

      } catch (error) {
         console.error("Error:", error);
         return null
      }
   }
}

function createSpielÜbersicht(match){
   return `
   <div class="game-overview">

         <h2 class="team-name game-team-home">${match.homeTeam}</h2>
         <h2 class="team-name game-team-away">${match.awayTeam}</h2>
         
         <img class="flag game-team-home" src="flags/${match.homeTeam}.svg" alt="${match.homeTeam}-flagge">
         <img class="flag game-team-away" src="flags/${match.awayTeam}.svg" alt="${match.awayTeam}-flagge">

         <p class="game-standing"> -:- </p>

         <div class="game-kickoff"> 
            <time class="game-date">13.03.2026</time>

            <time class="game-time">10:30</time>
         </div>
         

      </div>
   `
}

const divider = `<div class="divider"></div>`

function createGroup(group, main){


   const groupElement = document.createElement("div");
   groupElement.classList.add("group")

   const groups = {
      group_a: "Gruppe A",
      group_b: "Gruppe B",
      group_c: "Gruppe C",
      group_d: "Gruppe D",
      group_e: "Gruppe E",
      group_f: "Gruppe F",
      group_g: "Gruppe G",
      group_h: "Gruppe H",
      group_i: "Gruppe I",
      group_j: "Gruppe J",
      group_k: "Gruppe K",
      group_l: "Gruppe L"
   }

   let groupTitle = groups[group[0].stage] || "Gruppe nicht Gefunden";

   groupElement.innerHTML += `
      <h1 class="group-title" >${groupTitle}</h1>
   `
   
   group.forEach((match,index) => {
      groupElement.innerHTML += createSpielÜbersicht(match);

      if(index !== group.length -1){
         groupElement.innerHTML += divider;
      }
   });

      main.appendChild(groupElement);
}

async function main() {
   const data = await getData();
   let groupA = data.data.filter(match => match.stage === "group_a");
   let groupB = data.data.filter(match => match.stage === "group_b");
   let groupC = data.data.filter(match => match.stage === "group_c"); 
   let groupD = data.data.filter(match => match.stage === "group_d"); 
   let groupE = data.data.filter(match => match.stage === "group_e"); 
   let groupF = data.data.filter(match => match.stage === "group_f"); 
   let groupG = data.data.filter(match => match.stage === "group_g"); 
   let groupH = data.data.filter(match => match.stage === "group_h"); 
   let groupI = data.data.filter(match => match.stage === "group_i"); 
   let groupJ = data.data.filter(match => match.stage === "group_j"); 
   let groupK = data.data.filter(match => match.stage === "group_k"); 
   let groupL = data.data.filter(match => match.stage === "group_l"); 
   

   const main = document.getElementById("main");

   if(groupA){
      createGroup(groupA,main);
   }
   if(groupB){
      createGroup(groupB,main)
   }
   if(groupC){
      createGroup(groupC,main)
   }
   if(groupD){
      createGroup(groupD,main)
   }
   if(groupE){
      createGroup(groupE,main)
   }
   if(groupF){
      createGroup(groupF,main)
   }
   if(groupG){
      createGroup(groupG,main)
   }
   if(groupH){
      createGroup(groupH,main)
   }
   if(groupI){
      createGroup(groupI,main)
   }
   if(groupJ){
      createGroup(groupJ,main)
   }
   if(groupK){
      createGroup(groupK,main)
   }
   if(groupL){
      createGroup(groupL,main)
   }

   console.log(groupA);
}

main();