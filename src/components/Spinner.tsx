import { Spinner as SpinnerIcon } from "@phosphor-icons/react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-10 text-amber-600">
      <SpinnerIcon size={40} className="animate-spin" />
    </div>
  );
}
