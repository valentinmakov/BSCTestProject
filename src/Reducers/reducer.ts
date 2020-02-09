import * as actionTypes from '../Actions/actionTypes'
import {
    IAction,
    IData,
} from '../Models/Models'

import * as util from '../common/util'

export const initialState: IData = {
    language: 'cz',
    isFetching: false,
    activityList: null,
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
                activityList: action.payload,
                isFetching: false,
            }

        case actionTypes.ADD_EVENT_REQUEST_SUCCESS:
            return {
                ...state,
                activityList: util.addActivityToList(state.activityList, action.payload),
                isFetching: false,
            }

        case actionTypes.DELETE_EVENT_REQUEST_SUCCESS:
            return {
                ...state,
                activityList: util.deleteActivityFromList(state.activityList, action.payload),
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

        default:
            return state
    }
}