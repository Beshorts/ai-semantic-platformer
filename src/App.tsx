import Navbar from "./components/Navbar";
import MobileOverlay from "./components/MobileOverlay";
import LiveJSON from "./components/LiveJSON";
import GameScreen from "./components/GameScreen";
import Chat from "./components/Chat";
import Footer from "./components/Footer";



function App() {

  return (
    <main className="flex flex-col h-screen w-full bg-my-bg text-my-main font-sans overflow-hidden">
      <Navbar />
      {/* MOBILE NOTICE: displayed only on mobile - desktop browser is required to play the game */}
      <MobileOverlay />
      {/* 3. DESKTOP LAYOUT:hidden on mobile, visible from MD query */}
      <section className="hidden md:flex flex-1 overflow-hidden">
        {/* LEFT COLUMN: Live JSON Output from the AI */}
        <LiveJSON />
        {/* CENTER COLUMN: GameScreen */}
        <GameScreen />
        {/* RIGHT COLUMN: Chat AI */}
      <Chat />
      </section>
      {/* 4. CONTROLS SECTION (Desktop Only) */}
      <Footer />
    </main>
  );
}

export default App;
