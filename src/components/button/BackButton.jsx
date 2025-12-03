import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/home")}
      className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00]"
      style={{
        background: "transparent",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
      }}
    >
      <ArrowLeft size={20} />
      <span>Kembali ke Beranda</span>
    </button>
  );
}
