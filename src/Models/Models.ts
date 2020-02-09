export interface IAction<T> {
    type: string,
    payload?: T,
}

export interface IActivity {
    id: number,
    title: string,
}

export interface IRootState {
    reducer: IData,
}

export interface IData {
    language: LanguageType,
    isFetching: boolean,
    activityList: IActivity[] | null,
    error: any,
}

export type LanguageType = (
    'en' | 'cz'
)
