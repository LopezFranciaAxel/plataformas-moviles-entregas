document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosAPI();
});

async function obtenerDatosAPI() {
    const apiKey = '2196c48de3177e4f421fd1b40d3745fe';
    const ligaID = 61;  // Ligue 1 ID
    const temporada = 2023;

    const urlEquipos = `https://v3.football.api-sports.io/teams?league=${ligaID}&season=${temporada}`;
    const urlTopScorers = `https://v3.football.api-sports.io/players/topscorers?league=${ligaID}&season=${temporada}`;
    const urlLeagueInfo = `https://v3.football.api-sports.io/leagues?id=${ligaID}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    };

    try {
        const [responseEquipos, responseTopScorers, responseLeagueInfo] = await Promise.all([
            fetch(urlEquipos, options),
            fetch(urlTopScorers, options),
            fetch(urlLeagueInfo, options)
        ]);

        const dataEquipos = await responseEquipos.json();
        const dataTopScorers = await responseTopScorers.json();
        const dataLeagueInfo = await responseLeagueInfo.json();

        if (dataEquipos.response && dataTopScorers.response && dataLeagueInfo.response) {
            cargarImagenesSlide(dataEquipos.response);
            cargarInformacionCards(dataEquipos.response, dataTopScorers.response);
            configurarAccordion(dataEquipos.response, dataTopScorers.response, dataLeagueInfo.response[0]);
            cargarLogoLiga(dataLeagueInfo.response[0].league.logo);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function cargarImagenesSlide(teams) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Limpiar el contenido actual del carrusel

    teams.forEach((team, index) => {
        if (team.team.logo) {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active'); // Primer item activo

            const img = document.createElement('img');
            img.src = team.team.logo;
            img.alt = team.team.name;
            img.classList.add('d-block', 'w-100');

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        }
    });
}

function cargarInformacionCards(teams, topScorers) {
    const maximoCampeonCard = document.querySelector('#maximoCampeonCard');
    const maximoGoleadorCard = document.querySelector('#maximoGoleadorCard');
    const actualCampeonCard = document.querySelector('#actualCampeonCard');
    const trofeoCard = document.querySelector('#trofeoCard');

    // Cargar información en las tarjetas (ejemplo)
    maximoCampeonCard.querySelector('.card-title').textContent = "Máximo Campeón";
    maximoCampeonCard.querySelector('.card-text').textContent = `El equipo más exitoso es ${teams[0].team.name}.`;
    maximoCampeonCard.querySelector('.card-img-top').src = teams[0].team.logo;

    maximoGoleadorCard.querySelector('.card-title').textContent = "Máximo Goleador";
    maximoGoleadorCard.querySelector('.card-text').textContent = `El máximo goleador es ${topScorers[0].player.name} con ${topScorers[0].statistics[0].goals.total} goles.`;
    maximoGoleadorCard.querySelector('.card-img-top').src = topScorers[0].player.photo;

    actualCampeonCard.querySelector('.card-title').textContent = "Actual Campeón";
    actualCampeonCard.querySelector('.card-text').textContent = `El actual campeón es ${teams[1].team.name}.`;
    actualCampeonCard.querySelector('.card-img-top').src = teams[1].team.logo;

    trofeoCard.querySelector('.card-title').textContent = "Trofeo";
    trofeoCard.querySelector('.card-text').textContent = "Descripción del trofeo de la Ligue 1.";
    trofeoCard.querySelector('.card-img-top').src = "URL_DE_LA_IMAGEN_DEL_TROFEO"; // Reemplazar con la URL correcta
}

function configurarAccordion(teams, topScorers, leagueInfo) {
    const mejoresEquipos = teams.slice(0, 3).map(team => team.team.name).join(', ');
    document.querySelector('#mejoresEquiposAccordion').textContent = `Los equipos más exitosos de la Ligue 1 incluyen: ${mejoresEquipos}.`;

    const maximoGoleadores = topScorers.slice(0, 3).map(scorer => `${scorer.player.name} (${scorer.statistics[0].goals.total} goles)`).join(', ');
    document.querySelector('#maximosGoleadoresAccordion').textContent = `Los máximos goleadores de la temporada son: ${maximoGoleadores}.`;

    const formato = `La Ligue 1 cuenta con un formato de liga en el cual los equipos compiten en un sistema de todos contra todos. Al final de la temporada, el equipo con más puntos es coronado campeón.`;
    document.querySelector('#formatoAccordion').textContent = formato;
}

function cargarLogoLiga(logoUrl) {
    const logoElement = document.querySelector('.liga-logo');
    logoElement.src = logoUrl;
}
