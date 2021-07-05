// @flow

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import { SchismingGroups } from '../../../schisming';
import { SchismingVolumeSlider } from '../../../schisming';

const logger = Logger.getLogger(__filename);

class Schisming extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.currentVolume = 1;

        window.schisming = this;

        this._setAudioVolume = this._setAudioVolume.bind(this);

        this.onDisplayNameChanged = this.onDisplayNameChanged.bind(this);
        this.updateAudioVolume = this.updateAudioVolume.bind(this);
        this.isActive = this.isActive.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Element}
     */
    render() {
        return (
            <div className = 'schisming-container'>
                <SchismingGroups />
                <SchismingVolumeSlider
                    initialValue = { this.currentVolume }
                    key = 'volume-slider'
                    onChange = { this._setAudioVolume } />
            </div>
        );
    }

    isActive() {
        return true;
    }

    onDisplayNameChanged() {
        logger.info('Updates SchismingGroups view.');
        window.schismingGroups.onDisplayNameChanged();
    }

    updateAudioVolume() {
        logger.info('Updates audio volume for all remote participants.');
        this._setAudioVolume(this.currentVolume);
    }

    _setAudioVolume(newVal) {
        logger.info('Sets audio volume to ' + newVal);
        this.currentVolume = newVal;

        var thisParticipantId = APP.conference.getMyUserId();
        var otherParticipants = APP.conference.getParticipants();

        var schismingHub = APP.conference.getSchismingHub();
        var participantsToAdjust = schismingHub.getParticipantIdsOfOtherSchismingGroups(thisParticipantId);

        for(var i = 0; i < otherParticipants.length; i++) {
            var participantId = otherParticipants[i].getId();
            var smallVideo = APP.UI.getSmallVideo(participantId);
            var found = participantsToAdjust.includes(participantId);

            if(smallVideo == null) {
                logger.warn('Unable to find smallVideo for participant ' + participantId);
            } else if(found) {
                logger.info('For participant ' + participantId + ' setting audio volume to ' + newVal);
                smallVideo._setAudioVolume(newVal);
            } else {
                logger.info('For participant ' + participantId + ' setting audio volume to ' + 1);
                smallVideo._setAudioVolume(1);
            }
        }
    }
}

export default Schisming;