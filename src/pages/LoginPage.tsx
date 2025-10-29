import {
  At,
  Eye,
  EyeClosed,
  Password,
  SignIn,
  User,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
  type Location as RouterLocation,
} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as RouterLocation & {
    state?: { from?: RouterLocation };
  };
  const redirectTo = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(email, password);
      }
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-gray-800 italic">
            {mode === "login" ? "Connexion" : "Inscription"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Accédez à votre espace personnel
          </p>
        </div>
        <form className="space-y-6" onSubmit={submit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <div className="relative">
              <At
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@mail.com"
                className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <Password
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPwd ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPwd ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-lg bg-amber-500 px-8 py-2.5 font-medium text-white shadow transition hover:bg-amber-600 sm:w-auto inline-flex items-center gap-2"
            >
              <SignIn size={20} />{" "}
              {loading
                ? "Veuillez patienter..."
                : mode === "login"
                ? "Se connecter"
                : "Créer un compte et se connecter"}
            </button>
            <span className="text-sm font-medium text-gray-600">OU</span>
            <button
              type="button"
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }
              className="w-full rounded-lg border border-amber-300 bg-amber-100 px-8 py-2.5 font-medium text-amber-700 transition hover:bg-amber-200 sm:w-auto inline-flex items-center gap-2"
            >
              <User size={20} />{" "}
              {mode === "login" ? "S’inscrire" : "Déjà inscrit ?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
