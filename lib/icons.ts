import type { LucideProps } from "lucide-react";
import { Scale, Atom, Layers, Flower2, Flame, Infinity, Heart, Users } from "lucide-react";

/**
 * Shared icon map for darshana accent icons.
 * Used on the home page grid and individual school pages.
 */
export const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
    scale: Scale,
    atom: Atom,
    layers: Layers,
    flower: Flower2,
    flame: Flame,
    infinity: Infinity,
    heart: Heart,
    users: Users,
};
