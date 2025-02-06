import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, inputMessage])
      setInputMessage('')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4">
      <div className="space-y-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Avatar />
            <p className="rounded-lg p-2">{message}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <Button onClick={sendMessage}>Envoyer</Button>
      </div>
    </Card>
  )
}

export default Chat
