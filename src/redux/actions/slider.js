import { api } from "../../api/api";

export const loadFrames = frame => ({ type: 'LOAD_FRAMES', payload: frame });
export const changeCounter = val => ({ type: 'CHANGE_COUNTER', payload: val });
export const changeSlidePosition = () => ({ type: 'SLIDE_POSITION' });


export const fetchFrames = id => async dispatch => {
    const frames = await api.getFrames(id);
    dispatch(loadFrames(frames));
};