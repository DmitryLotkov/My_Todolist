module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-create-react-app",
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.tsx?$/],
                },
                loaderOptions: {
                    injectStoryParameters : false ,
                    prettierConfig: {
                        printWidth: 80, singleQuote: false,
                        options: {parser: "typescript"}
                    },
                },
            },

        },
        {
            name: '@storybook/addon-docs',
            options: {
                sourceLoaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
    ],

    "framework": "@storybook/react",
    "core": {
        "builder": "webpack5"
    }
}