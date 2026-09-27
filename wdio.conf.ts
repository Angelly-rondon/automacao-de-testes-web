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
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    // Captura screenshot ao final de cada teste para anexar ao relatório Allure
    afterTest: async function () {
        await browser.takeScreenshot()
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
}
