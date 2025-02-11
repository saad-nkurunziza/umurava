import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import * as React from "react";

interface ListInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: string[];
  onChange: (value: string[]) => void;
}

const ListInput = React.forwardRef<HTMLInputElement, ListInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [currentItem, setCurrentItem] = useState("");

    const addItem = () => {
      if (currentItem.trim() && !value.includes(currentItem.trim())) {
        onChange([...value, currentItem.trim()]);
        setCurrentItem("");
      }
    };

    const removeItem = (itemToRemove: string) => {
      onChange(value.filter((item: string) => item !== itemToRemove));
    };

    return (
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            ref={ref}
            {...props}
          />
          <Button type="button" onClick={addItem}>
            <Plus size="icon" className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
            >
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0"
                onClick={() => removeItem(item)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ListInput.displayName = "ListInput";
export { ListInput };
