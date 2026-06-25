async function renderAllTablesAndMatches() {
  const apiResponse = await getTableData();
  if (!apiResponse) return;

  const allMatches = Array.isArray(apiResponse) ? apiResponse : apiResponse.data || [];
  const groups = {};

  allMatches.forEach(match => {
    if (!match.stage || !match.stage.startsWith("group_")) return;

    const groupLetter = match.stage.split("_")[1].toUpperCase();

    if (!groups[groupLetter]) {
      groups[groupLetter] = { teams: {}, matches: [] };
    }

    groups[groupLetter].matches.push(match);

    const home = match.homeTeam;
    const away = match.awayTeam;

    if (home && !groups[groupLetter].teams[home]) {
      groups[groupLetter].teams[home] = { name: home, tore: 0, gegentore: 0, diff: 0, punkte: 0 };
    }
    if (away && !groups[groupLetter].teams[away]) {
      groups[groupLetter].teams[away] = { name: away, tore: 0, gegentore: 0, diff: 0, punkte: 0 };
    }

    if (match.status === "finished" && match.homeScore !== null && match.awayScore !== null) {
      const hs = parseInt(match.homeScore);
      const as = parseInt(match.awayScore);

      groups[groupLetter].teams[home].tore += hs;
      groups[groupLetter].teams[home].gegentore += as;
      groups[groupLetter].teams[away].tore += as;
      groups[groupLetter].teams[away].gegentore += hs;

      if (hs > as) {
        groups[groupLetter].teams[home].punkte += 3;
      } else if (hs < as) {
        groups[groupLetter].teams[away].punkte += 3;
      } else {
        groups[groupLetter].teams[home].punkte += 1;
        groups[groupLetter].teams[away].punkte += 1;
      }
    }
  });

  const container = document.getElementById("tabellenUebersichtBox");
  if (!container) return;
  container.innerHTML = "";

  const sortedGroupLetters = Object.keys(groups).sort();

  sortedGroupLetters.forEach(letter => {
    const teamsArray = Object.values(groups[letter].teams);

    teamsArray.forEach(team => {
      team.diff = team.tore - team.gegentore;
    });

    teamsArray.sort((a, b) => {
      if (b.punkte !== a.punkte) return b.punkte - a.punkte;
      if (b.diff !== a.diff) return b.diff - a.diff;
      return b.tore - a.tore;
    });

    const groupWrapper = document.createElement("section");
    groupWrapper.className = "gruppenUebersichtBox";

    let tableRows = "";
    teamsArray.forEach((team, index) => {
      tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td class="teamZelle">
            <img class="teamFlagge" src="/flags/${team.name}.svg" alt="${team.name}">
            <span>${team.name}</span>
          </td>
          <td>${team.diff >= 0 ? "+" + team.diff : team.diff}</td>
          <td><strong>${team.punkte}</strong></td>
        </tr>
      `;
    });

    let matchesHTML = "";

    groups[letter].matches.forEach(match => {
      const isFinished = match.status === "finished";

      const scoreDisplay = isFinished 
        ? `${match.homeScore} : ${match.awayScore}`
        : `${match.time || "vs"}`;

      matchesHTML += `
        <div class="miniSpiel ${isFinished ? 'beendet' : 'kommt'}">
          <div class="miniTeam miniTeamHeim">
            <span>${match.homeTeam}</span>
            <img class="teamFlagge miniFlagge" src="/flags/${match.homeTeam}.svg" alt="">
          </div>
          <div class="miniErgebnis">${scoreDisplay}</div>
          <div class="miniTeam miniTeamGast">
            <img class="teamFlagge miniFlagge" src="/flags/${match.awayTeam}.svg" alt="">
            <span>${match.awayTeam}</span>
          </div>
        </div>
      `;
    });

    groupWrapper.innerHTML = `
      <div class="tableCard">
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
      </div>

      <div class="gruppenSpieleKarte">
        <h5 class="miniSpieleTitel">Spielplan Gruppe ${letter}</h5>
        <div class="miniSpieleListe">
          ${matchesHTML}
        </div>
      </div>
    `;

    container.appendChild(groupWrapper);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAllTablesAndMatches();
});