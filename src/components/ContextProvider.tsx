'use client';
import { createContext, useState, ReactNode, RefObject, useRef, useEffect } from 'react';
import { getCookie, setCookie } from "cookies-next";
import { UniqueIdentifier } from '@dnd-kit/core';
import OpenableWindowsList from './WindowList';
import { INITIALIZE } from '@/utils';

interface Props {
  children: ReactNode;
}

type ChangeMenu = string | null;

interface OpenedMenu {
  openedMenu: ChangeMenu;
  refArr: Array<RefObject<HTMLElement>>;
}

interface Window {
  name: string;
  zIndex: number;
  topBarComp: ReactNode;
  wrappedBody: ReactNode;
  isMinimized: boolean;
  dockIconRect: DOMRect;
}

interface OpenableWindowsListType {
  id: string;
  topBarComp: ReactNode;
  wrappedBody: ReactNode;
  taskBarIconRef: RefObject<HTMLDivElement>;
  icon: (size?: number) => ReactNode;
}

interface Icon {
  id: UniqueIdentifier;
};

interface ContextType {
  topBarDropDown: OpenedMenu;
  changeMenu: (x: ChangeMenu) => void;
  volume: number;
  changeVolume: (volume: number) => void;
  windows: Window[];
  openWindow: (id: string) => void;
  focusWindow: (windowIndex: number) => void;
  closeWindow: (windowIndex: number) => void;
  minimizeWindow: (windowIndex: number) => void;
  openableWindows: OpenableWindowsListType[];
  isShowApplicationsOpen: boolean;
  setIsShowApplicationsOpen: (isOpen: boolean) => void;
  backgroundImageId: string;
  changeBackgroundImage: (imageId: string) => void;
  sessionChangeType:
    | "lock-screen"
    | "shut-down"
    | "restart-session"
    | "reset-ubuntu"
    | "initialize"
    | null;
  changeSession: (sessionType: ContextType["sessionChangeType"] | null) => void;
  shortCutRef: RefObject<HTMLDivElement>;
  shortCutIconsList: Icon[];
  updateShortCutIcon: (icons: Icon[]) => void;
  initializeIcons: () => Icon[];
  resetContextAndLocalStorage: () => void;
}

const isJson = (str: string | null) => {
  if(!str) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

let storedShortCutIcons: Icon[] | null = null;
if (typeof window !== "undefined") {
  const storedIconValue = window.localStorage.getItem("ubuntu-shortcut-icons");
  storedShortCutIcons = isJson(storedIconValue)
    ? JSON.parse(storedIconValue as string)
    : null;
}

const defaultState = {
  topBarDropDown: {
    openedMenu: null,
    refArr: [],
  },
  volume: 50,
  changeMenu: () => {},
  changeVolume: () => {},
  windows: [],
  openWindow: (id: string) => {},
  focusWindow: () => {},
  closeWindow: () => {},
  minimizeWindow: () => {},
  openableWindows: [],
  shortcutIcons: [],
  isShowApplicationsOpen: false,
  setIsShowApplicationsOpen: (isOpen: boolean) => {},
  // backgroundImageId,
  // backgroundImageId: "jellyfish",
  backgroundImageId: getCookie("ubuntu-backgroundId") || "jellyfish",
  changeBackgroundImage: () => {},
  sessionChangeType: null,
  changeSession: (sessionType: string | null) => {},
  shortCutRef: { current: null },
  shortCutIconsList: [],
  updateShortCutIcon: (icons: Icon[]) => {},
  initializeIcons: () => [],
  resetContextAndLocalStorage: () => {},
};

export const Context = createContext<ContextType>(defaultState);

export const ContextProvider = ({children}: Props) => {
  const [topBarDropDown, setTopBarDropDown] = useState<OpenedMenu>(
    defaultState.topBarDropDown
  );
  const [volume, setCurrentVolume] = useState(defaultState.volume);
  const [windows, setWindows] = useState<Window[]>(defaultState.windows);
  const [isShowApplicationsOpen, setIsShowApplicationsOpen] = useState(
    defaultState.isShowApplicationsOpen
  );
  const [backgroundImageId, setBackgroundImageId] = useState(
    defaultState.backgroundImageId
  );
  const [sessionChangeType, setSessionChangeType] = useState<
    ContextType["sessionChangeType"]
  >(defaultState.sessionChangeType);
  const shortCutRef = useRef<HTMLDivElement>(null);

  const openableWindows = OpenableWindowsList();

  const initializeIcons = (resetIconsBackToOriginal = false) => {
    let useLocallyStoredIcons = true;
    const clickableIcons = storedShortCutIcons?.filter(
      (icon) => !icon.id.toString().includes("disabled")
    );
    useLocallyStoredIcons = clickableIcons?.length === openableWindows.length;
    openableWindows?.forEach((icon) => {
      const matchIcon = storedShortCutIcons?.find(
        (localStorageIcon) => localStorageIcon.id === icon.id
      );
      if (!matchIcon) {
        useLocallyStoredIcons = false;
      }
    });

    if (
      !resetIconsBackToOriginal &&
      storedShortCutIcons &&
      useLocallyStoredIcons
    ) {
      return [...storedShortCutIcons];
    } else if (shortCutRef.current?.getBoundingClientRect()) {
      const numberOfShortcutsHorizontally = Math.floor(
        shortCutRef.current?.getBoundingClientRect().width / 144
      );
      const numberOfShortcutsVertically = Math.floor(
        shortCutRef.current?.getBoundingClientRect().height / 112
      );

      const icons = openableWindows.map(({ id }) => ({
        id,
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
        });
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "ubuntu-shortcut-icons",
          JSON.stringify([...icons, ...disabledIcons])
        );
      }

      return [...icons, ...disabledIcons];
    }
    return [];
  };

  const [shortCutIconsList, setShortCutIconsList] = useState<Icon[]>([]);

  // useEffect(() => {
  //     console.log(
  //       "inside if",
  //       window.localStorage.getItem("ubuntu-backgroundId") || "jellyfish"
  //     );
  //     const backgroundId =
  //       localStorage.getItem("ubuntu-backgroundId") || "jellyfish";
  //     setBackgroundImageId(backgroundId);
  // }, []);

  // useEffect(() => {
  //     // console.log(
  //     //   "inside if",
  //     //   window.localStorage.getItem("ubuntu-backgroundId") || "jellyfish"
  //     // );
  //     const backgroundId = getCookie("ubuntu-backgroundId") || "jellyfish";
  //     setBackgroundImageId(backgroundId);
  // }, []);

  const changeMenu = (setting: ChangeMenu) => {
    let openedMenu = setting;
    if (setting === topBarDropDown.openedMenu) {
      openedMenu = null;
    }
    setTopBarDropDown((prevState) => ({ ...prevState, openedMenu }));
  };

  const changeVolume = (volume: number) => {
    setCurrentVolume(volume);
  };

  const focusWindow = (windowIndex: number) => {
    const currentZIndex = windows[windowIndex].zIndex;
    const windowsCopy = windows.map((window, index) => {
      //Puts the z-index of the focused window to the top
      if (windowIndex === index) {
        return { ...window, zIndex: windows.length * 2 };
      } else if (currentZIndex > window.zIndex) {
        return window;
      }
      //Make sure the z-indexes of rest of windows is below the focused window
      else {
        return { ...window, zIndex: window.zIndex - 2 };
      }
    });
    setWindows(windowsCopy);
  };

  const openWindow = (id: string) => {
    const openableWindow = openableWindows.find((window) => window.id === id);
    const windowIndex = windows.map((window) => window.name).indexOf(id);
    const dockIconRef = openableWindow?.taskBarIconRef.current;
    setIsShowApplicationsOpen(false);
    if (windowIndex === -1 && dockIconRef) {
      const { topBarComp, wrappedBody, id: name } = openableWindow;
      setWindows((prevWindows) => [
        ...prevWindows,
        {
          name,
          zIndex: prevWindows.length + 2,
          topBarComp,
          wrappedBody,
          isMinimized: false,
          dockIconRect: dockIconRef.getBoundingClientRect(),
        },
      ]);
    } else if (!!windows[windowIndex].isMinimized) {
      const newWindow = [...windows];
      newWindow[windowIndex].isMinimized = false;
      setWindows(newWindow);
    }
    if (windowIndex !== -1) {
      focusWindow(windowIndex);
    }
  };

  const closeWindow = (windowIndex: number) => {
    const windowsCopy = [...windows];
    windowsCopy.splice(windowIndex, 1);
    setWindows(windowsCopy);
  };

  const minimizeWindow = (windowIndex: number) => {
    const windowsCopy = [...windows];
    windowsCopy[windowIndex].isMinimized = true;
    setWindows(windowsCopy);
  };

  const changeBackgroundImage = (imageId: string) => {
    setBackgroundImageId(imageId);
    setCookie("ubuntu-backgroundId", imageId);
    // if (typeof window !== "undefined") {
    //   window.localStorage.setItem("ubuntu-backgroundId", imageId);
    // }
  };

  const changeSession = (
    sessionType: ContextType["sessionChangeType"] | null
  ) => {
    setSessionChangeType(sessionType);
  };

  const updateShortCutIcon = (icons: Icon[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "ubuntu-shortcut-icons",
        JSON.stringify(icons)
      );
    }
    setShortCutIconsList(icons);
  };

  const resetContextAndLocalStorage = () => {
    setTopBarDropDown(defaultState.topBarDropDown);
    setCurrentVolume(defaultState.volume);
    setWindows(defaultState.windows);
    setIsShowApplicationsOpen(defaultState.isShowApplicationsOpen);
    setBackgroundImageId(defaultState.backgroundImageId);
    setShortCutIconsList(initializeIcons(true));
    setCookie("ubuntu-backgroundId", "jellyfish");
  };

  return (
    <Context.Provider
      value={{
        changeMenu,
        topBarDropDown,
        volume,
        changeVolume,
        windows,
        openWindow,
        focusWindow,
        closeWindow,
        minimizeWindow,
        openableWindows,
        isShowApplicationsOpen,
        setIsShowApplicationsOpen,
        backgroundImageId,
        changeBackgroundImage,
        sessionChangeType,
        changeSession,
        shortCutRef,
        shortCutIconsList,
        updateShortCutIcon,
        initializeIcons,
        resetContextAndLocalStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
}