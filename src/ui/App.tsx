import Room from "./pages/Room";
import StartPage from "./pages/StartPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-svh p-2">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/create-room/*" element={<Room />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
