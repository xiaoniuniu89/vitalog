"use client"
import { Button } from "@/components/ui/button"
import { useApplicationContext } from "@/context/ApplicationContext";

const SidePanel = () => {
  const { dashboard, setDashboard } = useApplicationContext();

  const handleDaily = () => {
    if(dashboard.daily) return;
    setDashboard({daily: true, weekly: false});
  };

  const handleWeekly = () => {
    if(dashboard.weekly) return;
    setDashboard({daily: false, weekly: true});
  }
  // const handleSummary = async () => {
  //   await fetch('/api/summary/weekly', { method: 'POST' });
  // };

  
    return (
      <div className="w-60 shadow-md sidepanel bg-vita-orange">
        <Button onClick={() => handleDaily()} variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Entries</Button>
        <Button onClick={() => handleWeekly()} variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Weekly Summary</Button>
        {/* <Button onClick={handleSummary} className="block px-4 py-2 text-gray-800 hover:text-gray-600">Generate Weekly Summary</Button> */}
      </div>
    );
  };

  export default SidePanel;