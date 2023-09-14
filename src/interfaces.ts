export interface SVGProps {
  size: number;
  color?: string;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
};

export interface Position {
  x: number;
  y: number;
}

export interface WindowSettings {
  isOpen: boolean;
  isTransitioning: boolean;
  type: "close-window" | "minimize-window" | null;
  position: Position;
  size: Size;
  fullScreen: {
    isTransitioning: boolean;
    isFullScreen: boolean;
    unMaximizedSize: Size;
    unMaximizedPosition: Position;
  };
};
