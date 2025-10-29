import {
  BooksIcon as Books,
  XIcon as Close,
  HouseIcon as House,
  ListIcon as Menu,
  PlusIcon as Plus,
  SignInIcon as SignIn,
  SignOutIcon as SignOut,
} from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Books size={28} />
          <h1 className="font-serif text-lg italic">Mon Vieux Grimoire</h1>
        </Link>
        <button
          className="inline-flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
        <nav className="hidden items-center gap-6 text-sm md:flex">
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
                toast.success("Déconnexion réussie");
                navigate("/");
              }}
              className="inline-flex items-center gap-1 hover:underline"
            >
              <SignOut size={18} /> Se déconnecter
            </button>
          )}
        </nav>
      </div>
      {open && (
        <div className="border-t border-gray-200 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
                  setOpen(false);
                  logout();
                  toast.success("Déconnexion réussie");
                  navigate("/");
                }}
                className="inline-flex items-center gap-1 text-left hover:underline"
              >
                <SignOut size={18} /> Se déconnecter
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
