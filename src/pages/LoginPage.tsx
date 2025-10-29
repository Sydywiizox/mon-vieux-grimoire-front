import {
  AtIcon as At,
  EyeIcon as Eye,
  EyeClosedIcon as EyeClosed,
  PasswordIcon as Password,
  SignInIcon as SignIn,
} from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          toast.error("Les mots de passe ne correspondent pas.");
          return;
        }
        await signup(email, password);
        toast.success("Inscription réussie !");
      }
      await login(email, password);
      toast.success("Connexion réussie !");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-160 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl">
        <div className="mb-8">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-selected={mode === "login"}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
                mode === "signup"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-selected={mode === "signup"}
            >
              Inscription
            </button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Accédez à votre espace personnel
          </p>
        </div>
        <form onSubmit={submit}>
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div
            className={`transition-all duration-300 ${
              mode === "signup"
                ? "max-h-40 opacity-100 mb-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Password
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPwd ? "text" : "password"}
                  required={mode === "signup"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          <div className="pt-2">
            <button
              disabled={loading}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-8 py-2.5 font-medium text-white shadow transition hover:bg-amber-600"
            >
              <SignIn size={20} />
              {loading
                ? "Veuillez patienter..."
                : mode === "login"
                ? "Se connecter"
                : "Créer un compte et se connecter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
