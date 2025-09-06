"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CodeXml, X } from "lucide-react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { TechIcon } from "../../pages/Projects";
const iconMap = { ...SiIcons, ...FaIcons };

// const TechIcon = (icon) => {
//   const Icon = iconMap[icon?.component];
//   return Icon ? (
//     <Icon className="w-4 h-4" style={{ color: icon?.color }} />
//   ) : (
//     <CodeXml className="w-4 h-4" />
//   );
// };

export const TextField = ({ id, label, placeholder, error, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} placeholder={placeholder} />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export const TextAreaField = ({ id, label, placeholder, error, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea
      id={id}
      {...props}
      placeholder={placeholder}
      className="resize-none"
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export const FileField = ({ id, label, error, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="file" {...props} />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export const BadgeList = ({ items, removeItem }) => (
  <>
    {console.log(items)}
    <div className="flex flex-wrap gap-2 mt-2">
      {items?.map((item,i) => (
        <Badge
          key={`${item?.name || item}-${i}`}
          variant="secondary"
          className="gap-1 flex items-center">
          {item.icon && TechIcon(item.icon || item)}
          {item.name || item}
          <button
            type="button"
            onClick={() => removeItem(item.name || item)}
            className="ml-1 hover:text-destructive">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  </>
);
