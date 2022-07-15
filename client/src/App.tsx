import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { atom } from "jotai";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Delete from './pages/Delete';
import ProductDetails from './pages/ProductDetails';
import type { IUser } from './Types';

export const userAtom = atom<IUser | undefined>(undefined);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
