<<<<<<< HEAD
import { useState } from 'react';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
=======
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(false); // Hidden by default

  return (
    <div className="p-2 bg-card rounded-lg shadow mb-3">
      <div className="flex justify-between items-center mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1"
        >
          {isOpen ? (
            <>
              Hide Categories<ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show Categories <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex items-center gap-2",
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground border-none shadow-none'
              )}
              aria-pressed={selectedCategory === category.id}
            >
              {category.icon && <category.icon className="h-4 w-4" />}
              {category.name}
            </Button>
          ))}
        </div>
      )}
=======
  return (
    <div className="p-4 bg-card rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "flex items-center gap-2",
              selectedCategory === category.id ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {category.icon && <category.icon className="h-4 w-4" />}
            {category.name}
          </Button>
        ))}
      </div>
>>>>>>> 631a0da82fb7f7f3983885a7ef42e897e325a10a
    </div>
  );
}
