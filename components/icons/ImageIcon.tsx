import Image, { StaticImageData } from "next/image";

export type BaseImageIconProps = {
  width?: number;
  height?: number;
};

export default function ImageIcon({
  src,
  width,
  height,
}: BaseImageIconProps & {
  src: string | StaticImageData;
}) {
  return (
    <Image
      src={src}
      alt="Icon"
      width={width ? width : 35}
      height={height ? height : 35}
    />
  );
}
