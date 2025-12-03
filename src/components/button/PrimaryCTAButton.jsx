import { Link } from "react-router-dom";

export default function PrimaryCTAButton({ to, children, iconRight }) {
  return (
    <Link to={to} className="btn-primary-cta">
      <span>{children}</span>
      {iconRight && <span className="btn-icon">{iconRight}</span>}
    </Link>
  );
}
