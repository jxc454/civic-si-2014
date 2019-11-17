const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = {
    entry: ['./dist/lambda.js'],
    target: 'node',
    mode: 'production',
    output: {
        path: `${process.cwd()}/bin`,
        filename: 'lambda.js',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        // ignore the drivers you don't want.
        // This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
        new FilterWarningsPlugin({
            exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg-query-stream/, /redis/, /sqlite3/]
        })
    ]
}
