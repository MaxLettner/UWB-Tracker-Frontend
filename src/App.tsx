import Header from "./components/Header.tsx";
import ThreeView from "./components/ThreeView.tsx";
import ConsoleView from "./components/ConsoleView.tsx";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <ThreeView />
        <ConsoleView />
      </div>
    </div>
  );
};

export default App;
