var pathname = "/content" + window.location.pathname + "/index.html";

$(function(){
    let article = $(".article");
    article.load(pathname);
    // TODO Something incase of 404/not found
});
