import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import Banner from './components/Banner';
import Contacts from './components/Contacts';
import Page404 from './components/Page404';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import './css/style.css';
import ProductActive from './components/ProductActive';

function App() {

  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta charSet="UTF-8" />
        <title>Bosa Noga</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
      </Helmet>
      <Router>
        <Header />
          <main className="container">
            <div className="row">
              <div className="col">
                <Banner />
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/products/:id" element={<ProductActive />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<Page404 />} />
                 </Routes>
              </div>
            </div>
          </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
