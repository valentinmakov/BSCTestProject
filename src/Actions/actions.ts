import * as actionTypes from './ActionTypes'
import {
    IEvent,
    IAction,
    LanguageType,
} from '../Models/Models'

export const requestStart = (): IAction<never> => {
    return {
        type: actionTypes.REQUEST_START,
    }
}

export const initialDataRequestSuccess = (data: IEvent[]): IAction<IEvent[]> => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        payload: data,
    }
}

export const addEventRequestSuccess = (data: IEvent): IAction<IEvent> => {
    return {
        type: actionTypes.ADD_EVENT_REQUEST_SUCCESS,
        payload: data,
    }
}

export const dataDeleteSuccess = (data: string): IAction<string> => {
    return {
        type: actionTypes.DELETE_EVENT_REQUEST_SUCCESS,
        payload: data,
    }
}

export const dataRequestFail = (error: any): IAction<any> => {
    return {
        type: actionTypes.REQUEST_FAIL,
        payload: error,
    }
}

export const performChangeLanguage = (data: LanguageType): IAction<LanguageType> => {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        payload: data,
    }
}

export const editEventRequestSuccess = (data: IEvent): IAction<IEvent> => {
    return {
        type: actionTypes.EDIT_EVENT_REQUEST_SUCCESS,
        payload: data,
    }
}
