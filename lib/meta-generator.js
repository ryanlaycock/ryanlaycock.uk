$(function(){
    let config = {}
    console.log("trying to get config.yaml")
    $.get("http://192.168.0.13/config.yaml", function( configFile ) {
        try {
            config = jsyaml.load(configFile);
            console.log(config);

            // Create and set file tree
            if (window.location.pathname !== "/") {
                generateFileTree(config);
            }
            
            // Populate #social div
            generateSocials(config)
            generateHeaderLinks(config)

            // Get current file
            let file = getFileFromConfig(config)
            generateTitle(file) // Set title of current file

            // Functions to run once the whole DOM has loaded - ie divs for the data to be injected into
            $(document).ready(function(){
                generatePinnedPosts(file) // Set the pinnedPosts for the current file
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
    if (path[0] == "Ubuntu") {
        return
        // TODO WIP testing hack
    }
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

    $("#fileTree").html(links);
}

function generateTitle(file) {
    document.title = file.name;
}

function generateSocials(config) {
    let socials = "";
    config.header.socials.forEach(function(v, k) {
        socials += "<a href='"+v.url+"'><i class='"+v.icon+"'></i></a>";
    });
    $("#social").html(socials);
}

function generateHeaderLinks(config) {
    let links = "";
    config.header.links.forEach(function(v, k) {
        links += "<a href='"+v.url+"'>"+v.name+"</a>";
    });
    $("#links").html(links);
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
        if (directory === undefined || directory.children === undefined) {
            return directory;
        }
        next = directory.children;
    });
    return directory
}

function generatePinnedPosts(config, file) {
    if (file.pinnedPosts === undefined) { return }
    innerHTML = ""
    waitForElm('#pinned-posts').then((elm) => {
        console.log('#pinned-posts is ready');
        innerHTML = ""
        for (const [key, postfileName] of Object.entries(file.pinnedPosts)) {
            let postfileNameSplit = postfileName.slice(1).split("/");
            let pinnedPost = config.content; // Loop through file tree to get latest pinnedPost
            path.forEach(function(v, k) {
                pinnedPost = pinnedPost["/"+v];
            });
            console.log(pinnedPost);
            innerHTML += `
            <div class="pinned-post-card">
                <h1>`+pinnedPost.name+`</h1>
                <p>`+pinnedPost.description+`</p>
                <p class="date">`+pinnedPost.date+`</p>
            </div>`
        }
        $("#pinned-posts").html(innerHTML);
    });
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
