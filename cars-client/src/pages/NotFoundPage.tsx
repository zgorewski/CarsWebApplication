import { Link, useLocation } from 'react-router-dom';

export function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <section className="feedback feedback--empty">
      <h1>404 – nie znaleziono strony</h1>
      <p>
        Strona <code>{pathname}</code> nie istnieje.
      </p>
      <Link to="/" className="btn">
        Strona główna
      </Link>
    </section>
  );
}
