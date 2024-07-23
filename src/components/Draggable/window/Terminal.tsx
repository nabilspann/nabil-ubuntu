'use client';
// import { setupNetworkInterface } from "../../../../public/webvm/network.js";
import "../../Scrollbar.css";

declare let CheerpXApp: any;
const Terminal = () => {
  // console.log("terminal")
  // setTimeout(() => {
  //   console.log("before??");
  //   if (typeof window === "undefined") return;

  //   console.log("running???");
  //   // const networkInterface = setupNetworkInterface();
   
  // }, 5000);
   CheerpXApp.create({
     devices: [
       {
         type: "bytes",
         url: "debian_mini_20240719_10003676128.ext2",
         name: "block1",
       },
     ],
     mounts: [
       { type: "ext2", dev: "block1", path: "/" },
       { type: "cheerpOS", dev: "/app", path: "/app" },
       { type: "cheerpOS", dev: "/str", path: "/data" },
       { type: "devs", dev: "", path: "/dev" },
     ],
     networkInterface: () => ({}),
     // }).then(runTest, failCallback);
   });
    return (
      <main
        // style="display: flex; flex-direction: row; justify-content: space-between; margin: 5px; height: 100%;"
        className="flex flex-row justify-between m-5 h-full"
      >
        <div
          //   style="flex-grow:1; height:100%;display:inline-block;margin:0;"
          className="grow h-full inline-block m-0 scrollbar"
          id="console"
        >TEST</div>
      </main>
    );
};

export default Terminal;
