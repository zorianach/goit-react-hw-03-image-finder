import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import { paramsForNotify } from './Notify/Notify';
// import {Header, SearchButton, SearchForm, SearchInput, ButtonLabel} from 'App.styled';
import { getImages, onFetchError } from 'api/api';


const perPage = 12;

class App extends Component {
  state = {
    search: '',
    photos: null,
    page: 1,
    loading: false,
    btnLoadMore: false,
    // showModal: false,
    // selectedPhoto: null,
  }

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;
    const newSearch = this.state.search;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.loadImages(newSearch, newPage);
    };  
  }

  // loadImages = (search, page) => {
  //   this.setState({ loading: true });
  loadImages = async() => {
    try {
      this.setState({ loading: true });
      //ф-ія запиту з арі
      const response = await getImages(this.state.search, this.state.page)
      // .then(data => {
      //   console.log(data);
        const { totalHits, hits } = response;
        const totalPage = Math.floor(totalHits / perPage);
        // console.log(totalPage);
        if (totalHits === 0) {
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
        }
        //створюємо масив підвантажених зображень 
        const arrPhotos = hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          { id, webformatURL, largeImageURL, tags }
        ));
        console.log(arrPhotos);       

        // this.setState({
        //   photos: arrPhotos
        // })
        // console.log(this.state.photos)

        //додаємо новий масив зображень до попереднього
        this.setState(prevState => ({
          photos: prevState.photos ? [...prevState.photos, ...arrPhotos] : arrPhotos}), 
        )
        if (totalPage > this.state.page) {
          this.setState({ btnLoadMore: true })
          } else {
                Notify.info("We're sorry, but you've reached the end of search results.", paramsForNotify);
                this.setState({ btnLoadMore: false });
              };
      }
      catch(error){
        onFetchError(error)
      }
      finally{
        this.setState({ loading: false });
      };
      // console.log(this.state.photos)
    }


  //  запит пошуку в App з SearchBar
  handleSubmit = (searchValue) => {
    this.setState({
      search: searchValue,
      });
      // console.log(this.state.search);
  };


  render(){
    // console.log(this.state.photos)
    const {photos} = this.state;
    return (
      <>
      <SearchBar onSubmit={this.handleSubmit}/>
      { photos && <ImageGallery photos={photos}/>} 
      </>
    )
  }
};

export default App;
