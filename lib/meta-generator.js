$(function(){
    let config = {}
    console.log("trying to get config.yaml")
    $.get("/config.yaml", function( configFile ) {
        try {
            config = jsyaml.load(configFile);
            console.log(config);

            // Create and set file tree
            generateFileTree(config)

            // Get current file
            let file = getFileFromConfig(config)
            generateTitle(file) // Set title of current file

            // Functions to run once the whole DOM has loaded - ie divs for the data to be injected into
            $(document).ready(function(){
                generateChildrenMeta(file) // Set the children meta for the current file
            });
        } catch (e) {
            console.log(e);
        }
    });
});

function generateFileTree(config) {
    let links = "<a href='/'>/Home</a>";
    let path = window.location.pathname.slice(1).split("/");
    let growingPath = ""
    let base = config.content;
    // For each level in the current path:
    // get the file name from the config file, and append to a list of links
    path.forEach(function(v, k) {
        growingPath += "/"+v
        file = base["/"+v]
        links += "<a href='"+growingPath+"'>/"+file.name+"</a>";
        base = file.children
    });

    document.getElementById("fileTree").innerHTML = links;
}

function generateTitle(file) {
    document.getElementById("title").innerHTML = file.name;
}

// generateChildrenMeta adds to the #children-files all the _next level_ children links
// TODO make async so non blocking?
function generateChildrenMeta(file) {
    waitForElm('#children-files').then((elm) => {
        console.log('#children-files is ready');
        childDivs = ""
        for (const [key, child] of Object.entries(file.children)) {
            childDivs = `
        <div onclick="window.location.href='`+window.location.pathname+key+`'" class="children-file">
            <p>`+child.name+`</p>
        </div>
        ` + childDivs;
        }
        document.getElementById("children-files").innerHTML = childDivs;
    });
}

function getFileFromConfig(config) {
    let path = window.location.pathname.slice(1).split("/");
    directory = {};
    next = config.content;
    path.forEach(function(v, k) {
        directory = next["/"+v];
        next = directory.children;
    });
    return directory
}

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
