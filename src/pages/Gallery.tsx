import { Gallery as PhotoGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { images } from "../data";

export function Gallery() {
  return (
    <PhotoGallery>
      {images.map((image) => (
        <Item key={image.src} original={image.original} width={image.width} height={image.height}>
          {({ ref, open }) => (
            <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.src} />
          )}
        </Item>
      ))}
    </PhotoGallery>
  );
}
