//document.getElementById('comments').style.visibility = 'hidden';

let comments = document.getElementById('comments');
let comments_html = comments.outerHTML;
//console.log(comments);
var tabs_div = document.createElement('div');
var tabs = document.createElement('button');
tabs.innerHTML = 'BckPck';
tabs_div.appendChild(tabs);
comments.prepend(tabs_div);