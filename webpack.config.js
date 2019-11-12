module.exports = {
    entry: ['./dist/lambda.js'],
    target: 'node',
    mode: 'production',
    output: {
        path: `${process.cwd()}/bin`,
        filename: 'lambda.js',
        libraryTarget: 'umd'
    }
};