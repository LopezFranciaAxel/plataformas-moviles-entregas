document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'tu_api_key';
    const apiUrl = 'https://api.football-data.org/v2/competitions/PL/teams';

    fetch(apiUrl, {
        headers: { 'X-Auth-Token': apiKey }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const teams = data.teams;
        let teamsList = document.querySelector("#teamsList");
        teams.forEach(team => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.textContent = team.name;
            teamsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
});
