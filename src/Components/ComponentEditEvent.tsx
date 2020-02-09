import React from 'react'
import {History} from 'history'

import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerEditEvent'

interface IProps extends IDispatchProps, IStateProps {
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
        return (
            <div>
                <input
                    type={'text'}
                    value={this.state.eventTitle}
                    onChange={this.onTextType}
                />
                <input
                    type={'submit'}
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

export default ComponentEditElement
