import { set } from "mongoose";
import React, {useEffect, useState} from "react";

const LiveScores = () => {
    const [fixtures, setFixtures] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/fixtures/live')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            if (data && data.response) {
                setFixtures(data.response);
            } else {
                setError('Unexpected data format');
            }
        })
            .catch(error => {
                console.error('Error fetching fixtures:', error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-5xl py-2 font-bold">Live Scores</h1>
            <div id="fixtures-container">
                {fixtures.map((fixture, index) => (
                    <div key={index} className="fixture">
                        <h2>
                            <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                            {fixture.teams.home.name} {fixture.goals.home} vs {fixture.goals.away} {fixture.teams.away.name}
                            <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                        </h2>
                        <p>Fixture ID: {fixture.fixture.id}</p>
                        <p>Date: {new Date(fixture.fixture.date).toLocaleString()}</p>
                        <p>Status: {fixture.fixture.status.long}</p>
                        <p>Elapsed: {fixture.fixture.status.elapsed} minutes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiveScores;