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
        var thisParticipantJid = APP.conference.getMyUserId();
        var otherParticipants = APP.conference.getParticipants();
        var schismingHub = APP.conference.getSchismingHub();

        var participantsToAdjust = schismingHub.getParticipantsOfOtherSchismingGroups(thisParticipantJid, otherParticipants);

        for(var i = 0; i < participantsToAdjust.length; i++) {
            var participantId = participantsToAdjust[i].getId();
            var smallVideo = APP.UI.getSmallVideo(participantId);
            smallVideo._setAudioVolume(newVal);
        }
    }
}

export default Schisming;