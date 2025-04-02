const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const logger = require('../src/utils/logger');
const ErrorTracker = require('../src/utils/error-tracking');

class ExtendedTestValidator {
    constructor(options = {}) {
        this.ajv = new Ajv({
            allErrors: true,
            strict: true,
            coerceTypes: true,
            ...options
        });

        // Adicionar suporte a formatos avançados
        addFormats(this.ajv);

        // Registrar validadores personalizados
        this.registerCustomValidators();
    }

    registerCustomValidators() {
        // Validadores específicos para cenários de teste
        this.ajv.addKeyword({
            keyword: 'testConstraint',
            validate: (schema, data) => {
                // Lógica de validação customizada
                return true;
            }
        });
    }

    createComprehensiveTestSchema() {
        return {
            "": "http://json-schema.org/draft-07/schema#",
            type: 'object',
            properties: {
                name: { 
                    type: 'string', 
                    minLength: 3, 
                    maxLength: 100 
                },
                description: { 
                    type: 'string', 
                    maxLength: 500 
                },
                metadata: {
                    type: 'object',
                    properties: {
                        priority: { 
                            type: 'string', 
                            enum: ['low', 'medium', 'high', 'critical'] 
                        },
                        tags: { 
                            type: 'array', 
                            items: { type: 'string' } 
                        }
                    }
                },
                testCases: {
                    type: 'array',
                    minItems: 1,
                    items: {
                        type: 'object',
                        required: ['name', 'steps', 'expectedResult'],
                        properties: {
                            name: { type: 'string' },
                            steps: { 
                                type: 'array', 
                                minItems: 1 
                            },
                            expectedResult: { type: 'object' },
                            testConstraint: true
                        }
                    }
                }
            },
            required: ['name', 'testCases'],
            additionalProperties: false
        };
    }

    // Restante do código permanece igual...
}

module.exports = ExtendedTestValidator;