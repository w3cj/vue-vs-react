import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
// import Shop from './pages/Shop/index-reducer';
// import Shop from './pages/Shop-context-selector';
// import Shop from './pages/Shop-zustand';
import useLinkHelpers from './hooks/useLinkHelpers';
import AdvancedImageSearch from './pages/ImageSearch/index';
import ImageSearch from './pages/ImageSearch/index.simple';
import ImageUpload from './pages/ImageUpload';

export function App() {
  const { isActive, getClassName } = useLinkHelpers();
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
                to="/shop/products"
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
                className={getClassName('/advanced-image-search')}
                aria-current={isActive('/advanced-image-search')}
                to="/advanced-image-search"
              >
                Advanced Image Search
              </Link>
            </li>
            {/* <li>
              <Link
                className={getClassName('/image-upload')}
                aria-current={isActive('/image-upload')}
                to="/image-upload"
              >
                Image Upload
              </Link>
            </li> */}
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
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/image-search" element={<ImageSearch />} />
          <Route
            path="/advanced-image-search"
            element={<AdvancedImageSearch />}
          />
          {/* <Route path="/image-upload" element={<ImageUpload />} /> */}
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
