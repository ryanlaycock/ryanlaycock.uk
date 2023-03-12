$(function(){
    let config = {}
    console.log("trying to get config.yaml")
    $.get("http://192.168.0.13/config.yaml", function( configFile ) {
        try {
            config = jsyaml.load(configFile);
            console.log(config);

//            // Create and set file tree
//            if (window.location.pathname !== "/") {
//                generateFileTree(config);
//            }
            
            // Populate #social div
            generateSocials(config)
            generateHeaderLinks(config)

            // Get current file
            let file = getFileFromConfig(config)
            generateTitle(file) // Set title of current file

            // Functions to run once the whole DOM has loaded - ie divs for the data to be injected into
            $(document).ready(function(){
                generatePinnedPosts(config, file) // Set the pinnedPosts for the current file
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
    if (file.children === undefined || file.childrenHeader === undefined) { return; }
    waitForElm('#child-posts').then((elm) => {
        console.log('#child-posts is ready');
        let innerHTML = `<h1>`+file.childrenHeader+`</h1>
        <div id="child-posts-flex">`;
        for (const [key, child] of Object.entries(file.children)) {
            innerHTML += `
            <a href="`+window.location.pathname+key+`">
                <div class="child-post-card">
                    <h4>`+child.name+`</h4>
                    <p>`+child.description+`</p>
                    <p class="date">`+luxon.DateTime.fromISO(child.date).toFormat("d MMM yyyy")+`</p>
                </div>
            </a>`;
        }
        $("#child-posts").html(innerHTML);
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
        let innerHTML = `<h1>`+file.pinnedPostsHeader+`</h1>
        <div id="pinned-posts-flex">`
        for (const [key, postfileName] of Object.entries(file.pinnedPosts)) {
            let postfileNameSplit = postfileName.slice(1).split("/");
            let next = config.content; // Loop through file tree to get latest pinnedPost
            postfileNameSplit.forEach(function(v, k) {
                console.log(v)
                pinnedPost = next["/"+v];
                next = next["/"+v].children;
            });
            console.log(luxon.DateTime.fromISO(pinnedPost.date));
            innerHTML += `
            <a href="`+postfileName+`">
                <div class="pinned-post-card">
                    <h4>`+pinnedPost.name+`</h4>
                    <p>`+pinnedPost.description+`</p>
                    <p class="date">`+luxon.DateTime.fromISO(pinnedPost.date).toFormat("d MMM yyyy")+`</p>
                </div>
            </a>`;
        }
        innerHTML += `</div>`
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
