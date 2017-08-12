export function url_parse() {
	var a = document.createElement('a');
	a.href = url;
	return a;
}