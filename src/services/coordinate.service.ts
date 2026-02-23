export default interface coord {
  x: number
  y: number
  z: number
}

export const getLatestPosition = (): coord => {
    //not yet finished, currently just sample code
  return { x: 0.5, y: 0.5, z: Math.random()}
}