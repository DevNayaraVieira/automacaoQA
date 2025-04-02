const BaseValidator = require('../TestValidationOrchestrator').BaseTestValidator;

class IntegrationTestValidator extends BaseValidator {
    async validate(testSuite) {
        // Validações específicas de integração
        const integrationConstraints = {
            requiredDependencies: ['services', 'configs'],
            maxExternalDependencies: 3
        };

        const validationResults = [
            this.validateDependencyConfiguration(testSuite, integrationConstraints),
            this.validateIntegrationPoints(testSuite)
        ];

        const failedValidations = validationResults.filter(result => !result.valid);

        return {
            isValid: failedValidations.length === 0,
            type: 'integration',
            details: failedValidations
        };
    }

    validateDependencyConfiguration(testSuite, constraints) {
        const missingDependencies = constraints.requiredDependencies
            .filter(dep => !testSuite[dep]);

        const externalDependencies = testSuite.externalDependencies || [];

        return {
            valid: missingDependencies.length === 0 && 
                   externalDependencies.length <= constraints.maxExternalDependencies,
            rule: 'dependency_configuration',
            details: {
                missingDependencies,
                externalDependenciesCount: externalDependencies.length
            }
        };
    }

    validateIntegrationPoints(testSuite) {
        const invalidIntegrationPoints = testSuite.testCases.filter(testCase => 
            !testCase.integrationPoints || 
            testCase.integrationPoints.length === 0
        );

        return {
            valid: invalidIntegrationPoints.length === 0,
            rule: 'integration_points_defined',
            details: invalidIntegrationPoints
        };
    }
}

module.exports = IntegrationTestValidator;