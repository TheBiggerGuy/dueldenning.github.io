import url_parse from './utils';

var url_parts = parse_url(window.location).pathname.split('/');

export function lawfight() {
	var result = {};
	result.task_name = url_parts[2];
	result.room_id = url_parts[4];
	return lawfight;
}