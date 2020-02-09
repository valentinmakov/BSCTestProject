import React from 'react'
import Input from '@material-ui/core/Input'
import {History} from 'history'
import {
    withTranslation,
    WithTranslation,
} from 'react-i18next'

import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerAddEvent'

interface IProps extends IDispatchProps, IStateProps, WithTranslation {
    history: History,
}

interface IState {
    newEventTitle: string,
}

class ComponentAddEvent extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            newEventTitle: '',
        }
    }

    render() {
        const t: (text: string) => string = this.props.t

        return (
            <div>
                <Input
                    type={'text'}
                    onChange={this.onTextType}
                />
                <Input
                    type={'submit'}
                    value={t('submit')}
                    onClick={this.onTextSubmit}
                />
            </div>
        )
    }

    onTextType = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({newEventTitle: event.target.value})
    }

    onTextSubmit = (): void => {
        this.props.performAddEventRequest(
            this.state.newEventTitle,
            this.props.eventList,
            this.props.history.goBack,
        )
    }

}

const TranslatedComponentAddEvent: React.ComponentType = withTranslation()(ComponentAddEvent)

export default TranslatedComponentAddEvent
