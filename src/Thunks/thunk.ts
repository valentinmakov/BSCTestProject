import * as actions from '../Actions/actions'
import * as util from '../common/util'
import {IActivity} from '../Models/Models'
import {LanguageType} from '../Models/Models'

/* START InitialDataRequest thunk chain */
const initialDataRequestSuccess = (result: IActivity[]): ((dispatch: Function) => void) => (dispatch: Function): void => {
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
        (result: IActivity[]): void => dispatch(initialDataRequestSuccess(result)),
        (error: any): void => dispatch(initialDataRequestFail(error)),
    )
}
/* END InitialDataRequest thunk chain */

/* START DeleteActivityRequest thunk chain */
const deleteActivityRequestSuccess = (id: string): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataDeleteSuccess(id))
}

const deleteActivityRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performDeleteActivityRequest = (id: string): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        id,
        {method: 'DELETE'},
        (result: string): void => dispatch(deleteActivityRequestSuccess(result)),
        (error: any): void => dispatch(deleteActivityRequestFail(error)),
    )

}
/* END DeleteActivityRequest thunk chain */

/* START AddElementRequest thunk chain */
const addElementRequestSuccess = (element: IActivity): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.addEventRequestSuccess(element))
}

const addElementRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.dataRequestFail(error))
}

export const performAddElementRequest = (
    options: RequestInit,
    navigationCallback?: () => void,
): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.requestStart())

    util.networkCall(
        '',
        options,
        (result: IActivity): void => {
            dispatch(addElementRequestSuccess(result))
            if (navigationCallback) {
                navigationCallback()
            }
        },
        (error: any): void => dispatch(addElementRequestFail(error)),
    )
}
/* END AddElementRequest thunk chain */

/* START EditElementRequest thunk chain */
const editElementRequestSuccess = (element: IActivity): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.editEventRequestSuccess(element))
}

const editElementRequestFail = (error: any): ((dispatch: Function) => void) => (dispatch: Function): void => {
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
        (result: IActivity): void => {
            dispatch(editElementRequestSuccess(result))
            if (navigationCallback) {
                navigationCallback()
            }
        },
        (error: any): void => dispatch(editElementRequestFail(error)),
    )
}
/* END EditElementRequest thunk chain */

export const performChangeLanguage = (language: LanguageType): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.performChangeLanguage(language))
}