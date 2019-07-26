"use strict";

import CONFIG from './config';
import ViewUpdater from './ViewUpdater';
import DomReady from './DomReady';
import MailChecker from './MailChecker';

DomReady()
    .then(res => {
        new MailChecker(CONFIG, ViewUpdater);
    });
