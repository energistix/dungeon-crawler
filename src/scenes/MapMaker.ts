import * as PIXI from "pixi.js"
import TileSelector from "../UI/TileSelector"
import TileSetManager from "../utils/TileSetManager"

export default class MapMaker extends PIXI.Container {
  private _tileSelector?: TileSelector

  constructor(private app: PIXI.Application) {
    super()
    this.loadTileSelector()
  }

  async loadTileSelector() {
    this._tileSelector = new TileSelector(
      this.app,
      new TileSetManager(PIXI.Assets.get("dungeons").textures),
      await fetch("config/dungeonTileSelector.json").then((res) => res.json())
    )
    // this._tileSelector = new tileSetDebugger(PIXI.Assets.get("dungeons").textures)

    this.addChild(this._tileSelector)
  }
}
