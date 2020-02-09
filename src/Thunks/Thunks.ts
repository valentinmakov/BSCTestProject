import * as actions from '../Actions/Actions'
import * as util from '../common/util'
import {IEvent} from '../Models/Models'
import {LanguageType} from '../Models/Models'

/* START InitialDataRequest thunk chain */
const initialDataRequestSuccess = (result: IEvent[]): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.initialDataRequestSuccess(result))
}

const initialDataRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performInitialDataRequest = (): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        '',
        {method: 'GET'},
        (result: IEvent[]): void => dispatch(initialDataRequestSuccess(result)),
        (error: any): void => dispatch(initialDataRequestFail(error)),
    )
}
/* END InitialDataRequest thunk chain */

/* START DeleteEventRequest thunk chain */
const deleteEventRequestSuccess = (id: string): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataDeleteSuccess(id))
}

const deleteEventRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performDeleteEventRequest = (id: string): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        id,
        {method: 'DELETE'},
        (result: string): void => dispatch(deleteEventRequestSuccess(result)),
        (error: any): void => dispatch(deleteEventRequestFail(error)),
    )

}
/* END DeleteEventRequest thunk chain */

/* START AddEventRequest thunk chain */
const addEventRequestSuccess = (element: IEvent): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.addEventRequestSuccess(element))
}

const addEventRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performAddEventRequest = (
    options: RequestInit,
    navigationCallback?: () => void,
): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        '',
        options,
        (result: IEvent): void => {
            dispatch(addEventRequestSuccess(result))
            if (navigationCallback) {
                navigationCallback()
            }
        },
        (error: any): void => dispatch(addEventRequestFail(error)),
    )
}
/* END AddEventRequest thunk chain */

/* START EditElementRequest thunk chain */
const editEventRequestSuccess = (element: IEvent): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.editEventRequestSuccess(element))
}

const editEventRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performEditElementRequest = (
    id: number,
    options: RequestInit,
    navigationCallback: () => void,
): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        id.toString(),
        options,
        (result: IEvent): void => {
            dispatch(editEventRequestSuccess(result))
            if (navigationCallback) {
                navigationCallback()
            }
        },
        (error: any): void => dispatch(editEventRequestFail(error)),
    )
}
/* END EditElementRequest thunk chain */

export const performChangeLanguage = (language: LanguageType): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.performChangeLanguage(language))
}