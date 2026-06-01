import {
  type LucideProps,
  HardHat,
  Zap,
  Cpu,
  Hammer,
  Building2,
  KeyRound,
  CalendarClock,
  CheckCircle2,
  Users,
  MessageSquare,
  PencilRuler,
  ShieldCheck,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  Menu,
  Sun,
  Moon,
  HelpCircle,
} from "lucide-react";

/**
 * Curated icon registry. Content data (services, stats, process steps) refer
 * to icons by *name* (a string) so the data stays serialisable; this map
 * resolves the name to a real component.
 *
 * Why a curated map instead of importing all of lucide dynamically? Dynamic
 * lookup defeats tree-shaking and would bundle ~1,500 icons. Listing only the
 * icons we use keeps the JS payload tiny — which protects Core Web Vitals.
 * Agents: add any new icon you need to this object.
 */
const registry = {
  HardHat,
  Zap,
  Cpu,
  Hammer,
  Building2,
  KeyRound,
  CalendarClock,
  CheckCircle2,
  Users,
  MessageSquare,
  PencilRuler,
  ShieldCheck,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  Menu,
  Sun,
  Moon,
} as const;

export type IconName = keyof typeof registry | (string & {});

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = registry[name as keyof typeof registry] ?? HelpCircle;
  return <Cmp {...props} />;
}
