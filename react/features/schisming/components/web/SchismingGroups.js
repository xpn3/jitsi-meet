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

        window.schismingGroups = this;

        this._setSchismingHub = this._setSchismingHub.bind(this);
        this._rerender = this._rerender.bind(this);
        this._renderGroup = this._renderGroup.bind(this);
        this._renderParticipant = this._renderParticipant.bind(this);
        this._joinGroup = this._joinGroup.bind(this);
        this._leaveGroup = this._leaveGroup.bind(this);
        this._renderJoinOrLeaveGroup = this._renderJoinOrLeaveGroup.bind(this);

        this.onDisplayNameChanged = this.onDisplayNameChanged.bind(this);
    }

    _setSchismingHub() {
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

        var participantIdsByGroupId = this.state.schismingHub.getParticipantIdsByGroupId();

        return (
            <div className = 'schisming-groups'>
                {Object.keys(participantIdsByGroupId).map((groupId) => this._renderGroup(groupId, participantIdsByGroupId[groupId]))}
            </div>
        );
    }

    onDisplayNameChanged() {
        this._rerender();
    }

    _rerender() {
        this.setState({ state: this.state });
    }

    _renderGroup(groupId, participantIds) {
        return (
            <div className="schisming-group">
                {participantIds.map((participantId) => this._renderParticipant(participantId))}
                {this._renderJoinOrLeaveGroup(groupId)}
            </div>
        );
    }

    _renderJoinOrLeaveGroup(groupId) {
        var thisParticipantsGroupId = this.state.schismingHub.getSchismingGroupIdForParticipant(APP.conference.getMyUserId());
        if(groupId == thisParticipantsGroupId) {
            return (
                <div className="schisming-group-button-join" onClick={() => this._leaveGroup()}>
                    <strong>Leave group</strong>
                </div>
            );
        }
        return (
            <div className="schisming-group-button-join" onClick={() => this._joinGroup(groupId)}>
                <strong>Join group {groupId}</strong>
            </div>
        );
    }

    _renderParticipant(participantId) {
        if(participantId == APP.conference.getMyUserId()) {
            return (
                <div className="schisming-group-member">
                    <strong>ME</strong>
                </div>
            );
        }

        return (
            <div className="schisming-group-member">
                {APP.conference.getParticipantDisplayName(participantId)}
            </div>
        );
    }

    _joinGroup(groupId) {
        logger.info('Clicked \'Join group ' + groupId + '\'');
        this.state.schismingHub.joinOrLeaveGroup(APP.conference.getMyUserId(), groupId);
    }

    _leaveGroup() {
        logger.info('Clicked \'Leave group\'');
        this._joinGroup(null);
    }
}

export default SchismingGroups;
