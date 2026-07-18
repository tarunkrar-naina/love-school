import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Volume2, VolumeX } from "lucide-react";
import { apiUrl } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🙏 Main Love Public Sr. Sec. School ka AI assistant hoon. Admissions, academics, ya kisi bhi cheez ke baare mein puchh sakte hain!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      stopAudio();
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setSpeaking(false);
  };

  const playAudio = useCallback(
    (base64: string, mime: string) => {
      if (!voiceOn) return;
      stopAudio();
      const audio = new Audio(`data:${mime};base64,${base64}`);
      audioRef.current = audio;
      audio.onplay = () => setSpeaking(true);
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      audio.play().catch(() => setSpeaking(false));
    },
    [voiceOn]
  );

  const toggleVoice = () => {
    if (voiceOn) stopAudio();
    setVoiceOn((v) => !v);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(apiUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Unknown error");
      }

      const reply = data.reply as string;
      setMessages([...newMessages, { role: "assistant", content: reply }]);

      if (data.audio_base64) {
        playAudio(data.audio_base64, data.audio_mime ?? "audio/mp3");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Kuch masla ho gaya, dobara try karein.";
      setError(msg);
      setMessages([...newMessages, { role: "assistant", content: "⚠️ " + msg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-[100] flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-20 h-20 rounded-full bg-[#0D9488] flex items-center justify-center text-white shadow-2xl"
            >
              <X size={28} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.img
                src="/robot-icon.png"
                alt="Chat"
                className="w-20 h-20 rounded-full object-cover drop-shadow-xl"
                animate={speaking ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ repeat: speaking ? Infinity : 0, duration: 0.6 }}
              />
              <span className="text-xs font-semibold text-white bg-[#0D9488] px-2 py-0.5 rounded-full shadow-md tracking-wide">
                Ask me
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-28 right-5 z-[99] w-[340px] max-w-[calc(100vw-2.5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#99F6E4]/60 overflow-hidden"
            style={{ maxHeight: "75vh" }}
          >
            {/* Header */}
            <div className="bg-[#0D9488] px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <motion.img
                src="/robot-icon.png"
                alt="bot"
                className="w-9 h-9 rounded-full object-cover border-2 border-white/40"
                animate={speaking ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ repeat: speaking ? Infinity : 0, duration: 0.5 }}
              />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm leading-tight">
                  School Assistant
                </p>
                <p className="text-[#CCFBF1] text-[11px] flex items-center gap-1">
                  {speaking ? (
                    <>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                      Bol raha hoon...
                    </>
                  ) : (
                    "Love Public Sr. Sec. School"
                  )}
                </p>
              </div>
              {/* Voice toggle */}
              <button
                onClick={toggleVoice}
                title={voiceOn ? "Awaaz band karein" : "Awaaz chalayein"}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#F0FDFA]/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <img
                      src="/robot-icon.png"
                      alt="bot"
                      className="w-6 h-6 rounded-full object-cover mr-1.5 mt-1 flex-shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#0D9488] text-white rounded-br-sm"
                        : "bg-white text-[#134E4A] border border-[#99F6E4]/50 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start items-end gap-1.5">
                  <img
                    src="/robot-icon.png"
                    alt="bot"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="bg-white border border-[#99F6E4]/50 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-[#0D9488]" />
                  </div>
                </div>
              )}

              {error && !loading && (
                <p className="text-center text-xs text-red-400 px-2">{error}</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-[#99F6E4]/40 bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Kuch puchhein..."
                disabled={loading}
                className="flex-1 text-sm border border-[#99F6E4] rounded-full px-4 py-2 outline-none focus:border-[#0D9488] transition-colors disabled:opacity-50 bg-[#F0FDFA] text-[#134E4A] placeholder:text-[#4B7B76]/60"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
