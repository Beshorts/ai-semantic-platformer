import { Send } from "lucide-react";
import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setMessages([...messages, { role: "user", text: prompt }]);
    setPrompt("");
  };

  return (
    <aside className="w-1/4 border-2 border-my-main rounded-md m-2 p-4 flex flex-col overflow-hidden">
      <h2 className="text-[14px] uppercase tracking-widest mb-4">AI CHAT</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`ml-auto ${
              m.role === "user" ? "bg-blue-50" : "bg-transparent"
            } text-my-main text-sm p-2 rounded-sm`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 border border-blue-300 rounded-sm bg-blue-50 px-2 py-1 text-sm"
          placeholder="Type a prompt..."
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="animate-scaleUp w-9 h-9 group text-xs bg-transparent rounded-full flex items-center p-2 hover:bg-my-main hover:text-white"
          >
            <Send size={20} strokeWidth={1.5} />
          </button>
        </div>
      </form>
    </aside>
  );
}
