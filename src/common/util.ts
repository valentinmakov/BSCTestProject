import {baseURL} from '../Constants/constants'
import {IActivity} from '../Models/Models'

const getMaxId = (activityList: IActivity[]): number => {
    return Math.max(
        ...activityList.map((activity: IActivity): number => activity.id),
    )
}

const getIdFromActivityList = (activityList: IActivity[]): number => {
    if (activityList.length === 0) {
        return 1
    }

    return getMaxId(activityList) + 1
}

export const addActivityToList = (activityList: IActivity[], newActivity: IActivity): IActivity[] => {
    const isIdExistsInList: boolean = activityList.some((activity: IActivity): boolean => activity.id === newActivity.id)

    if (isIdExistsInList) {
        newActivity = {
            ...newActivity,
            id: getMaxId(activityList) + 1,
        }
    }

    return [...activityList, newActivity]
}

export const deleteActivityFromList = (activityList: IActivity[], activityId: string): IActivity[] => {
    const copyActivityList: IActivity[] = [...activityList]
    const index: number = copyActivityList.findIndex((activity: IActivity): boolean => activity.id === parseInt(activityId, 10))
    copyActivityList.splice(index, 1)

    return copyActivityList
}

export const getAddElementRequestOptions = (elementTitle: string, activityList: IActivity[]): RequestInit => {
    const body: string = JSON.stringify(
        {
            id: getIdFromActivityList(activityList),
            title: elementTitle,
        },
    )

    return {
        method: 'POST',
        body,
    }
}

const getIsListModel = (dataItem: any): boolean =>
    dataItem.id &&
    typeof dataItem.id === 'number' &&
    dataItem.title &&
    typeof dataItem.title === 'string'

const asyncCall = async <T>(url: string, options: RequestInit): Promise<T> => {
    const response: Response = await fetch(url, options)

    if (options?.method === 'DELETE' && response.status === 204) {
        return new Promise(resolve => resolve())
    }

    return response.json()
}

export const networkCall = <T>(
    id: string,
    options: RequestInit,
    success: (responce: T | string) => void,
    failure: (error: any) => void,
): void => {
    const url: string = id.length > 0 ? `${baseURL}/${id}` : `${baseURL}`
    const responce: Promise<T> = asyncCall(url, options)

    responce.then((json: T): void => {
        // GET, initial data request
        if (options?.method === 'GET' && Array.isArray(json)) {
            const isListModel: boolean = json.every((jsonItem: any): boolean => getIsListModel(jsonItem))

            if (isListModel) {
                success(json)
            }
            failure({message: 'Invalid data format'})
        }

        // POST, add activity request
        if (options?.method === 'POST') {
            const isListModel: boolean = getIsListModel(json)

            if (isListModel) {
                success(json)
            }
            failure({message: 'Invalid data format'})
        }

        // DELETE, delete activity request
        if (options?.method === 'DELETE') {
            success(id)
        }
    })
    .catch((error: any): void => {
        failure(error)
    })
}