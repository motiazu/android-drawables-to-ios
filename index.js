#!/usr/bin/env node
var fs = require('fs');

var conversions = {
    'drawable-mdpi': '@1x',
    'drawable-hdpi': '@1.5x',
    'drawable-xhdpi': '@2x',
    'drawable-xxhdpi': '@3x',
    'drawable-xxxhdpi': '@4x',
}

var formats = ['png', 'jpg', 'jpeg', 'gif'];

function copyFileSync(srcFile, destFile) {
    var inStr = fs.createReadStream(srcFile);
    var outStr = fs.createWriteStream(destFile);

    inStr.pipe(outStr);
}

function transformFileName(fileName, suffix) {
    var format = fileName.substr(fileName.lastIndexOf('.') + 1);
    var name = fileName.substr(0, fileName.lastIndexOf('.'));
    return name + suffix + "." + format;
}

var getDirs = function(p) { return fs.readdirSync(p).filter(function (f) { return fs.statSync(p+"/"+f).isDirectory();})};


getDirs('./').forEach(function(dir) {
    if(!conversions.hasOwnProperty(dir)) return;

    console.log('Copying ' + dir + ' assets');
    var fileNames = fs.readdirSync("./" + dir)
        .filter(function (f) { return !fs.statSync("./" + dir + "/" + f).isDirectory();})
        .filter(function (f) { 
            var dotIndex = f.lastIndexOf('.');
            if(dotIndex === -1) return false;
            var format = f.substr(dotIndex + 1);
            return formats.indexOf(format) !== -1;
        });
    
    fileNames.forEach(function(fileName) {
        console.log("Copying and renaming " + fileName);
        copyFileSync("./" + dir + "/" + fileName, "./" + transformFileName(fileName, conversions[dir]));
    });
});

console.log("Done.");