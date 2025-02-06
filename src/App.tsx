import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"
import ForgetPassword from "./pages/ForgetPassword"
import ChatPage from "./pages/ChatPage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
