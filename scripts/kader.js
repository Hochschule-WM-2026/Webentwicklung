let kaderData = [];
const posMapping = {
  "GK": "Torhüter",
  "DF": "Verteidiger",
  "MF": "Mittelfeld",
  "FW": "Stürmer"
};
const posOrder = ["GK", "DF", "MF", "FW"];

async function loadKaderData() {
  try {
    const response = await fetch('/json/worldcup.squads.json');
    kaderData = await response.json();
    loadTeams();
  } catch (error) {
    console.error(error);
    document.getElementById("teamAuswahl").innerHTML = '<option value="">Fehler beim Laden der Daten</option>';
  }
}

function loadTeams() {
  const select = document.getElementById("teamAuswahl");
  select.innerHTML = '';
  
  const sortedTeams = kaderData.map(t => t.name).sort();

  sortedTeams.forEach(land => {
    const option = document.createElement("option");
    option.value = land;
    option.textContent = land;
    select.appendChild(option);
  });

  const deExists = sortedTeams.find(name => name === "Deutschland" || name === "Germany");
  if (deExists) {
    select.value = deExists;
    updateFlagAndKader(deExists);
  } else if (sortedTeams.length > 0) {
    select.value = sortedTeams[0];
    updateFlagAndKader(sortedTeams[0]);
  }
}

function calculateAge(dobString) {
  if (!dobString) return "-";
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function updateFlagAndKader(teamName) {
  const team = kaderData.find(t => t.name === teamName);
  const flagImg = document.getElementById("flaggenBild");
  
  if (team && team.fifa_code) {
    flagImg.src = `/flags/${teamName}.svg`;
    flagImg.style.display = "block";
  } else {
    flagImg.style.display = "none";
  }
  
  renderKader(teamName);
}

function renderKader(teamName) {
  const container = document.getElementById("kaderInhalt");
  container.innerHTML = "";

  const team = kaderData.find(t => t.name === teamName);
  if (!team || !team.players || team.players.length === 0) {
    container.innerHTML = `
      <div class="naechsteSpieleBox">
        <p class="infoSpielText">Keine Spielerdaten für dieses Team gefunden.</p>
      </div>`;
    return;
  }

  posOrder.forEach(posKey => {
    const filteredPlayers = team.players.filter(p => p.pos === posKey);
    if (filteredPlayers.length === 0) return;

    const block = document.createElement("div");
    block.className = "positionBlock";

    let rows = "";
    filteredPlayers.forEach(player => {
      const clubName = player.club ? player.club.name : "-";
      const clubCountry = player.club && player.club.country ? ` (${player.club.country})` : "";
      const age = calculateAge(player.date_of_birth);

      rows += `
        <tr>
          <td class="spielerNummer">${player.number || "-"}</td>
          <td class="spielerName">${player.name}</td>
          <td class="spielerVerein">${clubName}${clubCountry}</td>
          <td class="spielerAlter">${age}</td>
        </tr>
      `;
    });

    block.innerHTML = `
      <h4 class="positionTitel">${posMapping[posKey] || posKey}</h4>
      <table class="statistikTabelle">
        <thead>
          <tr>
            <th class="spielerNummer th-nr">Nr.</th>
            <th class="th-name">Name</th>
            <th class="th-club">Verein</th>
            <th class="spielerAlter th-age">Alter</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    container.appendChild(block);
  });
}

document.getElementById("teamAuswahl").addEventListener("change", (e) => {
  if (e.target.value) {
    updateFlagAndKader(e.target.value);
  } else {
    document.getElementById("flaggenBild").style.display = "none";
    document.getElementById("kaderInhalt").innerHTML = `
      <div class="naechsteSpieleBox">
        <p class="infoSpielText">Bitte wähle ein Land aus, um die Spielerinfos anzuzeigen.</p>
      </div>`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadKaderData();
});
