class TagSchema {
  id
  text 
  color
  position
  constructor(text, color) {
    this.id = new Date().getTime()
    this.text = text
    this.color = color
    this.position = {x: 0, y: 0}
  }
}

export default TagSchema