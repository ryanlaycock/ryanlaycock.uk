import yaml
from yaml.loader import SafeLoader
import requests
import pathlib
import shutil
import os

content_dir = ""

def create_content_page(page):
    path=content_dir+"content"+page["siteURL"]
    if "githubProject" not in page:
        if "staticURL" not in page:
            print("Not generating static content for:", page["name"])
        else:
            print("Moving static content:", page["name"], "at:", path, "from:", page["staticURL"])
            pathlib.Path(path).mkdir(parents=True, exist_ok=True)
            shutil.copyfile(page["staticURL"], path+"/index.html")

    else:
        source="https://api.github.com/repos/"+page["githubProject"]+"/contents/"+page["filePath"]
        pathlib.Path(path).mkdir(parents=True, exist_ok=True)
        print("Creating page:", page["name"], "at:", path, "from:", source)
        download_page(source, path+"/index.html")

    if "children" in page:
        for child in page["children"]:
            create_content_page(child)


def download_page(source, dest):
    resp = requests.get(source, headers = {"Accept": "application/vnd.github.html"})
    with open(dest, "w") as f:
        f.write(resp.text)


def move_base_files():
    shutil.copyfile("static_content/index.html", content_dir+"/index.html")
    shutil.copyfile("static_content/tmpl.html", content_dir+"/tmpl.html")
    shutil.copyfile("content.yaml", content_dir+"/content.yaml")

    # Copy /lib
    copy_and_overwrite("lib", content_dir+"/lib")

def copy_and_overwrite(src, dst):
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


# Open the file and load the file
with open('content.yaml') as f:
    data = yaml.load(f, Loader=SafeLoader)
    print(data)


title = data['title']
content_dir = data["contentDir"]
print("Creating content for website:", title)

content = data['content']
for c in content:
    create_content_page(c)

move_base_files()


