export interface IAction<T> {
    type: string,
    payload?: T,
}

export interface IEvent {
    id: number,
    title: string,
}

export interface IRootState {
    reducer: IData,
}

export interface IData {
    language: LanguageType,
    isFetching: boolean,
    eventList: IEvent[] | null,
    error: any,
}

export type LanguageType = (
    'en' | 'cz'
)
