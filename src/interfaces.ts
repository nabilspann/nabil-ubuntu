export interface SVGProps {
  size: number;
  color?: string;
}

export interface WindowSettings {
  isOpen: boolean;
  type: "close-window" | "minimize-window" | null;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  transform: string | undefined;
}
