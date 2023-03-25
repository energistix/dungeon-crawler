import * as PIXI from "pixi.js"
import TileSetManager from "../utils/TileSetManager"

function room(width: number, height: number): PIXI.Container {
  const tileset = new TileSetManager(PIXI.Assets.get("dungeons").textures)
  const room = new PIXI.Container()
  room.width = width * 16
  room.height = height * 16

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const tags = []
      if (y === 0) tags.push("up")
      else if (y === height - 1) tags.push("down")
      if (x === 0) tags.push("left")
      else if (x === width - 1) tags.push("right")

      if (y === 0 || y === height - 1 || x === 0 || x === width - 1)
        tags.push("wall")
      else tags.push("floor")
      let key = tags.join("_")
      key = key.replace("up_left", "left")
      key = key.replace("up_right", "right")
      
      const texture = tileset.random(key)
      const sprite = new PIXI.Sprite(texture)

      sprite.width = 16
      sprite.height = 16
      sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
      sprite.position.set(x * 16, y * 16)
      room.addChild(sprite)
    }
  }

  room.scale.set(3)
  return room
}

export default class StartingArea extends PIXI.Container {
  //@ts-ignore
  constructor(private app: PIXI.Application) {
    super()

    const roome = room(10, 10)
    roome.position.set(
      app.screen.width / 2 - roome.width / 2,
      app.screen.height / 2 - roome.height / 2
    )

    this.addChild(roome)
  }
}
