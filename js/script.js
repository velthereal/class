// Task 1
// class Circle{
// 	constructor(radius){
// 		this._radius = radius;
// 	}
// 	get(){
// 		return this._radius;
// 	}
// 	set(value){
// 		if(value >= 0){
// 			this._radius = value;
// 		} else {
// 			console.log('Радіус повинен бути не від\'ємним числом');
// 		}
// 	}
// 	calculateArea(){
// 		return Math.PI * this._radius ** 2;
// 	}
// 	calculateCircumference(){
// 		return 2 * Math.PI * this._radius;
// 	}
// }
// let myCircle = new Circle(8);

// Task 2
class  HtmlElement{
	constructor(tagName, selfClosing = false){
		this.tagName = tagName;
		this.selfClosing = selfClosing;
		this.textContent = '';
		this.attributes = [];
		this.styles = [];
		this.children = [];
	}
	setAttribute(name, value){
		this.attributes.push({ name, value });
	}
	setStyle(property, value){
		this.styles.push({ property, value });
	}
	appendChild(childElement){
		this.children.push(childElement);
	}
	prependChild(childElement){
		this.children.unshift(childElement);
	}
	getHtml(){
		let attributesStr = this.attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ');
		let stylesStr = this.styles.map(style => `${style.property}: ${style.value}`).join('; ');

		let html = `<${this.tagName}`;
		if(attributesStr){
			html += ` ${attributesStr}`;
		}
		if(stylesStr){
			html += ` style="${stylesStr}"`;
		}
		html += '>';

		if(!this.selfClosing){
			if(this.textContent){
				html += this.textContent;
			}

			for(const child of this.children){
				html += child.getHtml();
			}
			html += `</${this.tagName}>`;
		}
		return html;
	}
}

// let wrapperDiv = new HtmlElement('div');
// wrapperDiv.setAttribute('id', 'wrapper');
// wrapperDiv.setStyle('display', 'flex');

// let innerDiv = new HtmlElement('div');
// innerDiv.setStyle('width', '300px');
// innerDiv.setStyle('margin', '10px');

// let h3 = new HtmlElement('h3');
// h3.textContent = 'What is Lorem Ipsum?';

// let img = new HtmlElement('img', true);
// img.setAttribute('src', 'https://www.lipsum.com/images/banners/black_234x60.gif');
// img.setStyle('width', '100%');
// img.setAttribute('alt', 'Lorem Ipsum');

// let p = new HtmlElement('p');
// p.setStyle('text-align', 'justify');
// p.textContent = `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`;

// let link = new HtmlElement('a');
// link.setAttribute('href', 'http://www.lipsum.com/');
// link.setAttribute('target', '_blank');
// link.textContent = 'More...';

// p.appendChild(link);

// innerDiv.appendChild(h3);
// innerDiv.appendChild(img);
// innerDiv.appendChild(p);

// wrapperDiv.appendChild(innerDiv);
// document.write(wrapperDiv.getHtml());

// Task 3
class CssClass{
	constructor(name){
		this.name = name;
		this.styles = [];
	}
	setStyle(property, value){
		let isThereStyle = this.styles.find(style => style.property === property);
		if(isThereStyle){
			isThereStyle.value = value;
		} else {
			this.styles.push({ property, value });
		}
	}
	deleteStyle(property){
		let index = this.styles.sindIndex(style => style.property === property);
		if(index !== -1){
			this.styles.splice(index, 1);
		}
	}
	getCss(){
		let stylesStr = this.styles.map(style => `${style.property}: ${style.value};`).join(' ');
		return `.${this.name} { ${stylesStr} }`;
	}
}

// let myClass = new CssClass('class');
// myClass.setStyle('color', 'red');
// myClass.setStyle('font-size', '16px');
// myClass.setStyle('background-color', 'yellow');

// console.log(myClass.getCss());

// Task 4
class HtmlBlock{
	constructor(){
		this.cssClasses = [];
		this.rootElement = null;
	}
	addCssClass(cssClass){
		this.cssClasses.push(cssClass);
	}
	setRootElement(rootElement){
		this.rootElement = rootElement;
	}
	getCode(){
		let cssCode = '';
		for(const cssClass of this.cssClasses){
			cssCode += cssClass.getCss() + '\n';
		}

		let htmlCode = this.rootElement.getHtml();
		return `<html><head><style>${cssCode}</style></head><body>${htmlCode}</body></html>`;
	}
}

let block = new HtmlBlock();

let wrapClass = new CssClass('wrap');
wrapClass.setStyle('display', 'flex');

let blockClass = new CssClass('block');
blockClass.setStyle('width', '300px');
blockClass.setStyle('margin', '10px');

let imgClass = new CssClass('img');
imgClass.setStyle('width', '100%');

let textClass = new CssClass('text');
textClass.setStyle('text-align', 'justify');

block.addCssClass(wrapClass);
block.addCssClass(blockClass);
block.addCssClass(imgClass);
block.addCssClass(textClass);

let rootElement = new HtmlElement('div');
rootElement.setAttribute('id', 'wrapper');

let innerDiv = new HtmlElement('div');
innerDiv.setAttribute('class', 'block');

let h3 = new HtmlElement('h3');
h3.textContent = 'What is Lorem Ipsum?';

let img = new HtmlElement('img');
img.setAttribute('class', 'img');
img.setAttribute('src', 'https://www.lipsum.com/images/banners/black_234x60.gif');
img.setAttribute('alt', 'Lorem Ipsum');

let p = new HtmlElement('p');
p.setAttribute('class', 'text');
p.textContent = `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`;

let link = new HtmlElement('a');
link.setAttribute('href', 'http://www.lipsum.com/');
link.setAttribute('target', '_blank');
link.textContent = 'More...';

p.appendChild(link);

innerDiv.appendChild(h3);
innerDiv.appendChild(img);
innerDiv.appendChild(p);

rootElement.appendChild(innerDiv);

block.setRootElement(rootElement);

document.write(block.getCode());