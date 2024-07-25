fetch('/api/fixtures')
            .then(response => response.json())
            .then(data => {
                const fixturesContainer = document.getElementById('fixtures-container');
                const fixtures = data.response;

                fixtures.forEach(fixture => {
                    const fixtureDiv = document.createElement('div');
                    fixtureDiv.className = 'fixture';

                    const date = new Date(fixture.fixture.date);
                    const formattedDate = date.toLocaleString();

                    fixtureDiv.innerHTML = `
                        <h2>
                            <img src="${fixture.teams.home.logo}" alt="${fixture.teams.home.name}">
                            ${fixture.teams.home.name}
                            vs
                            ${fixture.teams.away.name}
                            <img src="${fixture.teams.away.logo}" alt="${fixture.teams.away.name}">
                        </h2>
                        <p>Date: ${formattedDate}</p>
                    `;

                    fixturesContainer.appendChild(fixtureDiv);
                });
            })
            .catch(error => console.error('Error fetching fixtures:', error));

function goToLiveScores() {
    window.location.href = '/liveScores.html';
}