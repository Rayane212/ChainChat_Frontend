import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"
import ForgetPassword from "./pages/ForgetPassword"
import ChatPage from "./pages/ChatPage"
import { AuthProvider } from "./provider/AuthContext"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/auth" element={<Auth/>} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App