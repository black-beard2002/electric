import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import CategoriesPage from "./pages/Categories";
import RootLayout from "./layouts/RootLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
