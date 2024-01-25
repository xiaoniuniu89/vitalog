"use client"
import { Button } from "@/components/ui/button"

const SidePanel = () => {
  const handleSummary = async () => {
    await fetch('/api/summary/weekly', { method: 'POST' });
  };
  
    return (
      <div className="w-60 shadow-md sidepanel">
        <Button variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Entries</Button>
        <Button variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Weekly Summary</Button>
        <Button onClick={handleSummary} className="block px-4 py-2 text-gray-800 hover:text-gray-600">Generate Weekly Summary</Button>
      </div>
    );
  };

  export default SidePanel;