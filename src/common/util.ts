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