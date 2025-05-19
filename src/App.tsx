import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import ForgetPassword from "./pages/ForgetPassword"
import ChatPage from "./pages/ChatPage"
import { AuthContext, AuthProvider } from "./provider/AuthContext"
import { useContext } from "react"
import { Toaster } from "@/components/ui/toaster"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within an AuthProvider");
  
  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App