import React from 'react'
import {History} from 'history'

import {
    IDispatchProps,
    IStateProps,
} from '../Containers/ContainerEditElement'

interface IProps extends IDispatchProps, IStateProps {
    history: History,
}

interface IState {
    activityId: number | null,
    activityTitle: string,
}

class ComponentEditElement extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            activityId: null,
            activityTitle: '',
        }
    }

    componentDidMount() {
        const eventTitle: any = (this.props.history.location?.state as any)?.title
        const eventId: any = (this.props.history.location?.state as any)?.id

        if (eventTitle && typeof eventTitle === 'string' && eventId && typeof eventId === 'number') {
            this.setState({
                activityId: eventId,
                activityTitle: eventTitle,
            })
        }
    }

    render() {
        return (
            <div>
                <input
                    type={'text'}
                    value={this.state.activityTitle}
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
        this.setState({activityTitle: event.target.value})
    }

    onTextSubmit = (): void => {
        if (this.state.activityId && this.state.activityTitle.length > 0) {
            this.props.performEditElementRequest(
                this.state.activityId,
                this.state.activityTitle,
                this.props.history.goBack,
            )
        }
    }

}

export default ComponentEditElement
