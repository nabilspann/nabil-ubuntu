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

interface ContextType {
  topBarDropDown: OpenedMenu;
  changeMenu: (x: ChangeMenu) => void;
  volume: number;
  changeVolume: (volume: number) => void;
}


const defaultState = {
  topBarDropDown: {
    openedMenu: null,
    refArr: []
  },
  volume: 50,
  changeMenu: () => {},
  changeVolume: () => {},
};

export const Context = createContext<ContextType>(defaultState);

export const ContextProvider = ({children}: Props) => {
    const [topBarDropDown, setTopBarDropDown] = useState<OpenedMenu>(defaultState.topBarDropDown);
    const [volume, setCurrentVolume ] = useState(defaultState.volume);

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
    
    return(
        <Context.Provider value={{changeMenu, topBarDropDown, volume, changeVolume}}>
            {children}
        </Context.Provider>
    )
}