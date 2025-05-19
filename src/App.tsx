import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import ForgetPassword from "./pages/ForgetPassword"
import ChatPage from "./pages/ChatPage"
import { AuthContext, AuthProvider } from "./provider/AuthContext"
import { useContext } from "react"


// export function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/chat" element={<ChatPage/>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
