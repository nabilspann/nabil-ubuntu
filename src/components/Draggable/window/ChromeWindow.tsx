'use client';
import { useState, ChangeEvent } from "react";
import Home from "../../svgs/Home";
import Reload from "../../svgs/Reload";
import Search from "../../svgs/Search";

const ChromeWindow = () => {
  const [url, setUrl] = useState("google.com");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleIframeReload = () => {
    setRefreshKey(refreshKey + 1);
  }

  const handleFocus = () => {
    if(url.includes(".")){
      setUrl("https://www." + url);
    }
  };

  const handleBlur = () => {
    const formattedUrl = url.replace(/^[^www.]*www./, "");
    setUrl(formattedUrl);
  }

  return (
    <>
      <div className="h-10 bg-ubuntu-dark-3 cursor-default flex items-center">
        <span className="px-3 text-center m-auto">
          <Reload size={18} />
        </span>
        <span className="px-1" onClick={handleIframeReload}>
          <Home size={16} />
        </span>
        <div className="bg-ubuntu-dark-4 w-full h-5/6 mx-4 flex items-center rounded-2xl">
          <span className="px-3">
            <Search size={20} color="#9aa0a7" />
          </span>
          <span className="w-full mr-4">
            <input
              className="bg-ubuntu-dark-4 w-full text-sm"
              value={url}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </span>
        </div>
      </div>
      <iframe
        src="https://www.google.com/webhp?igu=1"
        className="bg-ubuntu-dark-4"
        key={refreshKey}
        title="Google"
        height={"100%"}
        width={"100%"}
      ></iframe>
    </>
  );
};

export default ChromeWindow;
