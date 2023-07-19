import store from "../store/index";
import { authActions } from "../store/auth-slice";
import { logout } from "../services/Authentication";
import { browserNotification } from "./desktop-notifications";
import { uiActions } from "../store/ui-slice";

class IdleTimer {
    constructor(
        inactivityTimeout = 60 /* minutes */,
        warningTimeout = 5 /* minutes */
    ) {
        this.inactivityTimeout = inactivityTimeout; // minutes
        this.warningTimeout = this.inactivityTimeout - warningTimeout; //minutes
    }

    beginTimers() {
        window.addEventListener("click", () => {
            this.extendSession();
        });
        window.addEventListener("keydown", () => {
            this.extendSession();
        });

        this.extendSession();
    }

    extendSession() {
        clearTimeout(this.logoutTimer);
        clearTimeout(this.warningTimer);

        this.logoutTimer = setTimeout(() => {
            this.timerExpired();
        }, this.inactivityTimeout * 60000);

        this.warningTimer = setTimeout(() => {
            this.warningTimerExpired();
        }, this.warningTimeout * 60000);
    }

    timerExpired() {
        console.log(`inactivity timer expired`);

        // clear Redux auth state
        store.dispatch(authActions.logout);

        // clear sessionStorage
        logout();

        // Refresh the browser
        window.location.reload();
    }

    warningTimerExpired() {
        console.log(`inactivity warning timer expired`);

        // Trigger an "extend session" message
        store.dispatch(
            uiActions.showNotification({
                status: "Inactivity Warning",
                title: "Inactivity Warning",
                message: "You are about to be logged out due to inactivity. Click 'Continue' to extend your session",
            })
        );

        browserNotification(
            "Warning",
            "You are about to be logged out due to inactivity.",
            process.env.PUBLIC_URL + "/resources/img/caution.png"
        );
    }
}

export default IdleTimer;
