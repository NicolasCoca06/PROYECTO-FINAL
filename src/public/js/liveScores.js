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
                            ${fixture.teams.home.name} ${fixture.goals.home}
                            vs
                            ${fixture.goals.away} ${fixture.teams.away.name}
                            <img src="${fixture.teams.away.logo}" alt="${fixture.teams.away.name}">
                        </h2>
                        <p>Date: ${formattedDate}</p>
                        <p>Status: ${fixture.fixture.status.long}</p>
                        <p>Elapsed: ${fixture.fixture.status.elapsed} minutes</p>
                    `;

                    fixturesContainer.appendChild(fixtureDiv);
                });
            })
            .catch(error => console.error('Error fetching fixtures:', error));

function goToUpcoming() {
    window.location.href = '/upcomingEvents.html';
}