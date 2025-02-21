import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface DropdownItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  isHeader?: boolean;
  group?: string;
}

type DropdownVariant = "default" | "grouped";

interface BaseDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  variant?: DropdownVariant;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

interface DefaultDropdownProps extends BaseDropdownProps {
  variant?: "default";
}

interface GroupedDropdownProps extends BaseDropdownProps {
  variant: "grouped";
  groupBy?: (item: DropdownItem) => string;
}

type DropdownProps = DefaultDropdownProps | GroupedDropdownProps;

const getMaxWidthClass = (maxWidth?: "sm" | "md" | "lg" | "xl") => {
  switch (maxWidth) {
    case "sm":
      return "max-w-[200px]";
    case "md":
      return "max-w-[300px]";
    case "lg":
      return "max-w-[400px]";
    case "xl":
      return "max-w-[500px]";
    default:
      return "max-w-[200px]";
  }
};

const DefaultDropdownContent = ({ items }: { items: DropdownItem[] }) => (
  <div className="grid gap-0.5 p-1">
    {items.map((item) =>
      item.isHeader ? (
        <div
          key={item.title}
          className="px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground"
        >
          {item.title}
        </div>
      ) : (
        <Link
          key={item.title}
          href={item.href}
          className="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-sm font-medium">{item.title}</p>
            {item.badge && (
              <span className="ml-auto rounded border bg-white px-1.5 py-0.5 text-xs font-bold text-black dark:bg-zinc-800 dark:text-zinc-400">
                {item.badge}
              </span>
            )}
          </div>
        </Link>
      ),
    )}
  </div>
);

const GroupedDropdownContent = ({
  items,
  groupBy,
}: {
  items: DropdownItem[];
  groupBy: (item: DropdownItem) => string;
}) => {
  const groups = items.reduce(
    (acc, item) => {
      const groupName = groupBy(item);
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(item);
      return acc;
    },
    {} as Record<string, DropdownItem[]>,
  );

  return (
    <div
      className={`grid ${Object.keys(groups).length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-0.5 p-1`}
    >
      {Object.entries(groups).map(([groupName, groupItems], idx) => (
        <div key={groupName} className={idx > 0 ? "border-l pl-2" : ""}>
          <div className="px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground">
            {groupName}
          </div>
          {groupItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                {item.badge && (
                  <span className="ml-auto rounded border bg-white px-1.5 py-0.5 text-xs font-bold text-black dark:bg-zinc-800 dark:text-zinc-400">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

const Dropdown = (props: DropdownProps) => {
  const { trigger, items, className, maxWidth = "sm" } = props;

  const renderContent = () => {
    if (props.variant === "grouped" && props.groupBy) {
      return <GroupedDropdownContent items={items} groupBy={props.groupBy} />;
    }
    return <DefaultDropdownContent items={items} />;
  };

  return (
    <div className={cn("group relative", className)}>
      <div className="flex items-center gap-1">
        {trigger}
        <ChevronDown className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
      </div>
      <div
        className={cn(
          "invisible absolute left-1/2 top-full z-50 mt-2 w-screen",
          getMaxWidthClass(maxWidth),
          "-translate-x-1/2 transform opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-lg border bg-white shadow-lg ring-black ring-opacity-5 dark:bg-background",
          )}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
