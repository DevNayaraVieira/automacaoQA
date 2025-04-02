class TestStrategyFactory {
    static createStrategy(type) {
        switch(type) {
            case 'api':
                return new APITestStrategy();
            case 'ui':
                return new UITestStrategy();
            case 'performance':
                return new PerformanceTestStrategy();
            default:
                throw new Error('Invalid test strategy');
        }
    }
}

class BaseTestStrategy {
    constructor() {
        this.logger = require('../src/utils/logger');
    }

    validate() {
        throw new Error('Strategy must implement validate method');
    }
}

class APITestStrategy extends BaseTestStrategy {
    validate() {
        // Implement API-specific validation logic
    }
}

class UITestStrategy extends BaseTestStrategy {
    validate() {
        // Implement UI-specific validation logic
    }
}

class PerformanceTestStrategy extends BaseTestStrategy {
    validate() {
        // Implement performance testing validation
    }
}

module.exports = TestStrategyFactory;