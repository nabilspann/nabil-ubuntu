import type {CSSProperties} from 'react';

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
  isTransitioning: boolean;
  type: "close-window" | "minimize-window" | "unminimize-window" | "fullscreen-window" | "initialize-window" | null;
  position: Position;
  size: Size;
  fullScreen: {
    isFullScreen: boolean;
    unMaximizedSize: Size;
    unMaximizedPosition: Position;
  };
  preMinimizeMeasurements: {
    yTransform: number;
    xTransform: number;
    dockIconToWindowWidthRatio: number;
    dockIconToWindowHeightRatio: number;
    position: Position;
  };
};
