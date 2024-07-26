import React, { useEffect, useState } from "react";

export function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [teamName, setTeamName] = useState('');

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
          setFilteredEvents(data.response);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch(error => {
        console.error('Error fetching fixtures:', error);
        setError(error.message);
      });
  }, []);

  const handleFilter = () => {
    const filtered = events.filter(event => {
      const eventDate = new Date(event.fixture.date).toISOString().split('T')[0];
      return (
        (filterDate === '' || eventDate === filterDate) &&
        (teamName === '' || event.teams.home.name.toLowerCase().includes(teamName.toLowerCase()) || event.teams.away.name.toLowerCase().includes(teamName.toLowerCase()))
      );
    });
    setFilteredEvents(filtered);
  };

  const handleReset = () => {
    setFilterDate('');
    setTeamName('');
    setFilteredEvents(events);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="content-container p-6">
      <h1 className="text-5xl py-2 font-bold">Upcoming Football Events</h1>
      
      <div className="filter-form mb-6 p-4 bg-gray-800 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Filter Events</h2>
        
        <div className="mb-4">
          <label htmlFor="filter-date" className="block text-lg">Filter by Date:</label>
          <input
            id="filter-date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-1 px-3 py-2 border rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="team-name" className="block text-lg">Filter by Team Name:</label>
          <input
            id="team-name"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 px-3 py-2 border rounded bg-gray-700 text-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div id="events-container">
        {filteredEvents.map((event, index) => (
          <div key={index} className="fixture">
            <h2 className="text-xl">
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
