import { GameCanvas } from "./game/GameCanvas";
import PlayerControls from "./game/PlayerControls";

export default function GameScreen() {
  return (
    <section className="flex-1 max-w-200 bg-white  flex flex-col relative mt-2">
      <GameCanvas />
      <PlayerControls />
    </section>
  );
}
