$(function(){
    console.log("trying to get config.yaml")
    $.get("/config.yaml", function( content ) {
        try {
            let links = "";
            const doc = jsyaml.load(content);
            console.log(doc);
            doc.content.forEach(function(item, index) {
                if (item.siteURL == window.location.pathname) {
                    // Found this pages content
                    document.getElementById("title").innerHTML = item.name;
                    item.children.forEach(function(item, index) {
                        console.log(item.siteURL);
                        links += "<a href='"+item.siteURL+"'>"+item.name+"</a> ";
                    });
                }
            });
            document.getElementById("fileTree").innerHTML = links;
        } catch (e) {
            console.log(e);
        }
    });
});