$(function(){
    console.log("trying to get content.yaml")
    $.get("/content.yaml", function( content ) {
        try {
            const doc = yaml.load(content);
            console.log(doc);
        } catch (e) {
            console.log(e);
        }
    });
});
