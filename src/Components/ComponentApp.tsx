import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {History} from 'history'

import * as styles from '../Styles/app.styl'
import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerApp'
import {
    withTranslation,
    WithTranslation,
} from 'react-i18next'

import {
    IEvent,
    LanguageType,
} from '../Models/Models'

interface IProps extends IDispatchProps, IStateProps, WithTranslation {
    history: History,
}

const renderEmptyList = (): React.ReactElement =>
    <div className={styles.eventContainer}>
        <p>List is empty</p>
    </div>

class ComponentApp extends Component<IProps> {
    componentDidMount() {
        if (this.props.eventList === null && !this.props.isFetching)
            this.props.performInitialDataRequest()
    }

    render() {
        const t: (text: string) => string = this.props.t

        return (
            <div className={styles.mainApp}>
                <button onClick={this.onLanguageButtonClick}>
                    {
                        this.props.language === 'cz'
                            ? 'English'
                            : 'Čeština'
                    }
                </button>
                <h1 className={styles.mainAppHeader}>{t('eventList')}</h1>
                <div className={styles.eventListContainer}>
                    {
                        this.props.eventList && this.props.eventList.length > 0
                            ? this.props.eventList.map(this.renderEvent)
                            : renderEmptyList()
                    }
                </div>
                <div className={styles.linkListContainer}>
                    <p className={styles.linkContainer}>
                        <Link to={'/addEvent'}>{t('addEvent')}</Link>
                    </p>
                </div>
            </div>
        )
    }

    renderEvent = (event: IEvent, index: number): React.ReactElement => {
        const t: (text: string) => string = this.props.t

        return (
            <div
                key={event.id}
                className={styles.eventContainer}
            >
                <button onClick={this.onDeleteButtonClick(event.id)}>{t('deleteEvent')}</button>
                <p className={styles.eventContent}>
                    <span>{(index + 1).toString()}</span> <span>{event.title}</span>
                </p>
                <button onClick={this.onAddEventButtonClick(event)}>{t('editEvent')}</button>
            </div>
        )
    }

    onDeleteButtonClick = (id: number): (() => void) => (): void => {
        this.props.performDeleteEventRequest(id)
    }

    onAddEventButtonClick = (event: IEvent): (() => void) => (): void => {
        this.props.history.push('/editEvent', event)
    }

    onLanguageButtonClick = (): void => {
        const nextLang: LanguageType = this.props.language === 'cz'
            ? 'en'
            : 'cz'
        this.props.performChangeLanguage(nextLang)
        this.props.i18n.changeLanguage(nextLang)
    }
}

const TranslatedComponentApp: React.ComponentType = withTranslation()(ComponentApp)

export default TranslatedComponentApp
