import React, { useState, useEffect } from "react";
import { CustomImg } from "./styles/ChatStyles";
import default_pp from "../assets/default_pp.png";

interface SmartImgProps {
  src?: string;
  alt?: string;
  className?: string;
}

const SmartImg: React.FC<SmartImgProps> = ({ src, alt = "Avatar", className }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!src) {
      setCurrentSrc(default_pp);
      setLoaded(true);
      return;
    }

    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
    img.onerror = () => {
      setCurrentSrc(default_pp);
      setLoaded(true);
    };
  }, [src]);

  return (
    <CustomImg
      src={currentSrc || default_pp}
      alt={alt}
      loaded={loaded}
      className={className}
      onLoad={() => setLoaded(true)}
    />
  );
};

export default SmartImg;
