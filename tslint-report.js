const tslintHtmlReport = require('tslint-html-report');

tslintHtmlReport({
    tslint: 'tslint.json',
    srcFiles: 'src/**/*.ts',
    outDir: 'reports/tslint-report',
    html: 'tslint-report.html',
    breakOnError: false,
    typeCheck: true,
    tsconfig: 'tsconfig.json'
});