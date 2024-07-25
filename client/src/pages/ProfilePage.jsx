import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "../components/ui/ButtonLink";

export function ProfilePage() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <div className="container mx-auto p-5">
      <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <h1 className="text-2xl font-bold">
          <Link to={isAuthenticated ? "/bets" : "/"}>MyProfile</Link>
        </h1>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
             
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {isAuthenticated && (
        <div className="bg-zinc-700 shadow-md rounded-lg p-5 mt-5">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="mb-3">
            <strong>Username:</strong> {user.username}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>
          {/* Agrega más campos del perfil según sea necesario */}
        </div>
      )}
    </div>
  );
}
