const Ajv = require('ajv');
const logger = require('../src/utils/logger');
const ErrorTracker = require('../src/utils/error-tracking');

class TestValidator {
    constructor() {
        this.ajv = new Ajv({ allErrors: true });
    }

    validateTestSuite(testSuite, schema) {
        const validate = this.ajv.compile(schema);
        const valid = validate(testSuite);

        if (!valid) {
            const validationErrors = validate.errors.map(error => ({
                path: error.instancePath,
                message: error.message
            }));

            logger.error('Test suite validation failed', { errors: validationErrors });
            ErrorTracker.trackError(new Error('Test Suite Validation Failed'), {
                validationErrors
            });

            return {
                isValid: false,
                errors: validationErrors
            };
        }

        return { isValid: true };
    }

    static createTestSchema() {
        return {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                testCases: {
                    type: 'array',
                    minItems: 1,
                    items: {
                        type: 'object',
                        required: ['name', 'steps', 'expectedResult']
                    }
                }
            },
            required: ['name', 'testCases'],
            additionalProperties: false
        };
    }
}

module.exports = TestValidator;