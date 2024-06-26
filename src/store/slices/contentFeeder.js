import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';
// import config from 'config';
//eslint-disable-next-line
import card1 from 'assets/images/cards/card-1.jpg';
//eslint-disable-next-line
import card2 from 'assets/images/cards/card-2.jpg';
//eslint-disable-next-line
import card3 from 'assets/images/cards/card-3.jpg';

const initialState = {
    error: null,
    images: [card1, card2, card3],
    //images: [1, 2, 3].map((n) => `${config.assetsPath}images/cards/card-${n}.jpg`),
    text: [
        'Lorem ipsum dolor sit at met asdasdasd dasdasdasdasdsa sadjasdnasjdnasjdsa dshadbasdhbsakfbasjkkjkdsfs iidfsd',
        'consectetur adipiscing elit',
        'sed do eiusmod tempor incididunt'
    ],
    currentSlide: 0,
    currentText: 0
};

const slice = createSlice({
    name: 'contentFeeder',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET IMAGES
        getImagesSuccess(state, action) {
            state.images = action.payload;
        },

        // GET TEXT
        getTextSuccess(state, action) {
            state.text = action.payload;
        },

        // NEXT SLIDE
        nextSlide(state) {
            state.currentSlide = state.currentSlide === state.images.length - 1 ? 0 : state.currentSlide + 1;
            state.currentText = state.currentText === state.text.length - 1 ? 0 : state.currentText + 1;
        },

        // PREV SLIDE
        prevSlide(state) {
            state.currentSlide = state.currentSlide === 0 ? state.images.length - 1 : state.currentSlide - 1;
            state.currentText = state.currentText === 0 ? state.text.length - 1 : state.currentText - 1;
        }
    }
});

export function setImages(state, images) {
    dispatch(slice.actions.getImagesSuccess(state, images));
}

export function setText(state, text) {
    dispatch(slice.actions.getTextSuccess(state, text));
}

export function nextSlide() {
    dispatch(slice.actions.nextSlide());
}

export function prevSlide() {
    dispatch(slice.actions.prevSlide());
}

export default slice.reducer;
