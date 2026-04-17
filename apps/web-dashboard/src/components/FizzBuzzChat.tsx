import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface FizzBuzzChatProps {
  apiBase: string;
}

export function FizzBuzzChat({ apiBase }: FizzBuzzChatProps) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage('');
    setChat((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setChat((prev) => [...prev, { role: 'bot', text: data.response || 'No response from model.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChat((prev) => [...prev, { role: 'bot', text: 'Error communicating with the model assistant.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-border rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Bot size={20} className="text-primary" />
          <span>FizzBuzz AI Assistant</span>
        </div>
        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
          Transformer v0.1
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {chat.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
            <Bot size={48} className="text-muted-foreground mb-2" />
            <p className="font-medium">Welcome to FizzBuzz AI!</p>
            <p className="text-sm max-w-[250px]">
              Ask me anything about FizzBuzz calculations or logic.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button 
                onClick={() => setMessage("What is the fizzbuzz value of 15?")}
                className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded border border-border transition-colors"
              >
                &quot;What is the fizzbuzz value of 15?&quot;
              </button>
            </div>
          </div>
        )}
        
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-muted text-muted-foreground rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow-sm">
              <Bot size={16} />
            </div>
            <div className="p-3 rounded-2xl bg-muted text-muted-foreground rounded-tl-none flex items-center gap-2 text-sm">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border bg-muted/10 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-background border border-input rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
        />
        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-sm active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
