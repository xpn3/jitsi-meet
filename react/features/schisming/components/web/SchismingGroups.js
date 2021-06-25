/* @flow */

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import {
    getLocalParticipant,
    getParticipants
} from '../../../base/participants';

const logger = Logger.getLogger(__filename);

class SchismingGroups extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            schismingHub: null
        };

        this._joinGroup = this._joinGroup.bind(this);
        this._setSchismingHub = this._setSchismingHub.bind(this);
        this._renderGroup = this._renderGroup.bind(this);
        this._renderParticipant = this._renderParticipant.bind(this);
        this._renderLocalParticipantIfGroupIdMatches = this._renderLocalParticipantIfGroupIdMatches.bind(this);
    }

    _setSchismingHub() {
        if(this.state.schismingHUb != null) {
            return;
        }
        try {
            this.state.schismingHub = APP.conference.getSchismingHub();
        } catch(e) {
            logger.warn('Error during APP.conference.getSchismingHub(). Could not get SchismingHub.');
        }
    }

    render() {
        this._setSchismingHub();

        if(this.state.schismingHub == null) {
            return null;
        }

        var otherParticipants = APP.conference.getParticipants();
        var participantsByGroupIds = this.state.schismingHub.getParticipantsByGroupIds(otherParticipants);

        return (
            <div className = 'schisming-groups'>
                {Object.keys(participantsByGroupIds).map((groupId) => this._renderGroup(groupId, participantsByGroupIds[groupId]))}
            </div>
        );
    }

    _renderGroup(groupId, participants) {
        return (
            <div className="schisming-group">
                {this._renderLocalParticipantIfGroupIdMatches(groupId)}
                {participants.map((participant) => this._renderParticipant(participant))}
                <div>{groupId}</div>
            </div>
        );
    }

    _renderParticipant(participant) {
        return (
            <div className="schisming-group-member">
                {APP.conference.getParticipantDisplayName(participant.getId())}
            </div>
        );
    }

    _renderLocalParticipantIfGroupIdMatches(groupId) {
        var thisParticipantId = APP.conference.getMyUserId();
        var thisParticipantGroupId = this.state.schismingHub.getSchismingGroupIdForParticipant(thisParticipantId);

        if(thisParticipantGroupId != groupId) {
            return null;
        }
        return (
            <div className="schisming-group-member">
                {APP.conference.getLocalDisplayName()}
            </div>
        );
    }

    _joinGroup: (Object) => void;

    _joinGroup(event) {
        logger.info('_joinGroup');
        //TODO implement
    }
}

export default SchismingGroups;
