
// Enhanced mock responses for the chatbot
import { allBrands, allKeywords, productCategories } from './productDatabase';

// Helper function to detect product mentions in user input
export const detectProducts = (input: string): { 
  brands: string[], 
  keywords: string[], 
  category: string | null 
} => {
  const inputLower = input.toLowerCase();
  const detectedBrands: string[] = [];
  const detectedKeywords: string[] = [];
  let detectedCategory: string | null = null;

  // Check for brand mentions with improved matching (partial matches)
  allBrands.forEach(brand => {
    // Check for exact brand mentions or brand mentions with spaces/punctuation
    const brandRegex = new RegExp(`\\b${brand.toLowerCase().replace(/\s+/g, '[\\s-_]+')}\\b`, 'i');
    if (brandRegex.test(inputLower) || inputLower.includes(brand.toLowerCase())) {
      detectedBrands.push(brand);
    }
  });

  // Find which category was mentioned
  for (const [category, data] of Object.entries(productCategories)) {
    // Check if category name is mentioned
    if (inputLower.includes(category.toLowerCase())) {
      detectedCategory = category;
      break;
    }
    
    // Check for keywords from this category with better detection
    for (const keyword of data.keywords) {
      const keywordRegex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'i');
      if (keywordRegex.test(inputLower) || inputLower.includes(keyword.toLowerCase())) {
        detectedKeywords.push(keyword);
        if (!detectedCategory) detectedCategory = category;
      }
    }
    
    // Check for specific product examples with better detection
    for (const example of data.examples) {
      const exampleRegex = new RegExp(`\\b${example.toLowerCase().replace(/\s+/g, '[\\s-_]+')}\\b`, 'i');
      if (exampleRegex.test(inputLower) || inputLower.includes(example.toLowerCase())) {
        detectedKeywords.push(example);
        if (!detectedCategory) detectedCategory = category;
      }
    }
  }

  return { brands: detectedBrands, keywords: detectedKeywords, category: detectedCategory };
};

// Generate tracking confirmation message
const generateTrackingMessage = (brands: string[], keywords: string[], category: string | null): string => {
  let message = "🔔 ";
  
  if (brands.length > 0 && keywords.length > 0) {
    message += `Got it! I'll track ${brands.join(", ")} ${keywords.join(", ")} and alert you immediately when they drop.`;
  } else if (brands.length > 0) {
    message += `I've added ${brands.join(", ")} to your tracking list. I'll notify you about any exclusive drops right away!`;
  } else if (keywords.length > 0) {
    message += `I'll keep an eye out for ${keywords.join(", ")} and send you an alert as soon as they're available.`;
  } else if (category) {
    message += `I'll track popular ${category} releases for you. Is there a specific brand you're particularly interested in?`;
  } else {
    return "I'll track that for you! Is there anything specific about this product you're looking for?";
  }
  
  message += " You'll receive real-time notifications when they become available.";
  
  return message;
};

// Updated type definition to allow functions as response values
export const mockResponses: Record<string, string | ((input: string) => string)> = {
  "track|alert|notify|follow": (input: string) => {
    const { brands, keywords, category } = detectProducts(input);
    return generateTrackingMessage(brands, keywords, category);
  },
  
  "what.*(drop|release).*(today|tomorrow|this week|soon)": "🗓️ Here are the hottest upcoming drops:\n\n• Nike Dunk Low 'Panda' - Tomorrow at 10AM EST\n• Supreme Fall Collection - Thursday at 11AM EST\n• PlayStation 5 Restock - Friday at various retailers\n\nWould you like me to track any of these for you?",
  
  "remove|delete|stop.*(tracking|following)": "✅ I've removed that from your tracking list. You won't receive any more alerts about this item.",
  
  "notification|alert|settings|preferences": "📱 You can receive drop alerts through email, SMS, or browser notifications. Would you like to update your notification preferences?",
  
  "login|sign in|account": "🔑 You can log in using the button at the top right. Once logged in, your tracking preferences will be saved across devices.",
  
  "how.*(work|get notification|track)": "👋 Here's how Alertsy works:\n1️⃣ Tell me what products you want to track\n2️⃣ Set up your notification preferences\n3️⃣ I'll monitor hundreds of official sources 24/7\n4️⃣ When your items drop, you'll be the first to know with instant alerts",
  
  "help|command|what can you do": "🤖 I can help you:\n• Track product drops (e.g., \"Track Nike Dunks\")\n• Check upcoming releases (\"What's dropping today?\")\n• Manage your tracking list (\"Remove PS5 tracking\")\n• Set up notification preferences\n\nJust tell me what exclusive items you're interested in!",
  
  "thank|thanks|thx": "You're welcome! I'm here to make sure you never miss a drop. Let me know if there's anything else you'd like to track.",
};
