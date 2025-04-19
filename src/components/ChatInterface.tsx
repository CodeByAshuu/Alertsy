
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";
import { mockResponses, detectProducts } from "@/lib/mockResponses";
import { Message, MessageType } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export const ChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Set initial welcome message
  useEffect(() => {
    const welcomeMessage = user 
      ? `👋 Welcome back, ${user.name}! What drops should I track for you today?`
      : "👋 Hi there! I'm your Alertsy assistant. I can help you track limited-edition products and notify you when they drop. What kind of exclusive items are you interested in?";
    
    setMessages([
      {
        id: "welcome",
        type: MessageType.BOT,
        text: welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      // Check if the message is about tracking products
      const { brands, keywords } = detectProducts(input);
      if (brands.length > 0 || keywords.length > 0 || 
          input.toLowerCase().includes("track") || 
          input.toLowerCase().includes("alert")) {
        
        // Show toast notification with more specific info
        const itemsToTrack = [...brands, ...keywords].filter(Boolean);
        const trackingItem = itemsToTrack.length > 0 
          ? itemsToTrack.join(", ") 
          : "these products";
          
        toast({
          title: "Tracking Enabled",
          description: `We'll alert you when ${trackingItem} drops!`,
        });
        
        // Simulate a drop notification after a delay for demonstration
        if (Math.random() > 0.5) { // 50% chance to show a drop alert
          setTimeout(() => {
            const brand = brands.length > 0 ? brands[0] : "Nike";
            const productType = keywords.length > 0 ? keywords[0] : "limited edition product";
            
            // Create more realistic drop message with verified data
            const dropAlert = {
              id: `drop-${Date.now()}`,
              type: MessageType.BOT,
              text: `🔥 DROP ALERT! ${brand} ${productType} is now available!\n\nProduct: ${brand} ${productType}\nAvailable at: Official ${brand} Store\n\nClick the link below to purchase:`,
              timestamp: new Date(),
              buttons: [{ text: "View Drop", url: `https://${brand.toLowerCase().replace(/\s+/g, '')}.com` }]
            };
            setMessages((prev) => [...prev, dropAlert]);
            
            toast({
              title: "🔥 New Drop Alert!",
              description: `${brand} ${productType} just released! Click to purchase.`,
              variant: "destructive",
            });
          }, 30000); // 30 seconds later
        }
      }
    }, 800 + Math.random() * 800); // Random delay between 0.8-1.6 seconds
  };

  const getBotResponse = (userInput: string): Message => {
    const inputLower = userInput.toLowerCase();
    
    // Check for off-topic questions
    const offTopicKeywords = ["weather", "joke", "food", "movie", "music", "sports", "politics", "news"];
    if (offTopicKeywords.some(keyword => inputLower.includes(keyword))) {
      return {
        id: Date.now().toString(),
        type: MessageType.BOT,
        text: "I'm here to help you track limited-edition product drops only. Let me know what you'd like to follow!",
        timestamp: new Date(),
      };
    }
    
    // Find matching response from mock data
    for (const pattern of Object.keys(mockResponses)) {
      if (new RegExp(pattern, "i").test(inputLower)) {
        const responsePattern = mockResponses[pattern];
        let responseText: string;
        
        if (typeof responsePattern === 'function') {
          // Call the function with the user's input
          responseText = responsePattern(userInput);
        } else {
          responseText = responsePattern;
        }
          
        return {
          id: Date.now().toString(),
          type: MessageType.BOT,
          text: responseText,
          timestamp: new Date(),
        };
      }
    }
    
    // Product detection if no pattern matched
    const { brands, keywords, category } = detectProducts(userInput);
    if (brands.length > 0 || keywords.length > 0 || category) {
      const trackResponse = mockResponses["track|alert|notify|follow"];
      let responseText: string;
      
      if (typeof trackResponse === 'function') {
        responseText = trackResponse(userInput);
      } else {
        responseText = "I'll track that for you!";
      }
      
      return {
        id: Date.now().toString(),
        type: MessageType.BOT,
        text: responseText,
        timestamp: new Date(),
      };
    }

    // Default response - more specific now
    return {
      id: Date.now().toString(),
      type: MessageType.BOT,
      text: "I couldn't find specific products in your message. Please mention a brand (like Nike, Adidas, Supreme) or product type (like sneakers, clothing, tech) you'd like me to track for you.",
      timestamp: new Date(),
    };
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-lg overflow-hidden border border-border">
      <div className="bg-brand-black p-3 flex items-center">
        <div className="w-3 h-3 rounded-full bg-brand-red mr-2 animate-pulse"></div>
        <h2 className="text-white font-bold">Alertsy Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
              <span className="text-brand-blue text-sm">🤖</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-muted text-foreground">
              <span className="inline-block align-middle">
                <span className="dot-typing"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="p-3 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about product drops..."
            className="flex-1 focus-visible:ring-brand-blue"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
