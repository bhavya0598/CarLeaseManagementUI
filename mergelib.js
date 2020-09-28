const merge = require('concat');
const files = [
    'dist/LeaseManagementUI/runtime.js',
    'dist/LeaseManagementUI/polyfills.js',
    'dist/LeaseManagementUI/runtime.js',
    'dist/LeaseManagementUI/scripts.js',
    'dist/LeaseManagementUI/main.js',
]
merge(files,'dist/LeaseManagementUI/LeaseManagementUI.js',)
console.info('file generated');