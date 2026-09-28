import * as fs from 'node:fs'
import * as os from 'node:os'

const isCloud = process.env.TEST_ENV === 'cloud'

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    user: isCloud ? process.env.LT_USERNAME : undefined,
    key: isCloud ? process.env.LT_ACCESS_KEY : undefined,

    specs: ['./test/specs/**/*.ts'],

    exclude: [],

    maxInstances: 10,

    capabilities: [
        isCloud
            ? {
                  browserName: 'chrome',
                  browserVersion: 'latest',
                  platformName: 'Windows 11',
                  'LT:Options': {
                      build: 'Automacao de Testes Web',
                      name: 'WebDriverIO Tests',
                  },
              }
            : {
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

        const browserName = capabilities.browserName ?? 'Unknown'
        const browserVersion = capabilities.browserVersion ?? 'Unknown'
        const operatingSystem =
            capabilities.platformName ?? os.type().replace('_NT', '')

        const environment = [
            `Browser=${browserName}`,
            `Browser Version=${browserVersion}`,
            `Operating System=${operatingSystem}`,
        ].join('\n')

        fs.mkdirSync('allure-results', { recursive: true })

        fs.writeFileSync('allure-results/environment.properties', environment)
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
