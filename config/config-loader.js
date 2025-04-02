const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

class ConfigurationManager {
    constructor() {
        this.environments = this.loadConfigurations();
        this.currentEnv = process.env.NODE_ENV || 'development';
    }

    loadConfigurations() {
        const configPath = path.resolve(__dirname, 'environments');
        const environments = {};

        fs.readdirSync(configPath)
            .filter(file => file.endsWith('.json'))
            .forEach(file => {
                const envName = path.basename(file, '.json');
                environments[envName] = this.parseConfig(path.join(configPath, file));
            });

        return environments;
    }

    parseConfig(filePath) {
        try {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (error) {
            logger.error(Configuration load error: );
            return {};
        }
    }

    get(key) {
        return this.environments[this.currentEnv][key];
    }
}

module.exports = new ConfigurationManager();