import * as actionTypes from './actionTypes'
import {
    IActivity,
    IAction,
} from '../Models/Models'

export const dataRequestStart = (): IAction<never> => {
    return {
        type: actionTypes.REQUEST_START,
    }
}

export const dataRequestSuccess = (data: IActivity[]): IAction<IActivity[]> => {
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
