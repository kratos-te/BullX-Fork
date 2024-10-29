import { useRef, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export type CustomImageProps = ImageProps & {
  defaultSrc: string;
};

export default function CustomImage({
  defaultSrc,
  src,
  width,
  height,
  alt,
  className,
  ...props
}: CustomImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [showDefault, setShowDefault] = useState(false);

  useEffect(() => {
    const image = ref.current;

    if (image) {
      image.onerror = () => {
        image.style.display = "none";
        setShowDefault(true);
      };
    }
  }, [defaultSrc]);

  return (
    <>
      <Image
        ref={ref}
        src={src || ""}
        width={width}
        height={height}
        alt={alt}
        className={className}
        {...props}
      />
      {showDefault && (
        <Image
          src={defaultSrc || ""}
          width={width}
          height={height}
          alt={alt}
          className={className}
          {...props}
        />
      )}
    </>
  );
}
