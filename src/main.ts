import "./style.css"
import * as PIXI from "pixi.js"
import TitleScreen from "./scenes/TitleScreen"

;(async () => {
  // load tileset
  PIXI.Assets.add("dungeons", "assets/atlas/dungeon.json")
  await PIXI.Assets.load("dungeons")
  console.log(PIXI.Assets.get("dungeons").textures)

  // chech that the fontFace is loaded
  const fontFace = new FontFace(
    "PixelifySans-Regular",
    "url(assets/fonts/PixelifySans-Regular.ttf)"
  )
  await fontFace.load()
  document.fonts.add(fontFace)

  // Create the game renderer and stage
  const app = new PIXI.Application({
    width: 400,
    height: 300,
    view: document.getElementById("game-container") as HTMLCanvasElement
  })

  // Create and display the title screen
  // TODO - replace with the title screen
  const titleScreen = new TitleScreen(app)
  app.stage.addChild(titleScreen)
})()
