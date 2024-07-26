import { useBets } from "../context/betsContext";
import { BetCard } from "../components/bets/BetCard";
import { ImFileEmpty } from "react-icons/im";
import { data } from "autoprefixer";
import React, {useEffect, useState} from "react";


export function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/fixtures')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
    })
    .then(data => {
        if (data && data.response) {
            setEvents(data.response);
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
        <h1 className="text-5xl py-2 font-bold">Upcoming Football Events</h1>
        <div id="events-container">
            {events.map((event, index) => (
                <div key={index} className="fixture">
                    <h2>
                        <img src={event.teams.home.logo} alt={event.teams.home.name} />
                        {event.teams.home.name} vs {event.teams.away.name}
                        <img src={event.teams.away.logo} alt={event.teams.away.name} />
                    </h2>
                    <p>Date: {new Date(event.fixture.date).toLocaleString()}</p>
                </div>
            ))}
        </div>
    </div>
);
}

export default UpcomingEventsPage;
