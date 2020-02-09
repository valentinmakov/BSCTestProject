import * as actionTypes from '../Actions/ActionTypes'
import {
    IAction,
    IData,
} from '../Models/Models'

import * as util from '../common/util'

export const initialState: IData = {
    language: 'cz',
    isFetching: false,
    eventList: null,
    error: null,
}

export const reducer = (state = initialState, action: IAction<any>): IData => {
    switch (action.type) {
        case actionTypes.REQUEST_START:
            return {
                ...state,
                isFetching: true,
            }

        case actionTypes.REQUEST_SUCCESS:
            return {
                ...state,
                eventList: action.payload,
                isFetching: false,
            }

        case actionTypes.ADD_EVENT_REQUEST_SUCCESS:
            return {
                ...state,
                eventList: util.addEventToList(state.eventList, action.payload),
                isFetching: false,
            }

        case actionTypes.DELETE_EVENT_REQUEST_SUCCESS:
            return {
                ...state,
                eventList: util.deleteEventFromList(state.eventList, action.payload),
                isFetching: false,
            }

        case actionTypes.REQUEST_FAIL:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }

        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            }

        case actionTypes.EDIT_EVENT_REQUEST_SUCCESS:
            return {
                ...state,
                eventList: util.replaceEventInList(state.eventList, action.payload),
                isFetching: false,
            }

        default:
            return state
    }
}