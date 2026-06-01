import type { ProcessStep, Stat } from "./types";

/** Headline numbers shown on the home + about pages (animated count-up). */
export const stats: Stat[] = [
  { label: "Years of Experience", value: 20, suffix: "+", icon: "CalendarClock" },
  { label: "Projects Completed", value: 450, suffix: "+", icon: "CheckCircle2" },
  { label: "Happy Clients", value: 380, suffix: "+", icon: "Users" },
  { label: "Team Members", value: 35, suffix: "+", icon: "HardHat" },
];

/** The "how we work" process timeline. */
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description:
      "We listen to your goals, assess the site, and give you a clear, honest scope and quote.",
    icon: "MessageSquare",
  },
  {
    step: 2,
    title: "Design & Planning",
    description:
      "Detailed plans, permits and a fixed schedule — so there are no surprises once we break ground.",
    icon: "PencilRuler",
  },
  {
    step: 3,
    title: "Build & Execute",
    description:
      "Our licensed crews deliver with daily oversight, quality checks and transparent updates.",
    icon: "Hammer",
  },
  {
    step: 4,
    title: "Handover & Support",
    description:
      "A thorough walkthrough, full documentation, and ongoing support long after we finish.",
    icon: "KeyRound",
  },
];
