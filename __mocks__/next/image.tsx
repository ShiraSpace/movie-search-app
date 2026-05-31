import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

const Image = ({ src, alt, ...props }: ImageProps): React.JSX.Element => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
  />
);

export default Image;
