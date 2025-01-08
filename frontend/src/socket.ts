import { io, Socket } from 'socket.io-client'

export class SocketService {
  private socket: Socket | null = null
  private static instance: SocketService

  constructor(user_id: number) {
    if (!SocketService.instance) {
      this.socket = io(`http://${window.location.hostname}:3000`, {
        autoConnect: true,
        auth: {
          user_id: user_id
        }
      })

      this.socket.connect()
      SocketService.instance = this
    }

    if (!SocketService.instance.getSocket().connected) {
      SocketService.instance.getSocket().connect()
    }

    return SocketService.instance
  }

  getSocket(): Socket {
    if (!this.socket) {
      throw new Error('Socket not initialized')
    }
    return this.socket
  }
}
