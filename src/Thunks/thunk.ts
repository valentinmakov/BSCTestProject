import * as actions from '../Actions/actions'
import {IActivity} from '../Models/Models'
import {baseURL} from '../Constants/constants'
import {LanguageType} from '../Models/Models'

const getIsListModel = (dataItem: any): boolean =>
    dataItem.id &&
    typeof dataItem.id === 'number' &&
    dataItem.title &&
    typeof dataItem.title === 'string'


export const networkCall = <T>(
    id: string,
    options: RequestInit,
    navigationCallback?: () => void,
): ((dispatch: Function) => void) => (dispatch: Function): void => {
    const url: string = id.length > 0 ? `${baseURL}/${id}` : `${baseURL}`
    dispatch(actions.dataRequestStart())

    fetch(url, options)
        .then((resp: Response): Promise<T> => {
            if (options?.method === 'DELETE' && resp.status === 204) {
                return new Promise(resolve => resolve())
            } else {
                return resp.json()
            }
        })
        .then((json: T): void => {
            // GET, initial data request
            if (options?.method === 'GET' && Array.isArray(json)) {
                const isListModel: boolean = json.every((jsonItem: any): boolean => getIsListModel(jsonItem))

                if (isListModel) {
                    const result: IActivity[] = json.map((jsonItem: any): IActivity =>
                        ({
                            id: jsonItem.id,
                            title: jsonItem.title,
                        }),
                    )
                    dispatch(actions.dataRequestSuccess(result))
                }
                dispatch(actions.dataRequestFail({message: 'Invalid data format'}))
            }

            // POST, add activity request
            if (options?.method === 'POST') {
                const isListModel: boolean = getIsListModel(json)

                if (isListModel) {
                    const result: IActivity = {
                        id: (json as any).id,
                        title: (json as any).title,
                    }

                    dispatch(actions.addEventRequestSuccess(result))
                    navigationCallback()
                }
                dispatch(actions.dataRequestFail({message: 'Invalid data format'}))
            }

            // DELETE, delete activity request
            if (options?.method === 'DELETE') {
                dispatch(actions.dataDeleteSuccess(id))
            }
        })
        .catch((error: any): void => {
            dispatch(actions.dataRequestFail(error))
        })
}

export const performChangeLanguage = (language: LanguageType): ((dispatch: Function) => void) => (dispatch: Function): void => {
    dispatch(actions.performChangeLanguage(language))
}