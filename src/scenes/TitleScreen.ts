import * as PIXI from "pixi.js"
import Button from "../UI/Button"
import StartingArea from "./StartingArea"
import { OutlineFilter } from "@pixi/filter-outline"

export default class TitleScreen extends PIXI.Container {
  private _titleText: PIXI.Text
  private _startButton: Button
  private _loadButton: Button
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
      fontSize: 60,
      // fontWeight: "bold"
    })
    this._titleText.filters = [new OutlineFilter(10, 0x000000)]
    this._titleText.anchor.set(0.5)
    this._titleText.position.set(400, 180)

    // Create and position the start button
    this._startButton = new Button("Start Game", 250)
    this._startButton.position.set(400, 280)
    this._loadButton = new Button("Load Game", 200)
    this._loadButton.position.set(400, 350)

    this._startButton.onClick(this.onStartButtonClicked.bind(this))

    // Add the title text and start button to the scene container
    this.addChild(
      this._backgroundGif,
      this._titleText,
      this._startButton,
      this._loadButton
    )
  }

  private async onStartButtonClicked() {
    super.destroy()
    this.app.stage.addChild(new StartingArea(this.app))
  }
}
