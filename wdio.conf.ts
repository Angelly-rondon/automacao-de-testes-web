import * as fs from 'node:fs'
import * as os from 'node:os'

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: ['./test/specs/**/*.ts'],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [
        {
            browserName: 'chrome',
        },
    ],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                addConsoleLogs: true,
            },
        ],
    ],

    before: async function () {
        const capabilities = browser.capabilities

        const environment = [
            `Browser=Google Chrome`,
            `Browser Version=${capabilities.browserVersion ?? 'Unknown'}`,
            `Operating System=${os.type().replace('_NT', '')}`,
            `OS Version=${os.version()}`,
        ].join('\n')

        fs.mkdirSync('allure-results', { recursive: true })
        fs.writeFileSync(
            'allure-results/environment.properties',
            environment,
        )
    },

    // Captura screenshot ao final de cada teste para anexar ao relatório Allure
    afterTest: async function () {
        await browser.takeScreenshot()
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
}
