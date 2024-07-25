import { useEffect } from "react";
import { useBets } from "../context/betsContext";
import { BetCard } from "../components/bets/BetCard";
import { ImFileEmpty } from "react-icons/im";

export function UpcomingEventsPage() {
  const { bets, getBets } = useBets();

  useEffect(() => {
    getBets();
  }, []);

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
    </>
  );
}
