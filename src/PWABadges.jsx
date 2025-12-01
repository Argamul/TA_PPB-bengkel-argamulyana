import { useEffect, useState } from "react";
import "./PWABadge.css";

export default function PWABadges() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setVisible(true);
		};

		window.addEventListener("beforeinstallprompt", handler);

		return () => {
			window.removeEventListener("beforeinstallprompt", handler);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		const choice = await deferredPrompt.userChoice;
		setVisible(false);
		setDeferredPrompt(null);
		// optional: you can log choice.outcome
	};

	if (!visible) return null;

	return (
		<div className="pwa-badge">
			<div className="pwa-inner">
				<div className="pwa-text">Install GAMUL App</div>
				<button className="pwa-button" onClick={handleInstall}>
					Install
				</button>
			</div>
		</div>
	);
}
