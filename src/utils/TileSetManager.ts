import * as PIXI from "pixi.js"

export default class TileSetManager {
  ressourcesByKind: Record<string, PIXI.Texture[]> = {}

  constructor(ressources: Record<string, PIXI.Texture>) {
    for (let key in ressources) {
      key = key.replace(".png", "")
      let tags = key.split("_")
      let index: number

      if (isNaN(Number(tags[tags.length - 1]))) index = 1
      else index = Number(tags.pop())

      const kind = tags.join("_")

      if (!this.ressourcesByKind[kind]) this.ressourcesByKind[kind] = []

      this.ressourcesByKind[kind][index - 1] = ressources[key + ".png"]
    }
  }

  get(kind: string, index: number = 0): PIXI.Texture {
    if (!this.ressourcesByKind[kind]) {
      console.warn(`No ressource found for kind ${kind}`)
      return PIXI.Texture.from("assets/images/missing.png")
    }
    if (!this.ressourcesByKind[kind][index]) {
      console.warn(`No ressource found for kind ${kind} and index ${index}`)
      return PIXI.Texture.from("assets/images/missing.png")
    }

    return this.ressourcesByKind[kind][index]
  }

  random(kind: string): PIXI.Texture {
    if (!this.ressourcesByKind[kind]) {
      console.warn(`No ressource found for kind ${kind}`)
      return PIXI.Texture.from("assets/images/missing.png")
    }

    return this.get(
      kind,
      Math.floor(Math.random() * this.ressourcesByKind[kind].length)
    )
  }
}
