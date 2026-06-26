async function getMatchData() {
  localStorage.setItem("matchDataAge", Date.now());
  const matchDataAge = localStorage.getItem("matchDataAge");

  //                 Hours Minutes Seconds
  const fourHours = 4 * 60 * 60 * 1000; // in Miliseconds  

  if((Date.now() - matchDataAge) > fourHours){
    localStorage.setItem(matchDataAge, Date.now())
    try {
      const response = await fetch(
        "https://api.zafronix.com/fifa/worldcup/v1/matches?year=2026",
        {
          headers: {
            "X-API-Key": "zwc_free_2af917931ea3e6ce42e9dce8"
          }
        }
      );

      if (!response.ok) throw new Error("API-Fehler");
      const text = await response.text();
      const data = JSON.parse(text);
      localStorage.setItem("matches", JSON.stringify(data));
      return data;
    }
    catch{
      //If API answer isnt Correct load old data Anyways
      const matches = localStorage.getItem("matches");
      return JSON.parse(matches);
    }
  }
  else{
    const matches = localStorage.getItem("matches");
    return JSON.parse(matches);
  }

  
}
async function renderNextTwoDays() {
  const apiResponse = await getMatchData();
  if (!apiResponse) return;

  const allMatches = Array.isArray(apiResponse) ? apiResponse : apiResponse.data || [];

  let upcomingMatches = allMatches.filter(match => match.status !== "finished");

  upcomingMatches.sort((a, b) => new Date(a.kickoffUtc) - new Date(b.kickoffUtc));

  const uniqueDates = [];
  for (let match of upcomingMatches) {
    if (!match.kickoffUtc) continue;
    const matchDate = new Date(match.kickoffUtc);
    const localDateStr = matchDate.toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' });
    
    if (!uniqueDates.includes(localDateStr)) {
      uniqueDates.push(localDateStr);
    }
    if (uniqueDates.length === 2) break;
  }

  const filteredMatches = upcomingMatches.filter(match => {
    if (!match.kickoffUtc) return false;
    const matchDate = new Date(match.kickoffUtc);
    const localDateStr = matchDate.toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' });
    return uniqueDates.includes(localDateStr);
  });

  const container = document.getElementById("naechsteSpieleListe");
  if (!container) return;
  container.innerHTML = "";

  let currentGroupDate = "";

  filteredMatches.forEach((match) => {
    const matchDateTime = new Date(match.kickoffUtc);
    const dayHeaderString = matchDateTime.toLocaleDateString("de-DE", { weekday: 'long', day: '2-digit', month: '2-digit' });
    const timeString = matchDateTime.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' }) + " Uhr";

    const homeName = match.homeTeam || "Unbekannt";
    const awayName = match.awayTeam || "Unbekannt";

    if (dayHeaderString !== currentGroupDate) {
      if (currentGroupDate !== "") {
        const divider = document.createElement("div");
        divider.className = "spielTagTrenner";
        container.appendChild(divider);
      }
      
      const header = document.createElement("div");
      header.className = "spielTagKopf";
      header.innerHTML = `<span class="spielTagDatum">${dayHeaderString}</span>`;
      container.appendChild(header);
      
      currentGroupDate = dayHeaderString;
    }

    const gameDiv = document.createElement("div");
    gameDiv.className = "spiel";
    gameDiv.innerHTML = `
      <span class="spielZeit">${timeString}</span>
      <div class="spielPaarung">
        <div class="spielTeam spielTeamHeim">
          <span class="teamName">${homeName}</span>
          <img class="teamFlagge" src="flags/${homeName}.svg" alt="${homeName}">
        </div>
        <span class="spielVs">vs</span>
        <div class="spielTeam spielTeamGast">
          <img class="teamFlagge" src="flags/${awayName}.svg" alt="${awayName}">
          <span class="teamName">${awayName}</span>
        </div>
      </div>
    `;
    container.appendChild(gameDiv);
  });

  const remainingCount = allMatches.length - filteredMatches.length;
  if (remainingCount > 0) {
    const infoText = document.createElement("p");
    infoText.className = "infoSpielText";
    infoText.textContent = `+ ${remainingCount} weitere Spiele anzeigen`;
    container.appendChild(infoText);
  }
}

async function renderGroups() {
  const apiResponse = await getMatchData();
  if (!apiResponse) return;

  const allMatches = Array.isArray(apiResponse) ? apiResponse : apiResponse.data || [];
  
  const groups = {};

  allMatches.forEach(match => {
    if (!match.stage || !match.stage.startsWith("group_")) return;

    const groupLetter = match.stage.split("_")[1].toUpperCase(); 
    
    if (!groups[groupLetter]) {
      groups[groupLetter] = {};
    }

    const home = match.homeTeam;
    const away = match.awayTeam;

    if (home && !groups[groupLetter][home]) {
      groups[groupLetter][home] = { name: home, games: 0, wins: 0, draw: 0, loses: 0, goals: 0, goalsAgainst: 0, diff: 0, points: 0 };
    }
    if (away && !groups[groupLetter][away]) {
      groups[groupLetter][away] = { name: away, games: 0, wins: 0, draws: 0, loses: 0, goals: 0, goalsAgainst: 0, diff: 0, points: 0 };
    }
    
    //Ausrechenen Der Wm Punkte 
    if (match.status === "finished" && match.homeScore !== null && match.awayScore !== null) {
      const homesScore = parseInt(match.homeScore);
      const awayScore = parseInt(match.awayScore);

      groups[groupLetter][home].games += 1;
      groups[groupLetter][away].games += 1;

      groups[groupLetter][home].goals += homesScore;
      groups[groupLetter][home].goalsAgainst += awayScore;
      groups[groupLetter][away].goals += awayScore;
      groups[groupLetter][away].goalsAgainst += homesScore;

      if (homesScore > awayScore) {
        groups[groupLetter][home].wins += 1;
        groups[groupLetter][home].points += 3;
        groups[groupLetter][away].loses += 1;
      } else if (homesScore < awayScore) {
        groups[groupLetter][away].wins += 1;
        groups[groupLetter][away].points += 3;
        groups[groupLetter][home].loses += 1;
      } else {
        groups[groupLetter][home].draws += 1;
        groups[groupLetter][home].points += 1;
        groups[groupLetter][away].draws += 1;
        groups[groupLetter][away].points += 1;
      }
    }
  });

  const container = document.getElementById("gruppenListe");
  if (!container) return;
  container.innerHTML = "";

  const sortedGroupLetters = Object.keys(groups).sort();

  sortedGroupLetters.forEach(letter => {
    const teamsArray = Object.values(groups[letter]);

    teamsArray.forEach(team => {
      team.diff = team.tore - team.gegentore;
    });

    teamsArray.sort((a, b) => {
      if (b.punkte !== a.punkte) return b.punkte - a.punkte;
      if (b.diff !== a.diff) return b.diff - a.diff;
      return b.tore - a.tore;
    });

    const groupSection = document.createElement("div");
    groupSection.className = "gruppenTabelleBox";

    let tableRows = "";
    teamsArray.forEach((team, index) => {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td class="teamZelle">
            <img class="teamFlagge" src="flags/${team.name}.svg" alt="${team.name}">
            <span>${team.name}</span>
          </td>
          <td>${team.diff >= 0 ? "+" + team.diff : team.diff}</td>
          <td><strong>${team.punkte}</strong></td>
        </tr>
      `;
    });

    groupSection.innerHTML = `
      <h4 class="gruppenTitel">Gruppe ${letter}</h4>
      <table class="gruppenTabelle">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Diff</th>
            <th>Pkt</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    container.appendChild(groupSection);
  });

  const totalSlides = sortedGroupLetters.length;
  if (totalSlides > 0) {
    let currentSlide = 0;
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
renderNextTwoDays();
renderGroups();
});