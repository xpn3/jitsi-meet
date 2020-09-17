import { PARTICIPANT_JOINED } from '../base/participants/actionTypes';
import { MiddlewareRegistry } from '../base/redux';

import { SET_BILLING_ID } from './actionTypes';
import { countEndpoint } from './actions';
import { setBillingId } from './functions';

/**
 * The redux middleware for billing counter.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */

let wasCounted = false;

MiddlewareRegistry.register(store => next => async action => {
    switch (action.type) {
    case SET_BILLING_ID: {
        setBillingId(action.value);

        break;
    }

    case PARTICIPANT_JOINED: {
        if (!wasCounted && !action.participant.local) {
            store.dispatch(countEndpoint());
            wasCounted = true;
        }

        break;
    }
    }

    return next(action);
});
