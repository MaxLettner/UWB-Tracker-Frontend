import { useEffect, useRef } from "react"
import Header from "./components/Header.tsx"
import ThreeView from "./components/ThreeView.tsx"
import type { ThreeViewHandle } from "./components/ThreeView.tsx"
import ConsoleView from "./components/ConsoleView.tsx"
import * as service from "./services/coordinate.service.ts"
import * as data from './data/data.ts'

import "./App.css"

const App: React.FC = () => {
  //create a reference to the ThreeView component's methods
  const threeRef = useRef<ThreeViewHandle>(null)

  useEffect(() => {
    const updatePosition = async () => {2
      try {
        const currentCoord = await service.getLatestPosition()

        data.setDataList([...data.getDataList(), currentCoord])

        console.log(data.getDataList())
        
        if (threeRef.current) {
          //call the method within the react component
          threeRef.current.updateTargetPosition(currentCoord.x, currentCoord.y, currentCoord.z)
        }
      } catch (error) {
        console.error("Error updating coordinates:", error)
      }
    }

    //1 second interval
    const intervalId = setInterval(updatePosition, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="app">
      <Header />
      <div className="main">
        <ThreeView ref={threeRef} />
        <ConsoleView />
      </div>
    </div>
  )
}

export default App