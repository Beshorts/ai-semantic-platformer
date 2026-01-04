import { useGameStore } from "../store/gameStore";


export default function LiveJSON() {

  const currentLevel = useGameStore((state) => state.currentLevel);
  
  if (!currentLevel) {
    return (
      <div className="w-1/4 border-2 border-my-main rounded-md font-mono p-4 m-2 overflow-y-auto">
        No level loaded
      </div>
    );
  }

    return(
         <aside className="w-1/4 border-2 border-my-main rounded-md font-mono p-4 m-2 overflow-y-auto">
          <h2 className="text-[14px] uppercase tracking-widest mb-4">
            LIVE AI OUTPUT
          </h2>
         <div className="flex-1 rounded-2xl overflow-auto p-4 bg-my-main">
        <pre className="text-md text-gray-300 font-mono leading-relaxed">
          {JSON.stringify(currentLevel, null, 2)}
        </pre>
      </div>
        </aside>
    )
}