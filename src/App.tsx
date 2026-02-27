import { useState, useEffect, useRef } from "react"
import Header from "./components/Header.tsx"
import ThreeView from "./components/ThreeView.tsx"
import type { ThreeViewHandle } from "./components/ThreeView.tsx"
import ConsoleView from "./components/ConsoleView.tsx"
import * as service from "./services/coordinate.service.ts"
import type coord from "./services/coordinate.service.ts"

import "./App.css"

const App: React.FC = () => {
  //create a reference to the ThreeView component's methods
  const threeRef = useRef<ThreeViewHandle>(null)

  const[dataView, setDataView] = useState<coord[]>([])

  useEffect(() => {
    const updatePosition = async () => {
      try {
        const currentCoord = await service.getLatestPosition()

        setDataView(prevData => [...prevData, currentCoord])
        
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
        <ConsoleView data={dataView}/>
      </div>
    </div>
  )
}

export default App