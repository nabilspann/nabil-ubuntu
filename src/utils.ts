import type { Transform } from "@dnd-kit/utilities";
import { ClientRect } from "@dnd-kit/core";

export const restrictToBoundingRect = (
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform => {
  const value = {
    ...transform,
  };
  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }
  return value;
};

export const weekNames = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];

export const LOCK_SCREEN = "lock-screen";
