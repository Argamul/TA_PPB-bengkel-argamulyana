import { Link } from "react-router-dom";

export default function EmptyState({ 
  icon, 
  title, 
  subtitle, 
  buttonText, 
  buttonLink 
}) {
  return (
    <div className="empty-wrapper">
      <div className="empty-icon">{icon}</div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-subtitle">{subtitle}</p>

      <Link to={buttonLink} className="empty-btn">
        {buttonText}
      </Link>
    </div>
  );
}
