import { Component } from "react";
import { Header, SearchButton, SearchForm, SearchInput } from "./Searchbar.styled";
import { SlMagnifier } from "react-icons/sl";
import { Notify } from "notiflix";
import { paramsForNotify } from "components/Notify/Notify";

    class SearchBar extends Component {
        state = {
         textQuery: '',
        };

        // зміни в інпуті
        onChangeInput = e => {
            this.setState({ textQuery: e.currentTarget.value.trim().toLowerCase() });
            // console.log(this.state.textQuery)
        }; 
        // handleEnter = e => {
        //     if (e.code === 'Enter') 
        //     e.preventDefault();
        //     this.handleSubmit(e.code);
        //     // console.log('Press')
        // }
        // componentDidMount() {
        //     document.addEventListener('keydown', this.handleEnter)
        // }
    
        // componentWillUnmount() {
        //     document.removeEventListener('keydown', this.handleEnter)
        // }
        handleSubmit = e => {
            e.preventDefault();
            const { textQuery } = this.state;
            console.log(textQuery);
            const { onSubmit } = this.props;
            // повідомлення

            if (textQuery === '') {
                Notify.info('Enter your request, please!', paramsForNotify);
                return;
            }
            //фун-я onSubmit прийшла з App через пропси
            onSubmit(textQuery);
    
            //очистка рядка пошука
            this.setState({ textQuery: '' });
        };

        render(){
            const {textQuery} = this.state;
            // console.log(textQuery);
            return(
                <Header>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchButton  type="submit">
                        <SlMagnifier />
                    </SearchButton>
                    <SearchInput
                     value = {textQuery}
                     onChange = {this.onChangeInput}
                     type="text"
                     name="search"
                     autoComplete="off"
                     autoFocus
                     placeholder="Search images and photos"
                   />
                </SearchForm>
            </Header>
            )
        }
    }



export default SearchBar;