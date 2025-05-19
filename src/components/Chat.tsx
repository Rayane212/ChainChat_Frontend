import { useState, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { api } from '@/lib/api'
import { wsClient } from '@/lib/socket'

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  createdAt: string
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.getMessages()
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    wsClient.connect()
    fetchMessages()

    return () => {
      wsClient.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return

    try {
      await api.sendMessage('recipient-id', inputMessage)
      setInputMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-3"
            >
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${message.senderId}`} />
                <AvatarFallback>{message.senderName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{message.senderName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Chat