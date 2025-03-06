import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  const queryclient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
