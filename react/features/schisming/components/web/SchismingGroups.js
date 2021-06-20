/* @flow */

import Logger from 'jitsi-meet-logger';
import React, { Component } from 'react';

import {
    getLocalParticipant,
    getParticipants,
    participantPresenceChanged,
    participantUpdated,
    getParticipantById
} from '../../../base/participants';

const logger = Logger.getLogger(__filename);

class SchismingGroups extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this._joinGroup = this._joinGroup.bind(this);
        this._getGroupsAndMembers = this._getGroupsAndMembers.bind(this);
    }

    render() {
        var groupsAndMembers = this._getGroupsAndMembers();

        if(groupsAndMembers == null) {
            logger.info('>>> reached return after setTimeout');
            return null;
        }

        logger.info('>>> reached return in render() without error');

        return (
            <div className = 'schisming-groups-container'>
                <div className = 'schisming-group-container'>
                    {groupsAndMembers}
                </div>
            </div>
        );
    }

    _getGroupsAndMembers() {
        var schismingHub;
        try {
            schismingHub = APP.conference.getSchismingHub();
        } catch(e) {
            logger.info('>>> reached return after error in getSchismingHub()');
            return null;
        }

        logger.info('>>> reached before getParticipants()');
        var allParticipants = APP.conference.getParticipants();
        logger.info('>>> reached before schismingHub.getParticipantsByGroupIds()');
        var participantsByGroupIds = schismingHub.getParticipantsByGroupIds(allParticipants);

        var thisParticipantJid = APP.conference.getMyUserId();
        var thisParticipantGroupId = schismingHub.getSchismingGroupIdForParticipant(thisParticipantJid);

        var groupsAndMembers = [];
        logger.info('>>> reached before for() with number of groups=' + Object.keys(participantsByGroupIds).length);

        for(var groupId in participantsByGroupIds) {
            logger.info('>>> groupId=' + groupId);
            //var groupDivStart = (<div className="schisming-group">); // TODO fix
            //groupsAndMembers.push(groupDivStart); // TODO fix

            if(thisParticipantGroupId == groupId) {
                var thisParticipantName = APP.conference.getLocalDisplayName();
                logger.info('>>> adding this participant ' + thisParticipantName);
                //var thisParticipantDiv = (<div className="schisming-group-member">{thisParticipantName}</div>); // TODO fix
                //groupsAndMembers.push(thisParticipantDiv); // TODO fix
            }

            var participants = participantsByGroupIds[groupId];
            for(var i = 0; i < participants.length; i++) {
                logger.info('>>> participant=' + participants[i]);
                var participantId = participants[i].getId();
                var participantName = APP.conference.getParticipantDisplayName(participantId);
                //var participantDiv = (<div className="schisming-group-member">{participantName}</div>); // TODO fix
                //groupsAndMembers.push(participantDiv); // TODO fix
            }

            logger.info('>>> participants=' + participants.toString());
            //var groupDivEnd = (<div className="schisming-group-id">{groupId}</div></div>); // TODO fix
            //groupsAndMembers.push(groupDivEnd); // TODO fix
        }
        return groupsAndMembers;
    }

    _joinGroup: (Object) => void;

    _joinGroup(event) {
        logger.info('_joinGroup');
        //TODO implement
    }
}

export default SchismingGroups;
