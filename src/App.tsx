import "./App.css";
import { Route, Routes } from "react-router-dom";
import Introduction from "./Components/Introduction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Introduction />}></Route>
    </Routes>
  );
}

export default App;
