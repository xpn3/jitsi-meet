/* @flow */

import React, { Component } from 'react';

import { Icon, IconVolume } from '../../../base/icons';

const VOLUME_SLIDER_SCALE = 100;

type Props = {
    initialValue: number,
    onChange: Function
};

type State = {
    volumeLevel: number
};

class SchismingVolumeSlider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            volumeLevel: (props.initialValue || 0) * VOLUME_SLIDER_SCALE
        };

        this._onVolumeChange = this._onVolumeChange.bind(this);
    }

    render() {
        return (
            <div className = 'schisming-slider-container'>
                <span className = 'schisming-slider-icon'>
                    <Icon src = { IconVolume } />
                </span>
                <input
                    className = 'schisming-slider'
                    max = { VOLUME_SLIDER_SCALE }
                    min = { 0 }
                    onChange = { this._onVolumeChange }
                    type = 'range'
                    value = { this.state.volumeLevel } />
            </div>
        );
    }

    _onVolumeChange: (Object) => void;

    _onVolumeChange(event) {
        const volumeLevel = event.currentTarget.value;
        this.props.onChange(volumeLevel / VOLUME_SLIDER_SCALE);
        this.setState({ volumeLevel });
    }
}

export default SchismingVolumeSlider;
