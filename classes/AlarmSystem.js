const {
    EMAIL_NOTIFICATION_FREQUENCY,
    MAX_ERRORS_ALLOWED
} = require('../utilities/constants');

const { getDiffInSeconds } = require('../utilities/helpers');

class PrivateAlarmSystem {
    emailNotificationTimestamp;
    pendingNofitication;
    errors;

    constructor () {
        this.emailNotificationTimestamp = 0;
        this.pendingNofitication = false;
        this.errors = [];
    }

    setError = (err) => {
        const errorMessage = `Error: ${err}`;
        const currentTimestamp = Date.now();
        const logEntry = `${new Date(currentTimestamp)}: ${errorMessage}\n`;
        this.logError(logEntry);
        this.notifyByEmail(currentTimestamp);
    }

    notifyByEmail = (timeStamp) => {
        const secondsSinceLastNotification = getDiffInSeconds(this.emailNotificationTimestamp, timeStamp) ;
        this.errors.push(timeStamp);
        // update errors array to contain only errors from the last minute
        this.errors = this.errors.filter(ts => getDiffInSeconds(ts, timeStamp) < EMAIL_NOTIFICATION_FREQUENCY);

        if (this.errors.length > MAX_ERRORS_ALLOWED) {
            if (secondsSinceLastNotification > EMAIL_NOTIFICATION_FREQUENCY) {
                this.emailNotificationTimestamp = timeStamp ;
                this.sendEmailNotification();
            } else if (!this.pendingNofitication) {
                const nextNotificationTimeout = ( EMAIL_NOTIFICATION_FREQUENCY - secondsSinceLastNotification ) * 1000;
                this.pendingNofitication = true;
                setTimeout(this.sendEmailNotification, nextNotificationTimeout);
                console.log("pendind email notification...")
            }
        }
    }

    sendEmailNotification = () => {
        this.emailNotificationTimestamp = Date.now();
        this.pendingNofitication = false;
        this.sendEmail();
    }

    logError = (logEntry) => {
        console.log('Appending entry to file...');
    }

    sendEmail = () => {
        console.log('Sending email...');
    }
}

class AlarmSystem {
    static instance;

    constructor() {
        throw new Error('Use AlarmSystem.getInstance()');
     }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PrivateAlarmSystem();
        }

        return this.instance;
    }
}

module.exports = AlarmSystem;