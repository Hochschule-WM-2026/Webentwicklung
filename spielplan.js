

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

   let homeScore = match.homeScore != null ? match.homeScore : "-";
   let awayScore = match.homeScore != null ? match.awayScore : "-";

   let homeFlag = match.homeTeam != null ? match.homeTeam : "placeholder";
   let awayFlag = match.awayTeam != null ? match.awayTeam : "placeholder";


   return `
   <div class="game-overview" id="${match.matchNo-1}">

         <h2 class="team-name game-team-home">${match.homeRef}</h2>
         <h2 class="team-name game-team-away">${match.awayRef}</h2>
         
         <img class="flag game-team-home" src="flags/${homeFlag}.svg" alt="${homeFlag}-flagge">
         <img class="flag game-team-away" src="flags/${awayFlag}.svg" alt="${awayFlag}-flagge">

         <p class="game-standing"> ${homeScore}:${awayScore} </p>

         <div class="game-kickoff"> 
            <time class="game-date">${match.date}</time>

            <time class="game-time">${match.kickoff}</time>
         </div>
         
      </div>
   `
}

const divider = `<div class="divider"></div>`

function createGroup(group, groups, main){

   var groupMatches = [];

   console.log(groups);
   console.log(group);

   switch (group) {
      case "group-a": groupMatches = groups["groupA"]; break;
      case "group-b": groupMatches = groups["groupB"]; break;
      case "group-c": groupMatches = groups["groupC"]; break;
      case "group-d": groupMatches = groups["groupD"]; break;
      case "group-e": groupMatches = groups["groupE"]; break;
      case "group-f": groupMatches = groups["groupF"]; break;
      case "group-g": groupMatches = groups["groupG"]; break;
      case "group-h": groupMatches = groups["groupH"]; break;
      case "group-i": groupMatches = groups["groupI"]; break;
      case "group-j": groupMatches = groups["groupJ"]; break;
      case "group-k": groupMatches = groups["groupK"]; break;
      case "group-l": groupMatches = groups["groupL"]; break;
      case "round-of-32": groupMatches = groups["roundOf32"]; break;
      case "round-of-16": groupMatches = groups["roundOf16"]; break;
      case "quatar-finale": groupMatches = groups["quaterFinale"]; break;
      case "semi-finale": groupMatches = groups["semiFinale"]; break;
      case "final": groupMatches = groups["final"]; break;
      default: console.log("not found"); break;
   }

   const groupElement = document.createElement("div");
   groupElement.classList.add("group")

   console.log(groupMatches);
   
   groupMatches.forEach((match,index) => {
      groupElement.innerHTML += createSpielÜbersicht(match);

      if(index !== group.length -2){
         groupElement.innerHTML += divider;
      }
   });


      main.appendChild(groupElement);
      
      Array.from(document.getElementsByClassName("game-overview"))
      .forEach((e)=> {e.addEventListener("click", () => viewDetails(e.id))})

   return groupElement;
}

function changeGroup(name,currentGroup, groups, main){
   currentGroup.remove();
   currentGroup = createGroup(name,groups,main);

   return currentGroup;
}

function viewDetails(id){
   localStorage.setItem("current_game_id", id);
   location.href = "Spieldetails.html";
}

async function main() {

   const data = await getData()
   const groupA = data.data.filter(match => match.stage === "group_a");
   const groupB = data.data.filter(match => match.stage === "group_b");
   const groupC = data.data.filter(match => match.stage === "group_c"); 
   const groupD = data.data.filter(match => match.stage === "group_d"); 
   const groupE = data.data.filter(match => match.stage === "group_e"); 
   const groupF = data.data.filter(match => match.stage === "group_f"); 
   const groupG = data.data.filter(match => match.stage === "group_g"); 
   const groupH = data.data.filter(match => match.stage === "group_h"); 
   const groupI = data.data.filter(match => match.stage === "group_i"); 
   const groupJ = data.data.filter(match => match.stage === "group_j"); 
   const groupK = data.data.filter(match => match.stage === "group_k"); 
   const groupL = data.data.filter(match => match.stage === "group_l"); 
   const roundOf32 = data.data.filter(match => match.stage === "r32");
   const roundOf16 = data.data.filter(match => match.stage === "r16");
   const quaterFinale = data.data.filter(match => match.stage === "qf");
   const semiFinale = data.data.filter(match => match.stage === "sf");
   const final = data.data.filter(match => match.stage === "final" || match.stage === "thirdPlace" );

   roundOf32[0].homeRef = "Zweiter Gr. A";
   roundOf32[0].awayRef = "Zweiter Gr. B";

   roundOf32[1].homeRef = "Sieger Gr. E";
   roundOf32[1].awayRef = "3. Gr. A/B/C/D/F";

   roundOf32[2].homeRef = "Sieger Gr. F";
   roundOf32[2].awayRef = "Zweiter Gr. C";

   roundOf32[3].homeRef = "Sieger Gr. C";
   roundOf32[3].awayRef = "Zweiter Gr. F";

   roundOf32[4].homeRef = "Sieger Gr. I";
   roundOf32[4].awayRef = "3. Gr. C/D/F/G/H";

   roundOf32[5].homeRef = "Zweiter Gr. E";
   roundOf32[5].awayRef = "Zweiter Gr. I";

   roundOf32[6].homeRef = "Sieger Gr. A";
   roundOf32[6].awayRef = "3. Gr. C/E/F/H/I";

   roundOf32[7].homeRef = "Sieger Gr. L";
   roundOf32[7].awayRef = "3. Gr. E/H/I/J/K";

   roundOf32[8].homeRef = "Sieger Gr. D";
   roundOf32[8].awayRef = "3. Gr. B/E/F/I/J";

   roundOf32[9].homeRef = "Sieger Gr. G";
   roundOf32[9].awayRef = "3. Gr. A/E/H/I/J";

   roundOf32[10].homeRef = "Zweiter Gr. K";
   roundOf32[10].awayRef = "Zweiter Gr. L";

   roundOf32[11].homeRef = "Sieger Gr. H";
   roundOf32[11].awayRef = "Zweiter Gr. J";

   roundOf32[12].homeRef = "Sieger Gr. B";
   roundOf32[12].awayRef = "3. Gr. E/F/G/I/J";

   roundOf32[13].homeRef = "Sieger Gr. J";
   roundOf32[13].awayRef = "Zweiter Gr. H";

   roundOf32[14].homeRef = "Sieger Gr. K";
   roundOf32[14].awayRef = "3. Gr. D/E/I/J/L";

   roundOf32[15].homeRef = "Zweiter Gr. D";
   roundOf32[15].awayRef = "Zweiter Gr. G";

   roundOf16[0].homeRef = "Sieger SF3";
   roundOf16[0].awayRef = "Sieger SF6";

   roundOf16[1].homeRef = "Sieger SF1";
   roundOf16[1].awayRef = "Sieger SF4";

   roundOf16[2].homeRef = "Sieger SF2";
   roundOf16[2].awayRef = "Sieger SF5";

   roundOf16[3].homeRef = "Sieger S12";
   roundOf16[3].awayRef = "Sieger Sf11";

   roundOf16[4].homeRef = "Sieger SF7";
   roundOf16[4].awayRef = "Sieger SF8";

   roundOf16[5].homeRef = "Sieger SF13";
   roundOf16[5].awayRef = "Sieger SF16";

   roundOf16[6].homeRef = "Sieger SF10";
   roundOf16[6].awayRef = "Sieger SF9";

   roundOf16[7].homeRef = "Sieger SF15";
   roundOf16[7].awayRef = "Sieger SF14";

   quaterFinale[0].homeRef = "Sieger AF2";
   quaterFinale[0].awayRef = "Sieger AF1";

   quaterFinale[1].homeRef = "Sieger AF5";
   quaterFinale[1].awayRef = "Sieger AF6";

   quaterFinale[2].homeRef = "Sieger AF3";
   quaterFinale[2].awayRef = "Sieger AF4";

   quaterFinale[3].homeRef = "Sieger AF7";
   quaterFinale[3].awayRef = "Sieger AF8";

   semiFinale[0].homeRef = "Sieger VF1";
   semiFinale[0].awayRef = "Sieger VF2";

   semiFinale[1].homeRef = "Sieger VF3";
   semiFinale[1].awayRef = "Sieger VF4";

   final[0].homeRef = "Verlierer HF1";
   final[0].awayRef = "Verlierer HF2";

   final[1].homeRef = "Sieger HF1";
   final[1].awayRef = "Sieger HF2";


   const groups = {groupA, groupB, groupC, groupD, groupE, groupF, groupG, groupH, groupI, groupJ, groupK, groupL, roundOf32, roundOf16, quaterFinale, semiFinale, final}

   const main = document.getElementById("gameplan-body");
   const selector = document.getElementById("game-selection");
   let currentGroup = createGroup(selector.value, groups, main);

   selector.addEventListener("change", () => { currentGroup = changeGroup(selector.value, currentGroup, groups,main)})

   console.log(groupA);
}

main();