// src/components/BettingOdds.js
import React, { useEffect, useState } from 'react';

const BettingOdds = () => {
    const [odds, setOdds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/odds')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Network response was not ok ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            if (data && data.response) {
                setOdds(data.response);
            } else {
                setError('Unexpected data format');
            }
        })
        .catch(error => {
            console.error('Error fetching odds:', error);
            setError(error.message);
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Betting Odds</h1>
            <div className="odds-container">
                {odds.map((odd, index) => (
                    <div key={index} className="odd-card">
                        <h2>{odd.match_name}</h2>
                        <div>
                            <p>Date: {new Date(odd.match_date).toLocaleString()}</p>
                            <div className="bet-options">
                                <button className="bet-button">Home Win: {odd.home_win_odds}</button>
                                <button className="bet-button">Draw: {odd.draw_odds}</button>
                                <button className="bet-button">Away Win: {odd.away_win_odds}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BettingOdds;
