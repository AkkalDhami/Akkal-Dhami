import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Code2,
  Database,
  Cloud,
  Palette,
  Settings,
} from "lucide-react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

const Icons = { ...SiIcons, ...FaIcons };

const getIcon = (iconPath, fallback) => {
  const icon = iconPath;
  return icon && typeof icon === "function" ? icon : fallback;
};

// Popular tech with colors
const popularIcons = {
  React: { icon: getIcon(Icons.SiReact, Code2), color: "#61DAFB" },
  Vue: { icon: getIcon(Icons.SiVuedotjs, Code2), color: "#42B883" },
  Angular: { icon: getIcon(Icons.SiAngular, Code2), color: "#DD0031" },
  JavaScript: { icon: getIcon(Icons.SiJavascript, Code2), color: "#F7DF1E" },
  TypeScript: { icon: getIcon(Icons.SiTypescript, Code2), color: "#3178C6" },
  HTML: { icon: getIcon(Icons.SiHtml5, Code2), color: "#E34F26" },
  CSS: { icon: getIcon(Icons.SiCss3, Code2), color: "#1572B6" },
  Sass: { icon: getIcon(Icons.SiSass, Code2), color: "#CC6699" },
  Tailwind: { icon: getIcon(Icons.SiTailwindcss, Code2), color: "#06B6D4" },
  Bootstrap: { icon: getIcon(Icons.SiBootstrap, Code2), color: "#7952B3" },
  Redux: { icon: getIcon(Icons.SiRedux, Code2), color: "#764ABC" },

  Node: { icon: getIcon(Icons.SiNodedotjs, Settings), color: "#339933" },
  Python: { icon: getIcon(Icons.SiPython, Code2), color: "#3776AB" },
  Java: { icon: getIcon(Icons.SiJava, Code2), color: "#007396" },
  PHP: { icon: getIcon(Icons.SiPhp, Code2), color: "#777BB4" },
  Ruby: { icon: getIcon(Icons.SiRuby, Code2), color: "#CC342D" },
  Go: { icon: getIcon(Icons.SiGo, Code2), color: "#00ADD8" },
  Rust: { icon: getIcon(Icons.SiRust, Code2), color: "#000000" },
  Express: { icon: getIcon(Icons.SiExpress, Settings), color: "" },
  Django: { icon: getIcon(Icons.SiDjango, Settings), color: "#092E20" },
  Flask: { icon: getIcon(Icons.SiFlask, Settings), color: "#000000" },

  MongoDB: { icon: getIcon(Icons.SiMongodb, Database), color: "#47A248" },
  PostgreSQL: { icon: getIcon(Icons.SiPostgresql, Database), color: "#336791" },
  MySQL: { icon: getIcon(Icons.SiMysql, Database), color: "#4479A1" },
  Drizzle: { icon: getIcon(Icons.SiDrizzle, Database), color: "#c5f74f" },
  Redis: { icon: getIcon(Icons.SiRedis, Database), color: "#DC382D" },
  Firebase: { icon: getIcon(Icons.SiFirebase, Database), color: "#FFCA28" },
  Supabase: { icon: getIcon(Icons.SiSupabase, Database), color: "#3ECF8E" },

  VSCODE: { icon: getIcon(Icons.SiVscodium, Settings), color: "#007acc" },
  Postman: { icon: getIcon(Icons.SiPostman, Settings), color: "#ff6c37" },
  AWS: { icon: getIcon(Icons.SiAmazonaws, Cloud), color: "#FF9900" },
  Docker: { icon: getIcon(Icons.SiDocker, Settings), color: "#2496ED" },
  Kubernetes: { icon: getIcon(Icons.SiKubernetes, Settings), color: "#326CE5" },
  Git: { icon: getIcon(Icons.SiGit, Code2), color: "#F05032" },
  GitHub: { icon: getIcon(Icons.SiGithub, Code2), color: "" },
  GitLab: { icon: getIcon(Icons.SiGitlab, Code2), color: "#FC6D26" },
  Vercel: { icon: getIcon(Icons.SiVercel, Cloud), color: "" },
  Netlify: { icon: getIcon(Icons.SiNetlify, Cloud), color: "#00C7B7" },

  Figma: { icon: getIcon(Icons.SiFigma, Palette), color: "#F24E1E" },
  Adobe: { icon: getIcon(Icons.SiAdobe, Palette), color: "#FF0000" },
  Sketch: { icon: getIcon(Icons.SiSketch, Palette), color: "#F7B500" },

  LinkedIn: { icon: getIcon(Icons.SiLinkedin, Palette), color: "#0a66c2" },
};

export function IconPicker({
  value,
  onChange,
  placeholder = "Select an icon",
  onSelectName,
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = Object.entries(popularIcons).filter(([name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName, IconComponent, color) => {
    onChange({ name: iconName, component: IconComponent, color });
    if (onSelectName) onSelectName(iconName); // auto-fill input
    setOpen(false);
    setSearchTerm("");
  };

  const SelectedIcon = value?.component;

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start gap-2 bg-transparent">
            {value && SelectedIcon ? (
              <>
                <SelectedIcon
                  className="h-4 w-4"
                  style={{ color: value.color }}
                />
                {value.name}
              </>
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <ScrollArea className="h-[260px]">
            <div className="grid grid-cols-4 gap-2 p-3">
              {filteredIcons.map(([name, { icon: IconComponent, color }]) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="sm"
                  className="h-12 flex flex-col gap-1 p-2"
                  onClick={() => handleIconSelect(name, IconComponent, color)}>
                  <IconComponent className="h-5 w-5" style={{ color }} />
                  <span className="text-xs truncate w-full">{name}</span>
                </Button>
              ))}
            </div>
            {filteredIcons.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No icons found
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
