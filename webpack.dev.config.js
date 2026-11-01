import { resolve } from 'path';

export const mode = 'development';
export const devtool = 'inline-source-map';
export const devServer = {
    static: resolve(__dirname, './dist'),
};
