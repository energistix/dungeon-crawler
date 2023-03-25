import PIXI, { Sprite }  from "pixi.js"

export class Player extends Sprite {
  private _speed: number
  private _health: number
  
  constructor() {
    super()
    this.texture = PIXI.Texture.from("assets/images/player.png")
    this.anchor.set(0.5)
    this.position.set(0, 0)
    this._speed = 5
    this._health = 100
  }

  public move(dx: number, dy: number) {
    this.position.x += dx * this._speed
    this.position.y += dy * this._speed
  }

  public takeDamage(damage: number) {
    this._health -= damage
    if(this._health <= 0) {
      //TODO: handle player death
    }
  }
}
