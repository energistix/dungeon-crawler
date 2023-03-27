import * as PIXI from "pixi.js"
import TileSetManager from "../utils/TileSetManager"
import { OutlineFilter } from "@pixi/filter-outline"

type pos = `${number}-${number}`

export default class TileSelector extends PIXI.Container {
  private selectedPos: pos = "0-0"
  private outlineFilter = new OutlineFilter(2, 0x00ff00)

  constructor(
    private app: PIXI.Application,
    private tileSetManager: TileSetManager,
    private config: Record<pos, string>
  ) {
    super()
    for (const [pos, kind] of Object.entries(config)) {
      const sprite = new PIXI.Sprite(tileSetManager.random(kind))
      if(pos === this.selectedPos) sprite.filters = [this.outlineFilter]
      sprite.width = 16
      sprite.height = 16
      sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

      const _pos = pos.split("-");
      sprite.position.set(
        Number(_pos[0]) * 16,
        Number(_pos[1]) * 16
      )

      sprite.eventMode = "dynamic"
      sprite.on("pointerdown", () => {
        this.selectedPos = pos as pos
        this.children.forEach(child => {
          child.filters = []
        })
        sprite.filters = [this.outlineFilter]
        // put the newly selected tile on top of the others
        this.removeChild(sprite)
        this.addChild(sprite)
      })

      this.addChild(sprite)
    }
  }

  get currentSelectedTile(): PIXI.Texture {
    return this.tileSetManager.random(this.config[this.selectedPos])
  }
}
