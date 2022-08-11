let mix = require('laravel-mix');


mix.js('src/main.js', 'dist/').vue({version: 2})
    .copy('src/index.html', 'dist/')
    .postCss("src/assets/css/main.css", "dist/assets/css", [
        require("tailwindcss"),
    ]);

mix.disableNotifications();