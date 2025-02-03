import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/forget-password" element={<div>forget</div>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="*" element={<div>404</div>} />

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
