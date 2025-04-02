const fs = require('fs');
const path = require('path');
const logger = require('../src/utils/logger');
const config = require('../src/config/config-loader');

class TestCoverageStrategy {
    constructor() {
        this.coverageThresholds = config.get('testCoverage');
    }

    analyzeCoverage(coverageReport) {
        const metrics = {
            lines: this.checkCoverageMetric(coverageReport.lines.pct, this.coverageThresholds.minLine),
            branches: this.checkCoverageMetric(coverageReport.branches.pct, this.coverageThresholds.minBranch),
            functions: this.checkCoverageMetric(coverageReport.functions.pct, this.coverageThresholds.minFunction)
        };

        const overallStatus = Object.values(metrics).every(metric => metric.passed);

        logger.info('Test Coverage Analysis', { 
            metrics, 
            overallStatus,
            thresholds: this.coverageThresholds 
        });

        return {
            ...metrics,
            passed: overallStatus
        };
    }

    checkCoverageMetric(actualCoverage, threshold) {
        return {
            actual: actualCoverage,
            threshold,
            passed: actualCoverage >= threshold
        };
    }

    generateDetailedReport(coverageReport) {
        const reportPath = path.resolve(__dirname, '..', 'reports', 'coverage-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(coverageReport, null, 2));
        return reportPath;
    }
}

module.exports = TestCoverageStrategy;