import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./_root/pages/Home";
import SignIn from "./_auth/form/SignIn";
import SignUp from "./_auth/form/SignUp";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout.jsx";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        // private routes
        <Route element={<AuthLayout />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
        // public routes /* index - allows child component to be rendered on the
        same path as parent */
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
