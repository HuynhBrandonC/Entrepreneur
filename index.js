const teamEl = document.querySelector('.player-display__actual-stats');
let year;
let filter;
let selectedTeam;
let teamChoice;
const teamInputEl = document.getElementById('teamInput');

let valid_ids = [
    ['1610612737', 'Atlanta Hawks'],
    ['1610612738', 'Boston Celtics'],
    ['1610612739', 'Cleveland Cavaliers'],
    ['1610612740', 'New Orleans Pelicans'],
    ['1610612741', 'Chicago Bulls'],
    ['1610612742', 'Dallas Mavericks'],
    ['1610612743', 'Denver Nuggets'],
    ['1610612744', 'Golden State Warriors'],
    ['1610612745', 'Houston Rockets'],
    ['1610612746', 'LA Clippers'],
    ['1610612747', 'Los Angeles Lakers'],
    ['1610612748', 'Miami Heat'],
    ['1610612749', 'Milwaukee Bucks'],
    ['1610612750', 'Minnesota Timberwolves'],
    ['1610612751', 'Brooklyn Nets'],
    ['1610612752', 'New York Knicks'],
    ['1610612753', 'Orlando Magic'],
    ['1610612754', 'Indiana Pacers'],
    ['1610612755', 'Philadelphia 76ers'],
    ['1610612756', 'Phoenix Suns'],
    ['1610612757', 'Portland Trail Blazers'],
    ['1610612758', 'Sacramento Kings'],
    ['1610612759', 'San Antonio Spurs'],
    ['1610612760', 'Oklahoma City Thunder'],
    ['1610612761', 'Toronto Raptors'],
    ['1610612762', 'Utah Jazz'],
    ['1610612763', 'Memphis Grizzlies'],
    ['1610612764', 'Washington Wizards'],
    ['1610612765', 'Detroit Pistons'],
    ['1610612766', 'Charlotte Hornets']
];





async function renderTeams(year, filter, selectedTeam) {
    const teams = await fetch(`https://data.nba.net/data/10s/prod/v1/${year}/team_stats_rankings.json`);
    const teamsData = await teams.json();
    const teamsDataRSUnFiltered = (teamsData.league.standard.regularSeason.teams);
    let teamsDataRS = [];

    valid_ids.forEach(id => {
        teamsDataRSUnFiltered.forEach(team =>{
            if (parseInt(id[0]) === parseInt(team.teamId)) {
                teamsDataRS.push(team);
            }
        })
    })

    if (filter === "PPG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.ppg.rank) - parseInt(b.ppg.rank))
    } else if (filter === "PPG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.ppg.rank) - parseInt(a.ppg.rank))
    }  else if (filter === "APG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.apg.rank) - parseInt(b.apg.rank))
    } else if (filter === "APG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.apg.rank) - parseInt(a.apg.rank))
    }  else if (filter === "DRPG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.drpg.rank) - parseInt(b.drpg.rank))
    } else if (filter === "DRPG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.drpg.rank) - parseInt(a.drpg.rank))
    }  else if (filter === "ORPG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.orpg.rank) - parseInt(b.orpg.rank))
    } else if (filter === "ORPG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.orpg.rank) - parseInt(a.orpg.rank))
    }  else if (filter === "BPG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.bpg.rank) - parseInt(b.bpg.rank))
    } else if (filter === "BPG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.bpg.rank) - parseInt(a.bpg.rank))
    }  else if (filter === "SPG_HIGH_TO_LOW") {
        teamsDataRS.sort((a,b) => parseInt(a.spg.rank) - parseInt(b.spg.rank))
    } else if (filter === "SPG_LOW_TO_HIGH") {
        teamsDataRS.sort((a,b) => parseInt(b.spg.rank) - parseInt(a.spg.rank))
    }

    if (!selectedTeam) {
    teamEl.innerHTML = teamsDataRS.map(team => teamHTML(team)).join('');
    } else {
        teamsDataRS.forEach(team => {
            if ((team.name + ' ' + team.nickname) === selectedTeam) {
                console.log(team);
                teamChoice = team;
                console.log(teamChoice);
                teamEl.innerHTML = teamHTML(teamChoice);
            }
        })
        // console.log(teamChoice);
        
    }

}

function teamHTML(team) {
    let name;

    valid_ids.forEach(id => {
        if (parseInt(id[0]) === parseInt(team.teamId)) {
            name = id[1];
        }
    })

    return `
                <div class="player-display__stats--wrapper">
                    <figure class="player-display__stats--pic player__stat">
                        <img src="https://cdn.nba.com/logos/nba/${team.teamId}/primary/L/logo.svg" class="player__img player__stat" alt="">
                    </figure>
                    <div class="player-display__stats--name ">
                        <h3 class="player__stat player-display__text">${name}</h3>
                    </div>
                    <div class="player-display__stats--ppg ">
                        <h3 class="player__stat player-display__text">${team.ppg.avg + ' #' + team.ppg.rank}</h3>
                    </div>
                    <div class="player-display__stats--apg">
                        <h3 class="player__stat player-display__text">${team.apg.avg+ ' #' + team.apg.rank}</h3>
                    </div>
                    <div class="player-display__stats--drpg">
                        <h3 class="player__stat player-display__text">${parseFloat(team.drpg.avg) + ' #' + team.drpg.rank}</h3>
                    </div>
                    <div class="player-display__stats--orpg">
                        <h3 class="player__stat player-display__text">${parseFloat(team.orpg.avg) + ' #' + team.orpg.rank}</h3>
                    </div>
                    <div class="player-display__stats--bpg">
                        <h3 class="player__stat player-display__text">${team.bpg.avg+ ' #' + team.bpg.rank}</h3>
                    </div>
                    <div class="player-display__stats--spg">
                        <h3 class="player__stat player-display__text">${team.spg.avg + ' #' + team.spg.rank}</h3>
                    </div>
                </div>
`
}

function filterTeams(event) {
    filter = event.target.value;
    renderTeams(year, filter, selectedTeam);
}

function filterYear(event) {
    year = event.target.value;
    renderTeams(year, filter, selectedTeam);
}

function saveTeam() {
    selectedTeam = teamInputEl.value;
    console.log(selectedTeam);
    renderTeams(year, filter, selectedTeam);
}

function Alert() {
    alert("This feature doesn't work")
}