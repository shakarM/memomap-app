import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Homepage from "./HomePage";
// import Product from "./Product";
// import Pricing from "./Pricing";
// import PageNotFound from "./PageNotFound";
// import AppLayout from "./AppLayout";
import "./App.css";
// import Login from "./Login";
import CityList from "./componenet/CityList";
import CountryList from "./componenet/CountryList";
import Form from "./componenet/Form";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { Suspense, lazy } from "react";
import Spinner from "./componenet/Spinner";
import City from "./componenet/City";

// Lazy-loaded City component
const Homepage = lazy(() => import("./Homepage"));
const Product = lazy(() => import("./Product"));
const Pricing = lazy(() => import("./Pricing"));
const AppLayout = lazy(() => import("./AppLayout"));
const Login = lazy(() => import("./Login"));
const PageNotFound = lazy(() => import("./PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />

                {/* Use the 'element' prop to render the lazy-loaded component */}
                <Route path="cities/:id" element={<City />} />

                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
