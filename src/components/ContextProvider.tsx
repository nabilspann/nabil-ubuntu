'use client';
import { createContext, useState, ReactNode } from 'react'


interface Props {
  children: ReactNode;
}

interface OpenedMenu {
    openedMenu: string | null;
}

type ChangeMenu = string | null;

interface ContextType {
    topBarDropDown: OpenedMenu;
    changeMenu: (x: ChangeMenu) => void;
}


const defaultState = {
  topBarDropDown: {
    openedMenu: null
  },
  changeMenu: () => {}
};

export const Context = createContext<ContextType>(defaultState);

export const ContextProvider = ({children}: Props) => {
    const [topBarDropDown, setTopBarDropDown] = useState<OpenedMenu>(defaultState.topBarDropDown)

    const changeMenu = (setting: ChangeMenu) => {
        let openedMenu;
        if(setting === topBarDropDown.openedMenu){
            openedMenu = null;
        }
        else{
            openedMenu = setting;
        }
        setTopBarDropDown({openedMenu});
    };

    return(
        <Context.Provider value={{changeMenu, topBarDropDown}}>
            {children}
        </Context.Provider>
    )
}