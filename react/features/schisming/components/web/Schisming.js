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
        logger.info('Adjusting volume for schisming groups to ' + newVal);
        var schismingHub = APP.conference.getSchismingHub();
        var thisParticipantJid = APP.conference.getMyUserId();
        var otherParticipants = APP.conference.getParticipants();
        logger.info('calling schismingHub.adjustVolume with thisParticipantJid=' + thisParticipantJid + ', otherParticipants=' + otherParticipants);
        schismingHub.adjustVolume(newVal, thisParticipantJid, otherParticipants);
    }
}

export default Schisming;