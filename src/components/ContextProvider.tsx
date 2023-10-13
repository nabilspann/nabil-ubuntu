'use client';
import { createContext, useState, ReactNode, RefObject } from 'react';
import OpenableWindowsList from './WindowList';

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
  sessionChangeType: string | null;
  changeSession: (sessionType: string | null) => void;
}

let backgroundImageId = "jellyfish";
if (typeof window !== "undefined") {
  backgroundImageId =
    window.localStorage.getItem("ubuntu-backgroundId") || "jellyfish";
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
  backgroundImageId,
  changeBackgroundImage: () => {},
  sessionChangeType: null,
  changeSession: (sessionType: string | null) => {},
};

export const Context = createContext<ContextType>(defaultState);

export const ContextProvider = ({children}: Props) => {
    const [topBarDropDown, setTopBarDropDown] = useState<OpenedMenu>(defaultState.topBarDropDown);
    const [volume, setCurrentVolume ] = useState(defaultState.volume);
    const [windows, setWindows] = useState<Window[]>(defaultState.windows);
    const [isShowApplicationsOpen, setIsShowApplicationsOpen] =
      useState(defaultState.isShowApplicationsOpen);
    const [backgroundImageId, setBackgroundImageId] = useState(defaultState.backgroundImageId);
    const [sessionChangeType, setSessionChangeType] = useState<
      ContextType["sessionChangeType"]
    >(defaultState.sessionChangeType);

    const openableWindows = OpenableWindowsList();

    const changeMenu = (setting: ChangeMenu) => {
        let openedMenu = setting;        
        if(setting === topBarDropDown.openedMenu){
            openedMenu = null;
        }
        setTopBarDropDown(prevState => ({ ...prevState, openedMenu}));
    };

    const changeVolume = (volume: number) => {
        setCurrentVolume(volume);
    }

    const openWindow = (id: string) => {
      const openableWindow = openableWindows.find((window) => window.id === id);
      const windowIndex = windows.map((window) => window.name).indexOf(id);
      const dockIconRef = openableWindow?.taskBarIconRef.current;
      setIsShowApplicationsOpen(false);
      if (
        windowIndex === -1 &&
        dockIconRef
      ) {
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
    }

    const closeWindow = (windowIndex: number) => {
      const windowsCopy = [ ...windows ];
      windowsCopy.splice(windowIndex, 1);
      setWindows(windowsCopy);
    }

    const minimizeWindow = (windowIndex: number) => {
      const windowsCopy = [...windows];
      windowsCopy[windowIndex].isMinimized = true;
      setWindows(windowsCopy);
    }

    const changeBackgroundImage = (imageId: string) => {
      setBackgroundImageId(imageId);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("ubuntu-backgroundId", imageId);
      }
    }

    const changeSession = (sessionType: string | null) => {
      setSessionChangeType(sessionType);
    }
  
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
        }}
      >
        {children}
      </Context.Provider>
    );
}