// @flow

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import { SchismingVolumeSlider } from '../../../schisming';

const logger = Logger.getLogger(__filename);

type Props = {
}

class Schisming extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Element}
     */
    render() {
        const initialVolumeValue = 1;
        return (
            <div className = 'schisming-container'>
                <SchismingVolumeSlider
                    initialValue = { initialVolumeValue }
                    key = 'volume-slider'
                    onChange = { this._setAudioVolume } />
            </div>
        );
    }

    _setAudioVolume(newVal) {
        logger.info('setAudioLevel with newVal=' + newVal);
        var otherParticipants = APP.conference.getParticipants();
        var participant1 = otherParticipants[0];
        var participant1Id = participant1.getId();
        var smallVideo = APP.UI.getSmallVideo(participant1Id);
        smallVideo._setAudioVolume(newVal);
    }
}

export default Schisming;