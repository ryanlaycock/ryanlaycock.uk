#!/bin/bash
while getopts o:r:f:d: flag
do
    case "${flag}" in
	o) owner=${OPTARG};;
        r) repo=${OPTARG};;
        d) dest=${OPTARG};;
	f) folder=${OPTARG};;
    esac
done

echo "Parsing MD to HTML"
url="https://api.github.com/repos/$owner/$repo/readme/$folder"
dest=$dest"readme.html"
echo "URL: $url"
echo "to $dest"


curl \
  -H "Accept: application/vnd.github.html" \
  https://api.github.com/repos/$owner/$repo/readme/$folder \
  > $dest
