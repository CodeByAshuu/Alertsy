
import { useState } from "react";
import { CheckCircle, Bell, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface NotificationMethod {
  id: string;
  name: string;
  icon: typeof Bell;
  enabled: boolean;
  placeholderText: string;
  value: string;
}

export const NotificationSettings = () => {
  const { toast } = useToast();
  
  const [methods, setMethods] = useState<NotificationMethod[]>([
    {
      id: "email",
      name: "Email",
      icon: Mail,
      enabled: true,
      placeholderText: "your@email.com",
      value: "",
    },
    {
      id: "sms",
      name: "SMS",
      icon: MessageSquare,
      enabled: false,
      placeholderText: "Your phone number",
      value: "",
    },
    {
      id: "push",
      name: "Browser Push",
      icon: Bell,
      enabled: false,
      placeholderText: "",
      value: "",
    },
  ]);

  const toggleMethod = (id: string) => {
    setMethods(
      methods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const updateMethodValue = (id: string, value: string) => {
    setMethods(
      methods.map((method) =>
        method.id === id ? { ...method, value } : method
      )
    );
  };

  const handleSave = () => {
    const enabledMethods = methods.filter((method) => method.enabled);
    
    if (enabledMethods.length === 0) {
      toast({
        title: "No notification methods enabled",
        description: "Please enable at least one notification method.",
        variant: "destructive",
      });
      return;
    }
    
    const missingValues = enabledMethods.filter(
      (method) => method.placeholderText && !method.value
    );
    
    if (missingValues.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in all fields for ${missingValues.map(m => m.name).join(", ")}.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Notification settings saved!",
      description: `You'll receive alerts via: ${enabledMethods.map(m => m.name).join(", ")}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 border border-brand-lightGray">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-brand-black">Notification Settings</h2>
      
      <div className="space-y-4">
        {methods.map((method) => (
          <div key={method.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <method.icon className="h-4 w-4 text-brand-gray" />
                <span className="font-medium">{method.name}</span>
              </div>
              <Switch
                checked={method.enabled}
                onCheckedChange={() => toggleMethod(method.id)}
                className="data-[state=checked]:bg-brand-blue"
              />
            </div>
            
            {method.enabled && method.placeholderText && (
              <Input
                placeholder={method.placeholderText}
                value={method.value}
                onChange={(e) => updateMethodValue(method.id, e.target.value)}
                className="w-full focus-visible:ring-brand-blue"
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button
          onClick={handleSave}
          className="w-full bg-brand-blue hover:bg-cyan-500 text-white"
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};
