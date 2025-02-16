import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

export const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, alt, ...rest } = props;

  return (
    <>
      <Image {...rest} alt={alt} src={srcLight} className={"imgLight"} />
      <Image {...rest} alt={alt} src={srcDark} className={"imgDark"} />
    </>
  );
};
