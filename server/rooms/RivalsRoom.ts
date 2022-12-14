import { Room, Client, ServerError } from 'colyseus'
import { RoomState } from '../schema'
import { Dispatcher } from '@colyseus/command'
import * as Commands from '../commands'
import { TICK_RATE } from '../../lib/constants'

export class RivalsRoom extends Room<RoomState> {
  maxClients = 2
  dispatcher = new Dispatcher(this)

  onCreate({ roomName = 'ChessRoom' } = {}) {
    this.setState(new RoomState())
    this.setMetadata({ roomName })

    this.onMessage('*', (client, action, _data = {}) => {
      const Command = Commands[action + 'Command']
      if (!Command) return

      this.dispatcher.dispatch(new Command(), {
        ..._data,
        broadcast: this.broadcast.bind(this),
        playerId: _data.playerId || client.sessionId,
      })
    })

    this.clock.setInterval(() => {
      try {
        const command = new Commands.TickCommand()
        command && this.dispatcher.dispatch(command)
      } catch (e) {
        console.error(e)
      }
    }, TICK_RATE)
  }

  onAuth() {
    if (this.state.players.length >= 2)
      throw new ServerError(400, 'Too many players')

    return true
  }

  onJoin(client: Client, options) {
    const playerId = client.sessionId
    this.dispatcher.dispatch(new Commands.JoinCommand(), {
      playerId,
      ...options,
    })
    this.broadcast('message', options.name + ' joined')
  }

  onDispose() {
    this.clock.clear()
  }

  onLeave = async (client, consented) => {
    const playerId = client.sessionId
    if (consented) {
      this.dispatcher.dispatch(new Commands.LeaveCommand(), { playerId })
    } else {
      const reconnection = this.allowReconnection(client)
      this.dispatcher.dispatch(new Commands.DisconnectCommand(), {
        playerId,
        reconnection,
      })
    }
  }
}
