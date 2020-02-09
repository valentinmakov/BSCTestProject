import * as actionTypes from './actionTypes'
import {
    IActivity,
    IAction,
    LanguageType,
} from '../Models/Models'

export const requestStart = (): IAction<never> => {
    return {
        type: actionTypes.REQUEST_START,
    }
}

export const initialDataRequestSuccess = (data: IActivity[]): IAction<IActivity[]> => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        payload: data,
    }
}

export const addEventRequestSuccess = (data: IActivity): IAction<IActivity> => {
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

export const editEventRequestSuccess = (data: IActivity): IAction<IActivity> => {
    return {
        type: actionTypes.EDIT_EVENT_REQUEST_SUCCESS,
        payload: data,
    }
}
