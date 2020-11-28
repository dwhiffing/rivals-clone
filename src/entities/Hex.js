export class Hex {
  constructor(scene, hex) {
    this.scene = scene
    const { x, y } = scene.rivals.getScreenPos(hex.toPoint())
    this.hex = hex
    this.index = 0
    this.sprite = this.scene.add
      .sprite(x, y, 'hexagon')
      .setScale(scene.rivals.SCALED_TILE_SIZE)
  }

  setIndex(index) {
    this.index = index
    this.sprite.clearTint()
    if (index === 1) {
      this.sprite.setFrame(2)
    }
    if (index === 2) {
      this.sprite.setTint(0x00ff00)
    }
    if (index === 3) {
      this.sprite.setTint(0x000)
    }
  }

  setPadStatus(status) {
    this.sprite.setTint(0x000)
    if (status === 0) {
      this.sprite.setTint(0xff0000)
    }
    if (status === 1) {
      this.sprite.setTint(0x00ff00)
    }
    if (status === 2) {
      this.sprite.setTint(0xffff00)
    }
  }

  select() {
    this.active = true
    this.sprite.setFrame(1)
  }

  deselect() {
    if (!this.active) return
    this.active = false
    this.sprite.setFrame(0)
  }

  hover() {
    if (this.index !== 1) this.select()
  }
}
