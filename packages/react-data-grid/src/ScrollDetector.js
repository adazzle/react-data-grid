import React from 'react';

class ScrollDetector extends React.Component {
    clearScrollTimer = () => {
        if (this.resetScrollStateTimeoutId) {
            clearTimeout(this.resetScrollStateTimeoutId);
        }
    };

    resetScrollStateAfterDelay = () => {
        this.clearScrollTimer();
        this.resetScrollStateTimeoutId = setTimeout(
            this.resetScrollStateAfterDelayCallback,
            500
        );
    };

    resetScrollStateAfterDelayCallback = () => {
        this.resetScrollStateTimeoutId = null;
        this.setState({
            isScrolling: false
        });
    };
}