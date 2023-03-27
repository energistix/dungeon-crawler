import * as PIXI from "pixi.js"

export default class TileSetDebugger extends PIXI.Container {
  constructor(ressources: Record<string, PIXI.Texture>) {
    super()
    let i = 0
    for (let key in ressources) {
      const sprite = new PIXI.Sprite(ressources[key])
      sprite.position.set((i % 10) * 16, Math.floor(i / 10) * 16)

      // show the name of the texture when hovering
      const text = new PIXI.Text(key, { fill: 0xffffff })
      text.position.set(sprite.x, sprite.y + 16)

      sprite.eventMode = "dynamic"
      sprite.on("mouseover", () => {
        this.addChild(text)
      })
      sprite.on("mouseout", () => {
        this.removeChild(text)
      })

      this.addChild(sprite)
      i++
    }
  }
}
