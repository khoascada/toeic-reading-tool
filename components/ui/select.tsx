'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, CircleX } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

/**
 * Select - Component gốc, container chính quản lý state và logic của select dropdown
 * Bọc tất cả các component con bên trong
 */
const Select = SelectPrimitive.Root;

/**
 * SelectGroup - Nhóm các options lại với nhau, dùng để phân loại các mục trong dropdown
 * Thường kết hợp với SelectLabel để tạo nhóm có tiêu đề
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue - Hiển thị giá trị đã được chọn hoặc placeholder khi chưa chọn
 * Được đặt bên trong SelectTrigger để hiển thị text
 */
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger - Nút trigger để mở/đóng dropdown menu
 * Hiển thị giá trị đã chọn (SelectValue) và icon mũi tên xuống
 * Component này là phần người dùng click vào để mở dropdown
 */
const selectTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-md border border-input bg-transparent shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap [&>span]:line-clamp-1',
  {
    variants: {
      size: {
        default: 'h-9 px-3 py-2 text-base md:text-sm',
        small: 'h-8 px-3 py-2 text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants> & {
      onClear?: (e?: React.MouseEvent) => void;
    }
>(({ className, children, onClear, size, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ size, className }))}
    {...props}
  >
    {children}
    <div className="flex items-center gap-2">
      {onClear && (
        <span
          className="text-muted-foreground/50 hover:text-foreground flex cursor-pointer items-center justify-center transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear(e);
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <CircleX className="h-4 w-4" />
        </span>
      )}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </div>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton - Nút scroll lên trên khi danh sách options quá dài
 * Tự động hiển thị khi có nhiều items và cần scroll
 */
const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton - Nút scroll xuống dưới khi danh sách options quá dài
 * Tự động hiển thị khi có nhiều items và cần scroll
 */
const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent - Container chứa danh sách các options (SelectItem)
 * Có animation khi mở/đóng, hỗ trợ positioning (popper hoặc absolute)
 * Tự động thêm SelectScrollUpButton và SelectScrollDownButton khi cần
 */
const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[calc(var(--radix-select-content-available-height)-30px)] min-w-[8rem] overflow-hidden rounded-md border shadow-md`,
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectLabel - Tiêu đề/label cho một nhóm options
 * Dùng để phân loại và mô tả các options trong SelectGroup
 * Ví dụ: "Vai trò", "Danh mục", etc.
 */
const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectItem - Một option/item trong danh sách dropdown
 * Hiển thị text và icon check mark khi được chọn
 * Component này được click để chọn giá trị
 */
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator - Đường phân cách (divider) giữa các nhóm options
 * Dùng để tách biệt các nhóm options khác nhau trong dropdown
 * Tạo visual separation giữa các phần
 */
const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
