// import { imgApi } from "api/api"; 
// import { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryLayout } from './ImageGallery.styled';


const ImageGallery = ({photos}) => {
    return (
    <GalleryLayout>
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} item={photo} />
        // openModal={openModal} 
      ))}
    </GalleryLayout>
  );
}


// class ImageGallery extends Component{
//     state = {
//         value: '',
//         images: null,
//         isLoading: false,
// 		error: '',
// 		page: 1,
//     }

    // componentDidMount() {
		// this.getImages()
	// }

// getImages = async () => {
//     try {
//         this.setState({ isLoading: true, error: '' })

//     }

export default ImageGallery;