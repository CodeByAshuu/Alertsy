
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { ProductPreferences } from "@/components/ProductPreferences";
import { NotificationSettings } from "@/components/NotificationSettings";
import { UpcomingDrops } from "@/components/UpcomingDrops";
import { MessageSquare, ListChecks, Bell, Calendar } from "lucide-react";
import { LoginDialog } from "@/components/LoginDialog";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [loginOpen, setLoginOpen] = useState(false);

  // Set dark mode by default
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="bg-brand-black text-white py-4 border-b border-border/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-brand-red flex items-center justify-center mr-3 animate-pulse">
              <Bell className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold flex items-center">
              Alertsy
              <span className="ml-1 text-brand-gold">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button 
              onClick={() => setLoginOpen(true)} 
              className="bg-brand-red text-white hover:bg-red-600 transition"
            >
              Login
            </Button>
            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-brand-red to-brand-blue p-6 rounded-lg text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  Never Miss a Drop Again
                  <span className="ml-2 text-brand-gold">🔥</span>
                </h2>
                <p className="mb-4">
                  Our AI-powered bot will alert you when limited-edition items drop online, giving you the edge to grab them before they sell out.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm hover-scale">
                    <p className="text-xl font-bold">100+</p>
                    <p className="text-xs">Brands Tracked</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm hover-scale">
                    <p className="text-xl font-bold">24/7</p>
                    <p className="text-xs">Monitoring</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm hover-scale">
                    <p className="text-xl font-bold">30s</p>
                    <p className="text-xs">Alert Speed</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm hover-scale">
                    <p className="text-xl font-bold">50K+</p>
                    <p className="text-xs">Happy Users</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-muted">
                <TabsTrigger value="chat" className="flex items-center data-[state=active]:bg-brand-red data-[state=active]:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center data-[state=active]:bg-brand-red data-[state=active]:text-white">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center data-[state=active]:bg-brand-red data-[state=active]:text-white">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="h-[500px]">
                <ChatInterface />
              </TabsContent>
              <TabsContent value="preferences">
                <ProductPreferences />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <UpcomingDrops />
            
            <div className="bg-card rounded-lg shadow-lg p-5 border border-border">
              <h2 className="text-xl font-bold mb-4 border-b border-border pb-2 text-card-foreground flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-brand-red" />
                How It Works
              </h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Tell us what you want</h3>
                    <p className="text-sm text-muted-foreground">Chat with our AI to specify what products you're looking for</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Set up notifications</h3>
                    <p className="text-sm text-muted-foreground">Choose how you want to be alerted (email, SMS, browser)</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Get instant alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications as soon as your tracked items drop</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold">Never miss out again</h3>
                    <p className="text-sm text-muted-foreground">Be first in line for limited-edition products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-brand-black text-white py-6 mt-12 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-brand-red flex items-center justify-center mr-3">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold flex items-center">
                Alertsy 
                <span className="ml-1 text-brand-gold">AI</span>
              </span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Alertsy AI. Sagar Sahu 12326460. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
