// @flow

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import { SchismingGroups } from '../../../schisming';
import { SchismingVolumeSlider } from '../../../schisming';

import {
    updateSettings
} from '../../../base/settings';

const logger = Logger.getLogger(__filename);

class Schisming extends Component<Props> {
    constructor(props: Props) {
        super(props);

        window.schisming = this;

        this._setAudioVolume = this._setAudioVolume.bind(this);

        this.onDisplayNameChanged = this.onDisplayNameChanged.bind(this);

        APP.store.subscribe(updateSettings)
    }

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
                <SchismingGroups />
                <SchismingVolumeSlider
                    initialValue = { initialVolumeValue }
                    key = 'volume-slider'
                    onChange = { this._setAudioVolume } />
            </div>
        );
    }

    onDisplayNameChanged() {
        window.schismingGroups.onDisplayNameChanged();
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
            if(smallVideo) {
                smallVideo._setAudioVolume(newVal);
            }
        }
    }
}

export default Schisming;