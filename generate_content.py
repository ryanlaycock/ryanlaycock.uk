import yaml
from yaml.loader import SafeLoader
import requests
import pathlib
import shutil

contentDir = ""

def create_content_page(page):
    if "remoteURL" not in page:
        path=contentDir+"content"+page["siteURL"]
        if "staticURL" not in page:
            print("Not generating static content for:", page["name"])
        else:
            print("Moving static content:", page["name"], "at:", path, "from:", page["staticURL"])
            pathlib.Path(path).mkdir(parents=True, exist_ok=True)
            shutil.copyfile(page["staticURL"], path+"/index.html")

    else:
        source="https://api.github.com/repos/"+page["remoteURL"]+"/readme/"
        if "remoteSubDir" in page:
            source+=page["remoteSubDir"]
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
    shutil.copyfile("index.html", contentDir+"/index.html")
    shutil.copyfile("tmpl.html", contentDir+"/tmpl.html")


# Open the file and load the file
with open('content.yaml') as f:
    data = yaml.load(f, Loader=SafeLoader)
    print(data)


title = data['title']
contentDir = data["contentDir"]
print("Creating content for website:", title)

content = data['content']
for c in content:
    create_content_page(c)

move_base_files()


