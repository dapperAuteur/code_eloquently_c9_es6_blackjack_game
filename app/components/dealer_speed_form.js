import React from 'react';

import { reduxForm } from 'redux-form';
import { setSpeed } from '../action_creators';

// onSubmit prop that sets the speed for dealing cards to dealer
const onSubmit = (values, dispatch) => {
    dispatch(setSpeed(parseInt(values.speed)));
};

// form component sets initial value to normal and updates speed when user presses submit button
export class DealerSpeedForm extends React.Component {
    render() {
        const speed = this.props.fields.speed;
        const handleSubmit = this.props.handleSubmit;
        const val = speed.value || this.props.initialSpeed;
        return (
            <div class="dealer-speed-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {[
                        ["Fast", 250],
                        ["Normal", 750],
                        ["Slow", 1500]
                     ].map((el) => (
                        <label key={el[1]}>
                            {el[0]}
                            <input type="radio"
                                   name="speed"
                                   {...speed}
                                   checked={val == el[1]}
                                   value={el[1]} />
                        </label>
                      ))
                    }
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

// connect the component with the state being tracked by Redux store, function will take a single parameter: the state object, and return a mapping of the names of this component's props (speed) to variables in state
const mapStateToProps = (state) => {
    return { initialSpeed: state.settings.get('speed') };
};

// exports new state to app so other components may have access to the new data
export const DealerSpeedFormContainer = reduxForm({
    form: 'dealerSpeed',
    fields: ['speed']
}, mapStateToProps)(DealerSpeedForm);