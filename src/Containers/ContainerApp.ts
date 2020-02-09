import {connect} from 'react-redux'
import ComponentApp from '../Components/ComponentApp'
import * as thunks from '../Thunks/Thunks'
import {
    IEvent,
    IRootState,
    LanguageType,
} from '../Models/Models'

export interface IStateProps {
    eventList: IEvent[],
    isFetching: boolean,
    language: LanguageType,
}

export interface IDispatchProps {
    performInitialDataRequest: () => void,
    performDeleteEventRequest: (id: number) => void,
    performChangeLanguage: (language: LanguageType) => void,
}

const mapStateToProps = (state: IRootState): IStateProps => ({
    eventList: state.reducer.eventList,
    isFetching: state.reducer.isFetching,
    language: state.reducer.language,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performInitialDataRequest: (): void => {
        dispatch(thunks.performInitialDataRequest())
    },

    performDeleteEventRequest: (id: number): void => {
        dispatch(thunks.performDeleteEventRequest(id.toString()))
    },

    performChangeLanguage: (language: LanguageType): void => {
        dispatch(thunks.performChangeLanguage(language))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentApp)
