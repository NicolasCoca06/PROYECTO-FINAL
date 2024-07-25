import { useEffect, useState } from "react";
import { useBets } from "../context/betsContext";
import { BetCard } from "../components/bets/BetCard";
import { ImFileEmpty } from "react-icons/im";
import UpcomingEventsPage from "./UpcomingEventsPage";
import LiveScores from "../components/LiveScores";
import { getRecommendations } from "../services/api";  

export function BetsPage() {
  const { bets, getBets } = useBets();
  const [recommendation, setRecommendation] = useState('');  
  useEffect(() => {
    getBets();
  }, []);

  const handleGetRecommendations = async () => {
    try {
      const recommendationResult = await getRecommendations("Provide some user data or criteria here");
      setRecommendation(recommendationResult);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendation("Failed to fetch recommendations");
    }
  };

  return (
    <>
      {bets.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No bets yet, please add a new bet
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {bets.map((bet) => (
          <BetCard bet={bet} key={bet._id} />
        ))}
      </div>
      <button onClick={handleGetRecommendations} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Recommendations
      </button>
      {recommendation && (
        <div className="mt-4 bg-gray-100 border border-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold">Recommendations:</h2>
          <p>{recommendation}</p>
        </div>
      )}
      <LiveScores />
      <UpcomingEventsPage />
    </>
  );
}
