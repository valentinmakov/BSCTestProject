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
} from '../Containers/ContainerEditEvent'

interface IProps extends IDispatchProps, IStateProps, WithTranslation {
    history: History,
}

interface IState {
    eventId: number | null,
    eventTitle: string,
}

class ComponentEditElement extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            eventId: null,
            eventTitle: '',
        }
    }

    componentDidMount() {
        const eventTitle: any = (this.props.history.location?.state as any)?.title
        const eventId: any = (this.props.history.location?.state as any)?.id

        if (eventTitle && typeof eventTitle === 'string' && eventId && typeof eventId === 'number') {
            this.setState({
                eventId: eventId,
                eventTitle: eventTitle,
            })
        }
    }

    render() {
        const t: (text: string) => string = this.props.t

        return (
            <div>
                <Input
                    type={'text'}
                    value={this.state.eventTitle}
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
        this.setState({eventTitle: event.target.value})
    }

    onTextSubmit = (): void => {
        if (this.state.eventId && this.state.eventTitle.length > 0) {
            this.props.performEditElementRequest(
                this.state.eventId,
                this.state.eventTitle,
                this.props.history.goBack,
            )
        }
    }

}

const TranslatedComponentEditElement: React.ComponentType = withTranslation()(ComponentEditElement)

export default TranslatedComponentEditElement
