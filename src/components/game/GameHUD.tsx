import { SquarePen, Star } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const GameHUD = () => {
  const progress = useGameStore((state) => state.progress);
  console.log("WWWWW", progress)
  return (
    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 shadow-lg">
      <div className="inline-flex gap-3">
        <div className="flex items-center gap-2 text-sm">
          <SquarePen size={18} color='yellow' strokeWidth={1.5} />
          <span className="text-white font-medium">
            {progress.wordsActivated} / {progress.totalWords}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star size={24} fill="yellow" />
          <span className="text-white font-medium">
            {progress.starsCollected} / {progress.totalStars}
          </span>
        </div>
      </div>
    </div>
  );
};