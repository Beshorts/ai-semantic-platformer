import { Settings } from "lucide-react";

export default function Navbar() {

    return(
        <nav className="h-12 border-b-2 border-my-main flex items-center justify-between px-6 mb-2 shrink-0">
        <h1 className="font-bold tracking-tighter uppercase text-md">
          AI Semantic Game
        </h1>
        <button className="text-xs bg-transparent rounded-full flex items-center p-2 hover:bg-my-main hover:text-white">
          <Settings
            size={20}
            strokeWidth={1.5}
            className="rotate-90-on-hover"
          />
        </button>
      </nav>
    )
    
}