import { Separator } from "@/components/ui/separator";
import { Home, Search, Bell, User } from "lucide-react";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex flex-col items-center">
          <Home className="w-6 h-6 text-gray-700" />
          <span className="text-xs mt-1 text-gray-600">Accueil</span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col items-center">
          <Search className="w-6 h-6 text-gray-700" />
          <span className="text-xs mt-1 text-gray-600">Recherche</span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col items-center">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="text-xs mt-1 text-gray-600">Notifications</span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col items-center">
          <User className="w-6 h-6 text-gray-700" />
          <span className="text-xs mt-1 text-gray-600">Profil</span>
        </div>
      </div>
    </nav>
  );
};

