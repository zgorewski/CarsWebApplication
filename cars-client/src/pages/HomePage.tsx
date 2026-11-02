import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="hero">
      <h1>Cars Client</h1>
      <p className="lead">
        Aplikacja React + TypeScript do zarządzania samochodami. Dane pochodzą z lokalnego serwera
        <code>json-server</code>, który symuluje backend Cars API.
      </p>
      <div className="hero__actions">
        <Link to="/cars" className="btn">
          Przeglądaj samochody
        </Link>
        <Link to="/cars/new" className="btn btn--secondary">
          Dodaj samochód
        </Link>
      </div>
    </section>
  );
}
