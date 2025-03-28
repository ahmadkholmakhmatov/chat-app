import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import OperatorDashboard from "./components/OperatorDashboard";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import UserChat from "./components/UserChat";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserChat />} />
              <Route path="/operator" element={<OperatorDashboard />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
