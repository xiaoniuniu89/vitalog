import { Button } from "@/components/ui/button"

const SidePanel = () => {
    return (
      <div className="w-60 shadow-md sidepanel">
        <Button variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Entries</Button>
        <Button variant="link" className="block px-4 py-2 text-gray-800 hover:text-gray-600">Weekly Summary</Button>
      </div>
    );
  };

  export default SidePanel;