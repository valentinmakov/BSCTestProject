import React from 'react'
import {History} from 'history'

import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerAddEvent'

interface IProps extends IDispatchProps, IStateProps {
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
        return (
            <div>
                <input
                    type={'text'}
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

export default ComponentAddEvent
