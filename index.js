const teamEl = document.querySelector('.player-display__actual-stats');
let year;
let filter;

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





async function renderTeams(year, filter) {
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


    teamEl.innerHTML = teamsDataRS.map(team => teamHTML(team)).join('');

}

function teamHTML(team) {
    let name;

    valid_ids.forEach(id => {
        if (parseInt(id[0]) === parseInt(team.teamId)) {
            console.log(id[0]);
            console.log(team.teamId);
            name = valid_ids[1]
        }
    })

return `
                <div class="player-display__stats--wrapper">
                    <figure class="player-display__stats--pic player__stat">
                        <img src="https://cdn.nba.com/logos/nba/${team.teamId}/primary/L/logo.svg" class="player__img player__stat" alt="">
                    </figure>
                    <div class="player-display__stats--name ">
                        <h3 class="player__stat">${name}</h3>
                    </div>
                    <div class="player-display__stats--ppg ">
                        <h3 class="player__stat">${team.ppg.avg}</h3>
                    </div>
                    <div class="player-display__stats--apg">
                        <h3 class="player__stat">${team.apg.avg}</h3>
                    </div>
                    <div class="player-display__stats--rpg">
                        <h3 class="player__stat">${(parseFloat(team.drpg.avg) + parseFloat(team.orpg.avg)).toFixed(1)}</h3>
                    </div>
                    <div class="player-display__stats--bpg">
                        <h3 class="player__stat">${team.bpg.avg}</h3>
                    </div>
                    <div class="player-display__stats--spg">
                        <h3 class="player__stat">${team.spg.avg}</h3>
                    </div>
                </div>
`
}

function filterTeams(event) {
    filter = event.target.value;
    renderTeams(year, filter);
}

function filterYear(event) {
    year = event.target.value;
    renderTeams(year, filter);
}