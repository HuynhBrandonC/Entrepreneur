const teamEl = document.querySelector('.player-display__actual-stats');
let year;
let filter;

let valid_ids = [
1610612737,
1610612738,
1610612739,
1610612740,
1610612741,
1610612742,
1610612743,
1610612744,
1610612745,
1610612746,
1610612747,
1610612748,
1610612749,
1610612750,
1610612751,
1610612752,
1610612753,
1610612754,
1610612755,
1610612756,
1610612757,
1610612758,
1610612759,
1610612760,
1610612761,
1610612762,
1610612763,
1610612764,
1610612765,
1610612766
];

async function renderTeams(year, filter) {
    const teams = await fetch(`https://data.nba.net/data/10s/prod/v1/${year}/team_stats_rankings.json`);
    const teamsData = await teams.json();
    const teamsDataRS = (teamsData.league.standard.regularSeason.teams);


    teamsDataRS.forEach((element) => {
        let id = element.teamId
        console.log(id);
        // console.log(teamsDataRS);

        // valid_ids.forEach(ids => {
        //     let correct_count = 0;
        //     // console.log(ids);
        //     if (ids === id) {
        //         correct_count += 1;
        //     }

        //     if (correct_count < 1) {
        //         teamsDataRS.splice((teamsDataRS.indexOf(id), 1));
        //     }
        // })
    })


    teamEl.innerHTML = teamsDataRS.map(team => teamHTML(team)).join('');

}

function teamHTML(team) {
return `
                <div class="player-display__stats--wrapper">
                    <figure class="player-display__stats--pic player__stat">
                        <img src="https://cdn.nba.com/logos/nba/${team.teamId}/primary/L/logo.svg" class="player__img player__stat" alt="">
                    </figure>
                    <div class="player-display__stats--name ">
                        <h3 class="player__stat">${team.name + ' ' + team.nickname}</h3>
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