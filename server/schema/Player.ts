import { type, Schema } from '@colyseus/schema'

export class Player extends Schema {
  reconnection: any

  @type('string')
  id = ''

  @type('string')
  name = ''

  @type('number')
  team

  @type('number')
  health

  @type('number')
  money

  @type('boolean')
  connected

  @type('number')
  remainingConnectionTime

  constructor({
    id,
    name,
    money = 0,
    health = 100,
    team = -1,
    connected = true,
    remainingConnectionTime = 0,
  }) {
    super()
    this.id = id
    this.name = name
    this.health = health
    this.team = team
    this.money = money
    this.connected = connected
    this.remainingConnectionTime = remainingConnectionTime
  }
}
