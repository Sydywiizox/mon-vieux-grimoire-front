import {
  FacebookLogoIcon as Facebook,
  InstagramLogoIcon as Instagram,
  EnvelopeSimpleIcon as Mail,
  MapPinIcon as MapPin,
  PhoneIcon as Phone,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 shadow-inner">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">À propos</h4>
            <p className="text-sm leading-6">
              Mon Vieux Grimoire est une boutique fictive dédiée aux passionnés
              de livres et mangas. Découvrez, notez et partagez vos coups de
              cœur.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Boutique</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-amber-600" href="#">
                  Nouveautés
                </a>
              </li>
              <li>
                <a className="hover:text-amber-600" href="#">
                  Meilleures ventes
                </a>
              </li>
              <li>
                <a className="hover:text-amber-600" href="#">
                  Cartes cadeaux
                </a>
              </li>
              <li>
                <a className="hover:text-amber-600" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="inline-flex items-center gap-2">
                <MapPin size={16} /> 8 place Jeanne d’Arc, 59000 Lille
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone size={16} /> 01 12 23 34 45
              </li>
              <li className="inline-flex items-center gap-2">
                <Mail size={16} /> contact@mvgrimoire.fr
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-800">Newsletter</h4>
            <p className="text-sm">Recevez nos actualités et promotions.</p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                S’abonner
              </button>
            </form>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded bg-gray-100 p-2 text-gray-700 hover:text-amber-600"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded bg-gray-100 p-2 text-gray-700 hover:text-amber-600"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between border-t border-gray-200 pt-6 text-xs sm:flex-row">
          <p>© 2022 - 2025 Mon Vieux Grimoire. Tous droits réservés.</p>
          <div className="mt-3 space-x-4 sm:mt-0">
            <a href="#" className="hover:underline">
              Mentions légales
            </a>
            <a href="#" className="hover:underline">
              CGU
            </a>
            <a href="#" className="hover:underline">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
