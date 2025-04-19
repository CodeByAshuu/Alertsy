
import { Message, MessageType } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.type === MessageType.BOT;
  
  // Check if message contains a drop alert
  const isDropAlert = isBot && message.text.includes("DROP ALERT");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div className={cn(
        "flex items-start max-w-[80%]",
        isBot ? "flex-row" : "flex-row-reverse"
      )}>
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            isBot 
              ? isDropAlert 
                ? "bg-brand-red/20 mr-2" 
                : "bg-brand-blue/10 mr-2" 
              : "bg-brand-red/10 ml-2"
          )}
        >
          <span className={cn(
            "text-sm",
            isBot 
              ? isDropAlert 
                ? "text-brand-red" 
                : "text-brand-blue" 
              : "text-brand-red"
          )}>
            {isBot ? (isDropAlert ? "🔥" : "🤖") : "👤"}
          </span>
        </div>
        
        <div>
          <div
            className={cn(
              "px-4 py-2 rounded-lg whitespace-pre-wrap",
              isBot
                ? isDropAlert 
                  ? "bg-brand-red/10 text-foreground border border-brand-red/20 rounded-tl-none"
                  : "bg-muted text-foreground rounded-tl-none"
                : "bg-brand-red text-white rounded-tr-none"
            )}
          >
            {message.text}
          </div>
          
          {/* Display button if available */}
          {isBot && message.buttons && message.buttons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.buttons.map((button, index) => (
                <Button 
                  key={index}
                  size="sm"
                  variant="outline"
                  className="border-brand-red/50 text-brand-red hover:bg-brand-red/10 dark:hover:bg-brand-red/20 flex items-center gap-1"
                  onClick={() => window.open(button.url, "_blank", "noopener,noreferrer")}
                >
                  {button.text}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
