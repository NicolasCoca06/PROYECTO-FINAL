import { Link } from "react-router-dom";
import LiveScores from "../components/LiveScores";

function HomePage() {
  return (
    <section className="bg-red-500 flex justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold">BetSmart</h1>
        <p className="text-md text-slate-400">
          Welcome to BetSmart - Your Premier Destination for Online Sports
          Betting At BetSmart, we bring the thrill of sports betting right to
          your fingertips. Our cutting-edge platform offers a seamless and
          engaging experience for sports enthusiasts and betting aficionados
          alike. What sets BetSmart apart:
        </p>
        <p className="text-md text-slate-400">
          Wide range of sports events to bet on Live scores and real-time
          updates User-friendly interface for easy navigation Secure
          transactions and reliable payouts Comprehensive betting history
          tracking
        </p>

        <p className="text-md text-slate-400">
          Whether you're a seasoned bettor or new to the game, BetSmart provides
          the tools and information you need to make informed decisions. Our
          intuitive odds management system ensures competitive rates, while our
          live scoring feature keeps you in the heart of the action. Join
          BetSmart today and elevate your sports betting experience. Register
          now to access exclusive offers and start placing your bets on your
          favorite sports events. With BetSmart, every game becomes an
          opportunity. BetSmart: Where Smart Bets Meet Exciting Sports Action!
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
        <LiveScores />
      </header>
    </section>
  );
}

export default HomePage;
