import { useBets } from "../../context/betsContext";
import { Button, ButtonLink, Card } from "../ui";

export function BetCard({ bet }) {
  const { deleteBet } = useBets();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{bet.fixture}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteBet(bet._id)}>Delete</Button>
          <ButtonLink to={`/bets/${bet._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{bet.betChoice}</p>
      {/* format date */}
      <p>
        {bet.date &&
          new Date(bet.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
