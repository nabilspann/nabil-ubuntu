'use client';
import { useState } from "react";

interface Props {
    className: string;
    handleWidth?: (width: number) => void;
    widthValue?: number;
}

const RangeInput = ({className, handleWidth = () => {}, widthValue = 50}: Props) => {
    const [width, setWidth] = useState(widthValue);

    const changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
      const getWidth = parseInt(event.target.value);
      setWidth(getWidth);
      handleWidth(getWidth);
    };

    const getBackgroundSize = () => {
      return { backgroundSize: `${(width * 100) / 100}% 100%` };
    };

    return (
        <input
          type="range"
          className={className}
          onChange={changeWidth}
          min={0}
          max={100}
          value={width}
          style={getBackgroundSize()}
        ></input>
    );
};

export default RangeInput;
