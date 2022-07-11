import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductCard from './pages/components/ProductCard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<ProductCard
                    name={"Nike Air Max Terrascape 90 sneakers in black/dark gray"}
                    image={
                        "images.asos-media.com/products/nike-air-max-terrascape-90-sneakers-in-black-dark-gray/200487519-1-black"
                    }
                    price={"$140.00"}
          brand={"Nike"}
          id={13423}
                />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
