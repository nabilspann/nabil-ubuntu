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
  DragOverEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  rectSwappingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Image, { StaticImageData } from "next/image";
import Shortcut from "./Shortcut";
import { restrictToBoundingRect } from "@/utilFunctions";
import documentViewer from "../../../public/images/document-viewer.png";
import ChromeIcon from "../svgs/ChromeIcon";
import TaskIconWrapper from "../TaskIconWrapper";
import { Context } from "../ContextProvider";

interface IconsList {
  id: UniqueIdentifier;
  children: ReactNode;
};

interface Settings {
  width: number;
  height: number;
  numberOfShortcutsHorizontally: number;
  numberOfShortcutsVertically: number;
  icons: IconsList[];
  activeId: UniqueIdentifier | null;
  overId: UniqueIdentifier | null;
}



const DisplayShortcuts = () => {
  const { openWindow } = useContext(Context);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [shortcutsSettings, setShortcutsSettings] = useState<Settings>({
    width: 0,
    height: 0,
    numberOfShortcutsHorizontally: 0,
    numberOfShortcutsVertically: 0,
    icons: [],
    activeId: null,
    overId: null,
  });

  const restrictToDivWrapper: Modifier = ({
    draggingNodeRect,
    transform,
  }) => {
    if (!draggingNodeRect || !innerDivRef.current?.getBoundingClientRect()) {
      return transform;
    }
    return restrictToBoundingRect(
      transform,
      draggingNodeRect,
      innerDivRef.current?.getBoundingClientRect()
    );
  };

  
  const icons = [
    {
      id: "Document viewer 1",
      children: (
        <>
          <Image
            src={documentViewer}
            alt="document viewer 1"
            width={50}
            height={50}
          />
          <div className="text-center">Document Viewer 1</div>
        </>
      ),
    },
    {
      id: "Document viewer 2",
      children: (
        <>
          <Image
            src={documentViewer}
            alt="document viewer 2"
            width={50}
            height={50}
          />
          <div className="text-center">Document Viewer 2</div>
        </>
      ),
    },
    {
      id: "Chrome Icon",
      children: (
        <>
          <ChromeIcon />
          <div className="text-center">Google Chrome</div>
        </>
      ),
    },
  ];

  const handleDragStart = ({active: {id}}: DragStartEvent) => {
    // console.log("drag start id", id)
    setShortcutsSettings(currentSettings => ({
      ...currentSettings,
      activeId: id
    }))
  }

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (over && active.id !== over.id) {
      setShortcutsSettings((currentSettings) => {
        // const { icons } = currentSettings;
        const newIconsList = [ ...currentSettings.icons ];
        const oldIndex = newIconsList.map((icon) => icon.id).indexOf(active.id);
        const newIndex = newIconsList
          .map((icon) => icon.id)
          .indexOf(over.id);

        const temp = newIconsList[oldIndex];
        newIconsList[oldIndex] = newIconsList[newIndex];
        newIconsList[newIndex] = temp;
        return {
          ...currentSettings,
          activeId: null,
          icons: newIconsList,
          overId: null,
        };
      });
    }else{
      setShortcutsSettings(currentSettings => ({
        ...currentSettings,
        activeId: null,
        overId: null,
      }))
    }
  }

  const handleDragMove = ({over}: DragMoveEvent) => {
    // console.log("over", over)
    if(over){
      setShortcutsSettings((currentSettings) => ({
        ...currentSettings,
        overId: over.id,
      }));
    }
  }

  const handleDragCancel = () => {
    setShortcutsSettings((currentSettings) => ({
      ...currentSettings,
      activeId: null,
      overId: null
    }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (outerDivRef.current?.getBoundingClientRect()) {
      const numberOfShortcutsHorizontally = Math.floor(
        outerDivRef.current?.getBoundingClientRect().width / 144
      );
      const numberOfShortcutsVertically = Math.floor(
        outerDivRef.current?.getBoundingClientRect().height / 112
      );

      const disabledIcons: IconsList[] = [];
      for(let i = 0;  i < numberOfShortcutsHorizontally * numberOfShortcutsVertically - icons.length; i++){
        disabledIcons.push({ id: `disabled-${crypto.randomUUID()}`, children: <></>});
      }

      setShortcutsSettings({
        overId: null,
        activeId: null,
        width: numberOfShortcutsHorizontally * 144,
        height: numberOfShortcutsVertically * 112,
        numberOfShortcutsHorizontally,
        numberOfShortcutsVertically,
        icons: [...icons, ...disabledIcons]
      });
    }
  }, [outerDivRef]);

  console.log("shortcutSettings overid", shortcutsSettings.overId)
  return (
    <div
      className={`h-[calc(100%-theme(spacing.10))] w-[calc(100%-theme(spacing.20))] right-0 bottom-0 absolute flex flex-col items-center justify-center`}
      ref={outerDivRef}
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
          // onDragOver={handleDragMove}
          onDragMove={handleDragMove}
        >
          <SortableContext
            items={shortcutsSettings.icons}
            strategy={rectSwappingStrategy}
          >
            {shortcutsSettings.icons.map(({ id, children }) => (
              <Shortcut
                id={id}
                key={id}
                className={`flex flex-col items-center justify-center ${
                  id.toString().includes("disabled") ? "cursor-default" : ""
                }`}
              >
                {children}
              </Shortcut>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default DisplayShortcuts;
