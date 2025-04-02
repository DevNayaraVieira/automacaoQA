const environments = {
    development: {
        apiUrl: 'http://localhost:3001',
        logLevel: 'debug',
        enableMocks: true
    },
    staging: {
        apiUrl: 'https://staging-api.example.com',
        logLevel: 'info',
        enableMocks: false
    },
    production: {
        apiUrl: 'https://api.example.com',
        logLevel: 'error',
        enableMocks: false
    }
}

module.exports = environments[process.env.NODE_ENV || 'development']