import { useStore } from "@/store";
import { X } from "lucide-react";

export default function CloseButton() {
  const { view, resetCamera } = useStore();

  if (view !== "about") return null;

  return (
    <button
      onClick={resetCamera}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
    >
      <X />
    </button>
  );
}
