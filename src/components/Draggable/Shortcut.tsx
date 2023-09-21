'use client';
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    id: UniqueIdentifier;
    className: string;
    handleClick?: () => void;
};

const Shortcut = ({children, id, className, handleClick = () => {}}: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable(
      {
        id,
        disabled: id.toString().includes("disabled") ? true : false,
      }
    );

    const transformStyles = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        className={className}
        ref={setNodeRef}
        style={{ ...transformStyles }}
        onClick={handleClick}
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    );
};

export default Shortcut;
