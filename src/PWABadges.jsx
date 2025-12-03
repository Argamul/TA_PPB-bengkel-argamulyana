import { useEffect, useState } from "react";

export default function PWABadges() {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
    });
  }, []);

  if (installed) {
    return (
      <div className="pwa-badge installed">
        Aplikasi sudah terpasang di perangkatmu.
      </div>
    );
  }

  return (
    <div className="pwa-badge">
      Tambahkan Bengkel GAMUL ke layar utama untuk pengalaman penuh
      seperti aplikasi native.
    </div>
  );
}
