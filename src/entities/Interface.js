import { PAD_COLORS_HEX } from '../constants'
import { Button } from './Button'

const textOpts = { fontSize: 40, align: 'center' }

export class Interface {
  constructor(scene) {
    this.scene = scene

    this.connectionText = this.scene.add
      .text(
        this.scene.cameras.main.width / 2,
        this.scene.cameras.main.height / 2,
        'Waiting for another player...',
        { ...textOpts },
      )
      .setOrigin(0.5)
  }

  end() {
    this.ended = true
    this.connectionText.setAlpha(1)
    const winningPlayer = this.scene.strategyGame.players.find(
      (p) => p.health !== 0,
    )
    this.connectionText.text =
      winningPlayer.team === 0 ? 'Red player has won!' : 'Blue player has won!'
    this.connectionText.setDepth(10)
  }

  start() {
    this.connectionText.setAlpha(0)
    this.started = true
    this.redHealthText = this.scene.add
      .text(150, 40, '100', { ...textOpts, color: PAD_COLORS_HEX[1] })
      .setOrigin(0.5)

    this.moneyText = this.scene.add
      .text(150, this.scene.cameras.main.height - 50, '0', {
        ...textOpts,
      })
      .setOrigin(0.5)

    this.blueHealthText = this.scene.add
      .text(this.scene.cameras.main.width - 150, 40, '100', {
        ...textOpts,
        color: PAD_COLORS_HEX[2],
      })
      .setOrigin(0.5)

    this.chargeText = this.scene.add
      .text(this.scene.cameras.main.width / 2, 40, '0', textOpts)
      .setOrigin(0.5)
    this.lineGraphics = this.scene.add.graphics()

    this.spawnButton = new Button(
      this.scene,
      this.scene.cameras.main.width / 2,
      this.scene.cameras.main.height - 50,
      () => this.scene.room.send('Spawn'),
      'Spawn',
    )
  }

  update() {
    if (!this.started) return

    if (this.scene.strategyGame.phaseIndex === 1 && !this.ended) this.end()

    this.chargeText.style.color =
      PAD_COLORS_HEX[this.scene.strategyGame.chargeIndex + 1]
    this.chargeText.text = this.scene.strategyGame.charge
    const players = this.scene.strategyGame.players || []
    this.redHealthText.text = players[0] ? players[0].health.toString() : '0'
    this.blueHealthText.text = players[1] ? players[1].health.toString() : '0'
    const activePlayer = players.find((p) => p.id === this.scene.player.id)
    this.moneyText.text = activePlayer ? activePlayer.money : '0'

    this.clear()
    const { activeUnit, lastHoveredHex, strategyGame } = this.scene
    if (!activeUnit || !lastHoveredHex) return

    this.lineGraphics.lineStyle(5, 0xffffff, 1.0)
    this.lineGraphics.beginPath()
    this.lineGraphics.moveTo(activeUnit.container.x, activeUnit.container.y)
    const destinationChanged =
      this._lastDestination?.x !== activeUnit.destination?.x ||
      this._lastDestination?.y !== activeUnit.destination?.y
    this._lastDestination = activeUnit.destination
    if (
      this._lastHovered !== lastHoveredHex ||
      !this.path ||
      destinationChanged
    ) {
      this.path = strategyGame.hexes.getPath(
        activeUnit,
        activeUnit.hex,
        lastHoveredHex.hex,
      )
      this._lastHovered = lastHoveredHex
    }

    const path = activeUnit.path.length > 0 ? activeUnit.path : this.path

    if (path.length === 0) return

    path.forEach((hex, i) => {
      const coord = strategyGame.hexes.getScreenFromHex(hex)
      this.lineGraphics.lineTo(coord.x, coord.y)
    })
    this.lineGraphics.strokePath()
    this.lineGraphics.closePath()
  }

  clear() {
    if (this.lineGraphics) this.lineGraphics.clear()
  }
}
