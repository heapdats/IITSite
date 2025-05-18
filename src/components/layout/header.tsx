import { Button } from "@/components/ui/button";
import { Newspaper, PlusCircle } from "lucide-react";

interface HeaderProps {
  onAddFeedClick: () => void;
}

export function Header({ onAddFeedClick }: HeaderProps) {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">IIT Pedia</h1>
        </div>
        <Button onClick={onAddFeedClick} variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add RSS Feed
        </Button>
      </div>
    </header>
  );
}
