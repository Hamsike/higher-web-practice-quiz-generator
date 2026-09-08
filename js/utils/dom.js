export function cloneTemplateContent(template){
	return template.content.firstElementChild?.cloneNode(true)
}