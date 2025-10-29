import { MapPinIcon as MapPin } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between bg-white px-8 py-6 text-sm text-gray-600 shadow-inner sm:flex-row">
      <div className="text-center sm:text-left">
        <p>
          8 place Jeanne d’Arc
          <br />
          59000 Lille
        </p>
        <a
          href="#"
          className="text-xs text-amber-600 hover:underline inline-flex items-center gap-1"
        >
          <MapPin size={16} /> voir sur la carte
        </a>
      </div>
      <p className="mt-4 sm:mt-0">01 12 23 34 45</p>
      <p className="mt-4 sm:mt-0">© 2022 - 2023</p>
      <a href="#" className="mt-4 text-xs hover:underline sm:mt-0">
        Mentions légales
      </a>
    </footer>
  );
}
