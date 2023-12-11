import {ImageItem, Image} from './ImageGalleryItem.styled'


const ImageGalleryItem = ({item}) => {
    // console.log(item)
        const { largeImageURL, tags, webformatURL } = item;
  return (
    <>
    <ImageItem
      onClick={e => {
        e.preventDefault();
        // openModal(largeImageURL, tags);
      }}
    >
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </ImageItem>
    </>
  );
};


export default ImageGalleryItem;