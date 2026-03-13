export default interface coord {
  x: number
  y: number
  z: number
  timestamp: string
}

// const socket = new WebSocket('ws://10.10.0.190:8000')

// socket.addEventListener('message', (event) => {
//   console.log(event.data)
// })

export const getLatestPosition = (): coord => {
  //not yet finished, currently just sample code
    
  return { x: 0.5, y: 0.5, z: Math.random(), timestamp:'2026-02-20T17:56:56.939303+00:00'}
}

export const getScale = (): number => {
  return 200
  //TODO: implement scale
}