import { ThemeProvider } from "@/provider/theme-provider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
