#!/bin/bash

hexo clean&&hexo g&&node createPhotoList.js&&hexo s