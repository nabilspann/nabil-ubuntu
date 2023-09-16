'use client';
import { useDraggable } from "@dnd-kit/core";

const Shortcut = () => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable(
      {
        id: "short cut id",
      }
    );

    const transformStyles = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
    : undefined;

    return (
        <div
            className="absolute"
            ref={setNodeRef}
            style={{...transformStyles}}
            {...listeners}
            {...attributes}
        >
            SHORTCUTS
        </div>
    );
};

export default Shortcut;
