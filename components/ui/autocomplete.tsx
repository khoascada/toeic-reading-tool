'use client';

import * as React from 'react';
import { cn } from '@lib/utils';
import { Input } from './input';
import { Popover, PopoverAnchor, PopoverContent } from './popover';

export interface AutocompleteOption {
  value: string | number;
  label: string;
}

interface AutocompleteProps<T extends AutocompleteOption = AutocompleteOption> {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (option: T) => void;
  onFocus?: (value: string) => void;
  options: T[];
  placeholder?: string;
  renderOption?: (option: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  dataTour?: string;
}

const Autocomplete = <T extends AutocompleteOption = AutocompleteOption>({
  value,
  onChange,
  onSelect,
  onFocus,
  options,
  placeholder,
  renderOption,
  isLoading = false,
  emptyMessage = 'No results found',
  className,
  disabled,
  dataTour,
}: AutocompleteProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const [inputWidth, setInputWidth] = React.useState<number>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [value, open]);

  const handleSelect = (option: T) => {
    onChange(option.label);
    onSelect?.(option);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!open) setOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleFocus = () => {
    if (value) {
      setOpen(true);
    }
    onFocus?.(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <Input
          ref={inputRef}
          data-tour={dataTour}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
        />
      </PopoverAnchor>
      <PopoverContent
        className="p-1"
        style={{ width: inputWidth > 0 ? `${inputWidth}px` : 'auto' }}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <div className="text-muted-foreground px-2 py-4 text-center text-sm">Loading...</div>
        ) : options.length === 0 ? (
          <div className="text-muted-foreground px-2 py-4 text-center text-sm">{emptyMessage}</div>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'cursor-pointer rounded-sm px-2 py-1.5 text-sm',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground outline-none'
                )}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { Autocomplete };
