import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav__link nav__link--active' : 'nav__link');

export function NavBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <NavLink to="/" className="nav__brand">
          Cars Client
        </NavLink>
        <nav className="nav__links">
          <NavLink to="/" end className={linkClass}>
            Start
          </NavLink>
          <NavLink to="/cars" end className={linkClass}>
            Samochody
          </NavLink>
          <NavLink to="/cars/new" className={linkClass}>
            Dodaj samochód
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
