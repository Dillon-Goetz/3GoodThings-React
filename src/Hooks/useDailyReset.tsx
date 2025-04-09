// This hook sets a timeout to call a reset function at midnight every day.
import { useEffect } from "react";

const useDailyReset = (resetCallback: () => void) => {
    useEffect(() => {
        const getTimeUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            return midnight.getTime() - now.getTime();
        };

        const timeoutId = setTimeout(resetCallback, getTimeUntilMidnight());
        return () => clearTimeout(timeoutId);
    }, [resetCallback]);
};

export default useDailyReset;