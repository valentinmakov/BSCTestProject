import {baseURL} from '../Constants/Constants'
import {IEvent} from '../Models/Models'

const getMaxId = (eventList: IEvent[]): number => {
    return Math.max(
        ...eventList.map((event: IEvent): number => event.id),
    )
}

const getIdFromEventList = (eventList: IEvent[]): number => {
    if (eventList.length === 0) {
        return 1
    }

    return getMaxId(eventList) + 1
}

export const addEventToList = (eventList: IEvent[], newEvent: IEvent): IEvent[] => {
    const isIdExistsInList: boolean = eventList.some((event: IEvent): boolean => event.id === newEvent.id)

    if (isIdExistsInList) {
        newEvent = {
            ...newEvent,
            id: getMaxId(eventList) + 1,
        }
    }

    return [...eventList, newEvent]
}

export const deleteEventFromList = (eventList: IEvent[], eventId: string): IEvent[] => {
    const copyEventList: IEvent[] = [...eventList]
    const index: number = copyEventList.findIndex((event: IEvent): boolean => event.id === parseInt(eventId, 10))
    copyEventList.splice(index, 1)

    return copyEventList
}

export const replaceEventInList = (eventList: IEvent[], editedEvent: IEvent): IEvent[] => {
    const copyEventList: IEvent[] = [...eventList]
    const index: number = copyEventList.findIndex((event: IEvent): boolean => event.id === editedEvent.id)
    copyEventList.splice(index, 1, editedEvent)

    return copyEventList
}

export const getAddEventRequestOptions = (eventTitle: string, eventList: IEvent[]): RequestInit => {
    const body: string = JSON.stringify(
        {
            id: getIdFromEventList(eventList),
            title: eventTitle,
        },
    )

    return {
        method: 'POST',
        body,
    }
}

export const getEditElementRequestOptions = (elementId: number, eventTitle: string): RequestInit => {
    const body: string = JSON.stringify(
        {
            id: elementId,
            title: eventTitle,
        },
    )

    return {
        method: 'PUT',
        body,
    }
}

const getIsEventModel = (dataItem: any): boolean =>
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
            const isListModel: boolean = json.every((jsonItem: any): boolean => getIsEventModel(jsonItem))

            if (isListModel) {
                success(json)
            }
            failure({message: 'Invalid data format'})
        }

        // POST, add event request
        if (options?.method === 'POST') {
            const isEventtModel: boolean = getIsEventModel(json)

            if (isEventtModel) {
                success(json)
            }
            failure({message: 'Invalid data format'})
        }

        // DELETE, delete event request
        if (options?.method === 'DELETE') {
            success(id)
        }

        // PUT, edit event request
        if (options?.method === 'PUT') {
            const isEventtModel: boolean = getIsEventModel(json)

            if (isEventtModel) {
                success(json)
            }
            failure({message: 'Invalid data format'})
        }
    })
    .catch((error: any): void => {
        failure(error)
    })
}