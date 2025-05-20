import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
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
    </div>
  );
}
