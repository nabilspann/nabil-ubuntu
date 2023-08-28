'use client';
import Draggable from "react-draggable";
import WindowClose from "./svgs/WindowClose";
import WindowRestore from "./svgs/WindowRestore";
import WindowMinimize from "./svgs/WindowMinimize";

const DraggableWindow = () => {
  
  const WindowIcons = [
    {
      id: "Minimize Window",
      icon: <WindowMinimize size={20} />,
    },
    {
      id: "Restore Window",
      icon: <WindowRestore size={20} color="#fff" />,
    },
    {
      id: "Close Window",
      icon: <WindowClose size={20} />,
    },
  ];
  return (
    <Draggable disabled={false}>
      <div className="w-2/5 h-3/5 flex flex-col border-black border-2 rounded-xl overflow-hidden">
        <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
          <div className="w-full">test</div>
          <div className="w-1/4">
            <ul className="flex flex-row w-fit float-right items-center h-full">
              {WindowIcons.map(({ icon, id }) => (
                <li
                  key={id}
                  className="rounded-full bg-ubuntu-gray-3 mx-2 p-1 hover:bg-zinc-700"
                >
                  {icon}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full h-full bg-white">Draggable Window</div>
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
