import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import CategoriesPage from "./pages/Categories";
import Welcome from "./pages/Welcome";
import RootLayout from "./layouts/RootLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RootLayout/>}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/offers" element={<Offers />} />
          <Route path="/app/categories/:id" element={<Category />} />
          <Route path="/app/about" element={<About />} />
          <Route path="/app/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
