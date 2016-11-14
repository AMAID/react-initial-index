import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    entry: 'src/index.js',
    dest: 'index.js',
    format: 'umd',
    moduleName: 'ReactInitialIndex',
    plugins: [
        babel({presets: ['es2015-rollup']}),
        nodeResolve({
          module: true,
          skip: ['react', 'react-dom'],
        }),
        commonjs()
    ]
}