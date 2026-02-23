const sheetID = "1srwCRcCf_grbInfDSURVzXXRqIqxQ6_IIPG-4_gnSY8";
const sheetName = "Players";

const fetchInterval = 5000; // 5 seconds

const sheetURL =
`https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

async function fetchSheet() {

  try {

    const res = await fetch(sheetURL);
    const text = await res.text();

    const json = JSON.parse(
      text.substring(47).slice(0, -2)
    );

    const rows = json.table.rows;

    // ===== MVP DATA (ROW 4) =====

    const mvpRow = rows[0].c;
    const playerMVP = mvpRow[3]?.v || "";
    const teamMVP = mvpRow[4]?.v || "";
    const teamLogoMVP = mvpRow[5]?.v || "";
    const rectangleImg = mvpRow[6]?.v || "";
    const mvpKills = mvpRow[7]?.v || "";



    // MVP Logo
    document.querySelector(".team-mvp-logo").src =
    teamLogoMVP;


    // MVP Player Name
    document.querySelector(".text-player-mvp")
    .textContent = playerMVP;


    // MVP Team Name
    document.querySelector(".text-mvp-team")
    .textContent = teamMVP;


    // MVP Kills
    document.querySelector(".Player-Mvp-Kills")
    .textContent = mvpKills;



    // Rectangle Image (Background)
    document.querySelector(".rectangle")
    .style.backgroundImage =
    `url(${rectangleImg})`;



    // ===== TOP PLAYERS (ROWS 5-8) =====

    const groups = [

      document.querySelector(".group-2"),
      document.querySelector(".group-3"),
      document.querySelector(".group-4"),
      document.querySelector(".group-5")

    ];


    for (let i = 0; i < 4; i++) {

      const row = rows[i+1].c;

      const player =
      row[3]?.v || "";

      const team =
      row[4]?.v || "";

      const logo =
      row[5]?.v || "";

      const rect =
      row[6]?.v || "";

      const kills =
      row[7]?.v || "";



      const group = groups[i];


      // Rectangle image
      group.querySelector(".rectangle-3")
      .style.backgroundImage =
      `url(${rect})`;

        // Adjust the layout size for the background image
        const bg = group.querySelector(".rectangle-3");

        bg.style.backgroundSize = "cover";
        bg.style.backgroundRepeat = "no-repeat";
        bg.style.backgroundPosition = "center 10px"; // Moves image down


      // Player Name
      group.querySelector(".text-playername")
      .textContent = player;


      // Team Name
      group.querySelector(".team-name")
      .textContent = team;


      // Team Logo
      group.querySelector(".team-logo").src =
      logo;


      // Kills
      group.querySelector(".text-kills")
      .textContent = kills;

    }


  }

  catch(err){

    console.log("Fetch Error:",err);

  }

}



fetchSheet();

setInterval(fetchSheet, fetchInterval);