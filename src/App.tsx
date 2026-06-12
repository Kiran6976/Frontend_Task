import TopBar from "./components/layout/TopBar";
import LeftRail from "./components/layout/LeftRail";
import GraphCanvas from "./components/canvas/GraphCanvas";
import RightPanel from "./components/layout/RightPanel";
import { useAppStore } from "./store/appStore";

function App() {
  const isDarkMode = useAppStore(
    (state) => state.isDarkMode
  );

  return (
    <div
      className={`app-shell ${
        isDarkMode ? "theme-dark" : "theme-light"
      } flex h-screen flex-col bg-black text-white`}
    >
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        <main className="canvas-shell relative flex-1 bg-zinc-950">
          <GraphCanvas />
        </main>

        <RightPanel />
      </div>
    </div>
  );
}

export default App;
