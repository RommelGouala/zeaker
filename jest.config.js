module.exports = {
    preset: 'jest-puppeteer',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^lodash$': '<rootDir>/node_modules/lodash',
    },
    testEnvironment: 'jsdom',

    testEnvironmentOptions: {
        "jest-puppeteer": {
            "launch": {
                "headless": true
            }
        }
    },

    setupFilesAfterEnv: ['expect-puppeteer'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.js?(x)',
        '<rootDir>/src/**/?(*.)+(spec|test).js?(x)',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/setupTests.js',
        '!src/**/__tests__/**',
        '!src/**/__mocks__/**',
    ],
    coverageThreshold: {
        global: {
            statements: 95,
            branches: 95,
            functions: 95,
            lines: 95,
        },
    },
};