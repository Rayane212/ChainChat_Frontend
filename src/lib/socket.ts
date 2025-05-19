import { io, Socket } from 'socket.io-client';
import { api } from './api';

export class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect() {
    try {
      const wsInfo = await api.getWebSocketInfo();
      
      this.socket = io(wsInfo.wsUrl, {
        auth: {
          token: wsInfo.token,
        },
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
      });

      this.setupEventHandlers();
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    this.socket.on('message', (message) => {
      console.log('Received message:', message);
      // Handle incoming messages
    });
  }

  sendMessage(message: any) {
    if (!this.socket?.connected) {
      throw new Error('WebSocket is not connected');
    }
    this.socket.emit('message', message);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const wsClient = new WebSocketClient();