import { ModalContent, Overlay } from "./Modal.styled";
import { Component } from 'react'


class Modal extends Component {

    componentDidMount = () => {
        window.addEventListener('keydown', this.onEscapeCloseModal);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.onEscapeCloseModal);
    }
    
    onEscapeCloseModal = (event) => {
        if (event.code === 'Escape') {
            this.props.onClose()
        }
    }

    onClickOverlay = (event) => {
        if (event.target === event.currentTarget) {
            this.props.onClose()
        };
    }

    render() {
        const { children } = this.props;

        return (
        <Overlay onClick={this.onClickOverlay}>
            <ModalContent>
                {children}
            </ModalContent>
        </Overlay>)
    }
};


export default Modal;