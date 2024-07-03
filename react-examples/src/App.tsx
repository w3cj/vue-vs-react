import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

export function App() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || undefined;
  };

  const getClassName = (path: string) => {
    return isActive(path) ? 'secondary' : '';
  };

  return (
    <>
      <header className="container">
        <nav>
          <ul>
            <li>
              <strong>React Examples</strong>
            </li>
          </ul>
          <ul>
            <li>
              <Link
                className={getClassName('/')}
                aria-current={isActive('/')}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={getClassName('/sign-up')}
                aria-current={isActive('/sign-up')}
                to="/sign-up"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className={getClassName('/shop')}
                aria-current={isActive('/shop')}
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className={getClassName('/image-search')}
                aria-current={isActive('/image-search')}
                to="/image-search"
              >
                Image Search
              </Link>
            </li>
            <li>
              <Link
                className={getClassName('/stocks')}
                aria-current={isActive('/stocks')}
                to="/stocks"
              >
                Stocks
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/shop" element={<NotFound />} />
          <Route path="/image-search" element={<NotFound />} />
          <Route path="/stocks" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
