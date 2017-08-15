/*
* @Author: Administrator
* @Date:   2017-08-15 15:47:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-15 15:47:36
*/
"use strict";
const fs = require("fs");
const path = "../../photos";

fs.readdir(path, function (err, files) {
    if (err) {
        return;
    }
    let arr = [];
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile("output.json", JSON.stringify(arr, null, "\t"));
            return;
        }

        fs.stat(path + "/" + files[index], function (err, stats) {
            if (err) {
                return;
            }
            if (stats.isFile()) {
                arr.push(files[index]);
            }
            iterator(index + 1);
        })
    }(0));
});