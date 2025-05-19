import Chat from "@/components/Chat"
import { Navigation } from "@/components/Navigation"

function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <Chat />
      </div>
      <Navigation />
    </div>
  )
}

export default ChatPage