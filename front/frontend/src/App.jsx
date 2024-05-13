import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/navigation";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import Students from "./components/Students";
import Manage from "./components/Manage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
          <Route exact={true} path="/" element={Home}></Route>
          <Route path="/student" element={<Students/>} />
          <Route path="/manage" element={<Manage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;