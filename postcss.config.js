import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default {
    plugins: {
        'postcss-preset-env': postcssPresetEnv(),
        'autoprefixer': autoprefixer(),
    },
};