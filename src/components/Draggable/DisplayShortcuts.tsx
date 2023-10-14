'use client';
import { useEffect, useRef, useState, ReactNode, useContext } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  Modifier,
  DragStartEvent,
  UniqueIdentifier,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import Shortcut from "./Shortcut";
import { restrictToBoundingRect } from "@/utils";
import { Context } from "../ContextProvider";

interface Icon {
  id: UniqueIdentifier;
  children: ReactNode;
};

interface Settings {
  width: number;
  height: number;
  numberOfShortcutsHorizontally: number;
  numberOfShortcutsVertically: number;
  activeId: UniqueIdentifier | null;
}

const DisplayShortcuts = () => {
  const { openWindow, openableWindows, shortCutRef, shortCutIconsList, updateShortCutIcon, initializeIcons } = useContext(Context);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [shortcutsSettings, setShortcutsSettings] = useState<Settings>({
    width: 0,
    height: 0,
    numberOfShortcutsHorizontally: 0,
    numberOfShortcutsVertically: 0,
    activeId: null,
  });

  const restrictToDivWrapper: Modifier = ({ draggingNodeRect, transform }) => {
    if (!draggingNodeRect || !innerDivRef.current?.getBoundingClientRect()) {
      return transform;
    }
    return restrictToBoundingRect(
      transform,
      draggingNodeRect,
      innerDivRef.current?.getBoundingClientRect()
    );
  };

  const handleDragStart = ({ active: { id } }: DragStartEvent) => {
    setShortcutsSettings((currentSettings) => ({
      ...currentSettings,
      activeId: id,
    }));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const newIconsList = [...shortCutIconsList];
      const oldIndex = newIconsList.map((icon) => icon.id).indexOf(active.id);
      const newIndex = newIconsList.map((icon) => icon.id).indexOf(over.id);

      const temp = newIconsList[oldIndex];
      newIconsList[oldIndex] = newIconsList[newIndex];
      newIconsList[newIndex] = temp;
      updateShortCutIcon(newIconsList);
      setShortcutsSettings((currentSettings) => {
        return {
          ...currentSettings,
          activeId: null,
        };
      });
    } else {
      setShortcutsSettings((currentSettings) => ({
        ...currentSettings,
        activeId: null,
      }));
    }
  };

  const handleDragCancel = () => {
    setShortcutsSettings((currentSettings) => ({
      ...currentSettings,
      activeId: null,
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (shortCutRef.current?.getBoundingClientRect()) {
      const numberOfShortcutsHorizontally = Math.floor(
        shortCutRef.current?.getBoundingClientRect().width / 144
      );
      const numberOfShortcutsVertically = Math.floor(
        shortCutRef.current?.getBoundingClientRect().height / 112
      );

      if (
        numberOfShortcutsHorizontally !==
          shortcutsSettings.numberOfShortcutsHorizontally &&
        numberOfShortcutsVertically !==
          shortcutsSettings.numberOfShortcutsVertically
      ) {
        const icons = openableWindows.map(({ icon, id }) => ({
          id,
          children: (
            <>
              {icon()}
              <div className="text-center">{id}</div>
            </>
          ),
        }));

        const disabledIcons: Icon[] = [];
        for (
          let i = 0;
          i <
          numberOfShortcutsHorizontally * numberOfShortcutsVertically -
            icons.length;
          i++
        ) {
          disabledIcons.push({
            id: `disabled-${crypto.randomUUID()}`,
            children: <></>,
          });
        }

        
        updateShortCutIcon(initializeIcons());

        setShortcutsSettings({
          activeId: null,
          width: numberOfShortcutsHorizontally * 144,
          height: numberOfShortcutsVertically * 112,
          numberOfShortcutsHorizontally,
          numberOfShortcutsVertically,
        });
      }
    }
  }, [
    initializeIcons,
    updateShortCutIcon,
    shortCutRef,
    openableWindows,
    shortcutsSettings.numberOfShortcutsHorizontally,
    shortcutsSettings.numberOfShortcutsVertically,
  ]);

  return (
    <div
      className={`h-full w-[calc(100%-theme(spacing.20))] right-0 bottom-0 absolute flex flex-col items-center justify-center`}
      ref={shortCutRef}
    >
      <div
        className="grid grid-flow-col"
        style={{
          width: shortcutsSettings.width,
          height: shortcutsSettings.height,
          gridTemplateColumns: `repeat(${shortcutsSettings.numberOfShortcutsHorizontally}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${shortcutsSettings.numberOfShortcutsVertically}, minmax(0, 1fr))`,
          direction: "rtl",
        }}
        ref={innerDivRef}
      >
        <DndContext
          sensors={sensors}
          modifiers={[restrictToDivWrapper]}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={shortCutIconsList}
            strategy={rectSwappingStrategy}
          >
            {shortCutIconsList.map(({ id }) => {
              const renderComponent = id.toString().includes("disabled") ? (
                <></>
              ) : (
                <>
                  {openableWindows.find((window) => window.id === id)?.icon()}
                  <div className="text-center">{id}</div>
                </>
              );
              return (
                <Shortcut
                  id={id}
                  key={id}
                  className={`flex flex-col items-center justify-center ${
                    id.toString().includes("disabled") ? "cursor-default" : ""
                  }`}
                  handleClick={() => {
                    if (!id.toString().includes("disabled"))
                      openWindow(id.toString());
                  }}
                >
                  {renderComponent}
                </Shortcut>
              );})}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default DisplayShortcuts;
