@REM @Author: Nundy
@REM @Date:   2017-09-03 20:06:24
@REM @Last Modified by:   Administrator
@REM Modified time: 2017-09-06 14:11:00
@echo off
hexo clean && hexo g && node createPhotoList.js && hexo d