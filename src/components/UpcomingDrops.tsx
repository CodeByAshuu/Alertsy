
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Drop {
  id: string;
  name: string;
  brand: string;
  image: string;
  date: string;
  time: string;
  hot: boolean;
}

const upcomingDrops: Drop[] = [
  {
    id: "1",
    name: "Dunk Low Retro",
    brand: "Nike",
    image: "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/41e348a7-c6eb-47b7-b93a-332beea1cb10/dunk-low-retro-black-release-date.jpg",
    date: "April 10",
    time: "10:00 AM",
    hot: true,
  },
  {
    id: "2",
    name: "Yeezy Boost 350",
    brand: "Adidas",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/048/723/576/original/661100_00.png.png",
    date: "April 12",
    time: "12:00 PM",
    hot: false,
  },
  {
    id: "3",
    name: "Box Logo Hoodie",
    brand: "Supreme",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/078/240/291/original/993795_00.png.png",
    date: "April 15",
    time: "11:00 AM",
    hot: true,
  },
];

export const UpcomingDrops = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Drops</h2>
        <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue dark:text-brand-blue">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {upcomingDrops.map((drop) => (
          <div 
            key={drop.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border transition-all",
              drop.hot 
                ? "border-brand-red/20 bg-brand-red/5 dark:border-brand-red/30 dark:bg-brand-red/10" 
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
              <img 
                src={drop.image}
                alt={drop.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <p className="font-medium text-gray-900 dark:text-white">{drop.brand}</p>
                {drop.hot && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-brand-red text-white rounded">
                    HOT
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white truncate">{drop.name}</h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                <Calendar className="h-3 w-3 mr-1" /> {drop.date}
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 mr-1" /> {drop.time}
              </div>
            </div>
            
            <Button
              className="bg-brand-black dark:bg-gray-900 hover:bg-gray-800 text-white"
              size="sm"
            >
              Track
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
