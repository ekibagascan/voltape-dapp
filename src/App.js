import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mint />} />
      </Routes>
    </Router>
  );
}

export default App;
