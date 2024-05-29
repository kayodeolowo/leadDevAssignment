import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (

    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
</Router>

  )
}