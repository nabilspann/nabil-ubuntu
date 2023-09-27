import Home from "./svgs/Home";
import Reload from "./svgs/Reload";

const ChromeWindow = () => {
    return (
      <>
        <div className="h-10 bg-ubuntu-dark-3 cursor-default flex">
          <Reload size={25} />
          <Home size={25} />
        </div>
        <iframe
          src="https://www.google.com/webhp?igu=1"
          title="Google"
          height={"100%"}
          width={"100%"}
        ></iframe>
      </>
    );
};

export default ChromeWindow;
