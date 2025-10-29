import { Books, House, Plus, SignIn, SignOut } from "@phosphor-icons/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <Books size={28} />
        <h1 className="font-serif text-lg italic">Mon Vieux Grimoire</h1>
      </Link>
      <nav className="space-x-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-gray-900" : "hover:underline"
          }
        >
          <span className="inline-flex items-center gap-1">
            <House size={18} /> Accueil
          </span>
        </NavLink>
        <NavLink
          to="/books/new"
          className={({ isActive }) =>
            isActive ? "font-semibold text-gray-900" : "hover:underline"
          }
        >
          <span className="inline-flex items-center gap-1">
            <Plus size={18} /> Ajouter un livre
          </span>
        </NavLink>
        {!token ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-semibold text-gray-900" : "hover:underline"
            }
          >
            <span className="inline-flex items-center gap-1">
              <SignIn size={18} /> Se connecter
            </span>
          </NavLink>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="inline-flex items-center gap-1 hover:underline"
          >
            <SignOut size={18} /> Se déconnecter
          </button>
        )}
      </nav>
    </header>
  );
}
