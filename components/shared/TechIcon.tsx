"use client";

import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTailwindcss,
  SiCplusplus,
  SiPython,
  SiLinux,
  SiGit,
  SiPostman,
  SiSocketdotio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  FaAws,
  SiJavascript,
  SiTypescript,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTailwindcss,
  SiCplusplus,
  SiPython,
  SiLinux,
  SiGit,
  SiPostman,
  SiSocketdotio,
};

interface TechIconProps {
  name: string;
  color?: string;
  className?: string;
}

export function TechIcon({ name, color, className = "h-4 w-4 shrink-0" }: TechIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} style={color ? { color } : undefined} />;
}
