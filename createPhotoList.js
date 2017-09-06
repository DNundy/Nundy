/*
* @Author: Nundy
* @Date:   2017-08-15 15:47:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-06 14:10:00
*/
"use strict";
const fs    = require("fs");
const join  = require("path").join;
const path  = "./photos";

fs.readdir(path, function (err, files) {
    let arr   = [];
    if (err) {
        return;
    }
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile("./public/photos/list.json", JSON.stringify(arr, null, "\t"));
            return;
        }
        fs.stat(path + "/" + files[index], function (err, stats) {
            if (err) {
                return;
            }
            if (stats.isDirectory()) {
                let link  = [];
                let text  = [];
                let fpath = join(path,fs.readdirSync(path)[index]);

                fs.readdirSync(fpath).forEach(function(value) {
                    link.push(value);
                    text.push(value.split('.',1)[0]);
                })
                arr.push({
                    "date"  : JSON.stringify(fs.readdirSync(path)[index]).substr('4','10'),
                    "link"  : link,
                    "text"  : text
                });
            }
            iterator(index + 1);
        })
    }(0));
});