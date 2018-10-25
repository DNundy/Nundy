#!/bin/bash

hexo clean && hexo g && node createPhotoList.js && hexo d&&clear&&echo 'Success !'