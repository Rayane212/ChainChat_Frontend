import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Home, Search, Bell, User, LogOut } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "@/provider/AuthContext"
import { useNavigate } from "react-router-dom"

export function Navigation() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  if (!auth) throw new Error("AuthContext must be used within an AuthProvider")

  const handleLogout = async () => {
    await auth.logout()
    navigate("/auth")
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <ModeToggle />
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}