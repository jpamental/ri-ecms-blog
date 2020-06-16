/* Widow fix */

/* chapter paragraphs */
wt.fix({
	elements: '.chapter > p',
	chars: 15,
	method: 'padding-right',
	event: 'resize'
});

/* paragraphs within blockquotes */
wt.fix({
	elements: 'blockquote > p',
	chars: 10,
	method: 'nbsp',
	event: 'resize'
});

window.onload = function(){

}
window.onresize = function(){

}

const menus = [].slice.call(document.querySelectorAll('.dd-menu'));
const settingsMenuToggle = document.getElementById('settings_trigger');
const tocMenuToggle = document.getElementById('toc_trigger');

const pageMask = document.createElement("div");
let divContent = document.createTextNode(" "); 
pageMask.appendChild(divContent);
pageMask.id = 'page_mask';
pageMask.classList.add('page-mask');
document.getElementsByTagName("body")[0].appendChild(pageMask);

if (pageMask) {
	document.getElementsByTagName("html")[0].classList.add('touch-nav');

	pageMask.addEventListener('click', function(e) {
		e.preventDefault();
		pageMask.classList.remove('active');
		for (let i = 0; i < menus.length; i++) {
			menus[i].classList.remove('open');
		}
	});
}



const ddMenuTriggers = [].slice.call(document.querySelectorAll('.dd-menu-trigger'));
ddMenuTriggers.forEach(ddMenuTrigger => ddMenuTrigger.addEventListener('click', function(e) {
	e.preventDefault();
	if (ddMenuTrigger.parentElement.classList.contains('open')) {
		ddMenuTrigger.parentElement.classList.remove('open');
		pageMask.classList.remove('active');
	} else {
		// reset open menus
		for (let i = 0; i < menus.length; i++) {
			menus[i].classList.remove('open');
		}
		ddMenuTrigger.parentElement.classList.add('open');
		pageMask.classList.add('active');
	}
}));


