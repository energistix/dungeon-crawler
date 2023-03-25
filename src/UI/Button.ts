import * as PIXI from "pixi.js"
import { OutlineFilter } from "@pixi/filter-outline"
import { sleep } from "../utils"

export default class Button extends PIXI.Sprite {
  private _frame: PIXI.Sprite
  private _label: PIXI.Text
  public activated: boolean = false

  constructor(label: string, private _frameWidth: number = 100) {
    super()
    super.eventMode = "dynamic"
    super.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

    // Create the button frame
    const frameTexture = PIXI.Texture.from("assets/images/button_frame.png", {
      scaleMode: PIXI.SCALE_MODES.NEAREST
    })
    this._frame = new PIXI.Sprite(frameTexture)
    this._frame.anchor.set(0.5)
    this._frame.width = _frameWidth
    // divide by the golden+2 ratio to get the height
    this._frame.height = _frameWidth / 3.618

    // give a white outline to the frame when the mouse is over it
    super.on("pointerover", () => {
      if (!this.activated) {
        this._label.tint = 0x999999
        return
      }
      this._frame.filters = [new OutlineFilter(2, 0xffffff)]
      super.scale.set(1.05)
    })
    super.on("pointerout", () => {
      this._label.tint = 0xffffff
      this._frame.filters = []
      super.scale.set(1)
    })

    // Create the button label
    this._label = new PIXI.Text(label, {
      fill: "white",
      fontSize: Math.floor((_frameWidth / 100) * 15),
      stroke: "black",
      strokeThickness: 6,
      fontFamily: "PixelifySans-Regular"
    })
    this._label.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    this._label.anchor.set(0.5)

    // Add the frame and label to the button
    this.addChild(this._frame, this._label)
  }

  public get textWidth(): number {
    return this._label.width
  }

  public get frameWidth(): number {
    return this._frameWidth
  }

  public set frameWidth(value: number) {
    this._frameWidth = value
    this._frame.width = value
  }

  onClick(callback: () => void): void {
    this.activated = true
    super.on("pointerdown", async () => {
      if (!this.activated) return
      super.scale.set(0.95)
      await sleep(50)
      super.scale.set(1)
      await sleep(50)

      callback()
    })
  }
}
