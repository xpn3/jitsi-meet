// @flow

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import { SchismingGroups } from '../../../schisming';
import { SchismingVolumeSlider } from '../../../schisming';

const logger = Logger.getLogger(__filename);

class Schisming extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this._newGroup = this._newGroup.bind(this);
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
                <SchismingGroups/>
                <div
                    className = 'schisming-group-button-new'
                    onClick = { this._newGroup }>
                    <div className = 'schisming-group-button-new-text'>
                        New group
                    </div>
                </div>
                <SchismingVolumeSlider
                    initialValue = { initialVolumeValue }
                    key = 'volume-slider'
                    onChange = { this._setAudioVolume } />
            </div>
        );
    }

    _newGroup: (Object) => void;

    _newGroup(event) {
        logger.info('_newGroup');
        // TODO implement
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