import * as PIXI from "pixi.js"
import Button from "../UI/Button"
import StartingArea from "./StartingArea"
import { OutlineFilter } from "@pixi/filter-outline"
import MapMaker from "./MapMaker"

export default class TitleScreen extends PIXI.Container {
  private _titleText: PIXI.Text
  private _startButton: Button
  private mapMakerButton: Button
  private _backgroundGif: PIXI.Sprite

  constructor(private app: PIXI.Application) {
    super()

    this._backgroundGif = new PIXI.Sprite(
      PIXI.Texture.from("assets/images/TitleScreen.gif")
    )
    this._backgroundGif.width = app.view.width
    this._backgroundGif.height = app.view.height

    // Create and position the title text
    this._titleText = new PIXI.Text("My Dungeon Crawler", {
      fill: "white",
      fontSize: 30,
    })
    this._titleText.filters = [new OutlineFilter(5, 0x000000)]
    this._titleText.anchor.set(0.5)
    this._titleText.position.set(200, 90)

    // Create and position the start button
    this._startButton = new Button("Start Game", 125)
    this._startButton.position.set(200, 140)
    this.mapMakerButton = new Button("Load Game", 100)
    this.mapMakerButton.position.set(200, 180)

    this._startButton.onClick(this.onStartButtonClicked.bind(this))
    this.mapMakerButton.onClick(this.onMapMakerButtonClicked.bind(this))

    // Add the title text and start button to the scene container
    this.addChild(
      this._backgroundGif,
      this._titleText,
      this._startButton,
      this.mapMakerButton
    )
  }

  private async onStartButtonClicked() {
    super.destroy()
    this.app.stage.addChild(new StartingArea(this.app))
  }

  private async onMapMakerButtonClicked() {
    super.destroy()
    this.app.stage.addChild(new MapMaker(this.app))
  }
}
