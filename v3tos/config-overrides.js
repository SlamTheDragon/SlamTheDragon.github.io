module.exports = function override(config, env) {
    // Change the output filename and path
    config.output.filename = "static/js/status.js";
    config.output.chunkFilename = "static/js/statuschunk.js";
    config.output.path = config.output.path.replace("build", "build");

    // Change the CSS filename and path
    config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === "MiniCssExtractPlugin") {
            plugin.options.filename = "static/css/status.css";
        }
    });

    // Change the asset filename
    config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
            rule.oneOf.forEach((innerRule) => {
                if (
                    innerRule.loader &&
                    innerRule?.loader.includes("file-loader") &&
                    innerRule.options &&
                    innerRule.options.name
                ) {
                    // innerRule.options.name = "static/media/[name].[hash:8].[ext]";
                    innerRule.options.name = "static/media/[name].[ext]";
                }
            });
        }
    });

    return config;
}