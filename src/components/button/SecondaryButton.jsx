import { Link } from "react-router-dom";

export default function SecondaryButton({ to, children }) {
  return (
    <Link to={to} className="btn-secondary">
      {children}
    </Link>
  );
}
