module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        ],
        plugins: [
            // must be last
            "react-native-worklets/plugin",
        ],
    };
};



// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: [
//             ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//             //  "nativewind/babel",
//         ],
//         plugins: [
             // // dotenv plugin if you want .env
            // ["module:react-native-dotenv", {
            //     envName: 'default',
            //     moduleName: '@env',
            //     path: '.env',
            //     allowUndefined: true,
            // },],
//             "react-native-worklets/plugin", // must be last
//         ],
//     };
// };


