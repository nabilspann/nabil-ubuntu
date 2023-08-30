'use client';
import { createContext, useState, ReactNode, RefObject } from 'react'


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
  wrappedComp: ReactNode;
}

interface ContextType {
  topBarDropDown: OpenedMenu;
  changeMenu: (x: ChangeMenu) => void;
  volume: number;
  changeVolume: (volume: number) => void;
  windows: Window[];
  addWindow: (
    name: string,
    topBarComp: ReactNode,
    wrappedComp: ReactNode
  ) => void;
  focusWindow: (windowIndex: number) => void;
  closeWindow: (windowIndex: number) => void;
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
  addWindow: () => {},
  focusWindow: () => {},
  closeWindow: () => {},
};

export const Context = createContext<ContextType>(defaultState);

export const ContextProvider = ({children}: Props) => {
    const [topBarDropDown, setTopBarDropDown] = useState<OpenedMenu>(defaultState.topBarDropDown);
    const [volume, setCurrentVolume ] = useState(defaultState.volume);
    const [windows, setWindows] = useState<Window[]>(defaultState.windows);

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

    const addWindow = (name: string, topBarComp: ReactNode, wrappedComp: ReactNode) => {
      const windowIndex = windows.map(window => window.name).indexOf(name);
      if(windowIndex === -1){
        setWindows((prevWindows) => [
          ...prevWindows,
          { name,
            zIndex: prevWindows.length + 1,
            topBarComp,
            wrappedComp
          },
        ]);
      }
    }

    const focusWindow = (windowIndex: number) => {
      const currentZIndex = windows[windowIndex].zIndex;
      const windowsCopy = windows.map((window, index) => {
        //Puts the z-index of the focused window to the top
        if (windowIndex === index) {
          return { ...window, zIndex: windows.length };
        } else if (currentZIndex > window.zIndex) {
          return window;
        }
        //Make sure the z-indexes of rest of windows is below the focused window
        else {
          return { ...window, zIndex: window.zIndex - 1 };
        }
      });
      setWindows(windowsCopy);

      // const windowsCopy = [ ...windows ];
      // const getWindow = windowsCopy.splice(windowIndex, 1)[0];
      // console.log("getWindow", getWindow);
      // console.log("windowCopy", windowsCopy)
      // windowsCopy.push(getWindow);
      // setWindows(windowsCopy);
      // setWindows(prevWindows => {
      //   const windowsCopy = [...prevWindows];
      //   const getWindow = windowsCopy.splice(windowIndex, 1)[0];
      //   windowsCopy.push(getWindow);
      //   return windowsCopy
      // });
    }

    const closeWindow = (windowIndex: number) => {
      const windowsCopy = [ ...windows ];
      windowsCopy.splice(windowIndex, 1);
      setWindows(windowsCopy);
    }

    return (
      <Context.Provider
        value={{
          changeMenu,
          topBarDropDown,
          volume,
          changeVolume,
          windows,
          addWindow,
          focusWindow,
          closeWindow,
        }}
      >
        {children}
      </Context.Provider>
    );
}