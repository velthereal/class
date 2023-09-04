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
		let result = `<${this.tagName}`;

		for(const attribute of this.attributes){
			result += ` ${attribute.name}="${attribute.value}"`;
		}

		if(this.styles.length > 0){
			result += ' style="';
			for(const style of this.styles){
				result += `${style.property}:${style.value};`;
			}
			result += '"';
		}
		result += '>';
		if(!this.selfClosing){
			for(const child of this.children){
				result += child.getHtml();
			}
			result += this.textContent;
			result += `</${this.tagName}>`;
		}
		return result;
	}
}

let divElement = new HtmlElement('div');
divElement.setAttribute('id', 'wrapper');
divElement.setStyle('display', 'flex');
divElement.appendChild(new HtmlElement('div', false));
// divElement.setStyle('color', 'blue');
// divElement.textContent = 'Це блок div.';
// divElement.appendChild(new HtmlElement('p', false));
// divElement.children[0].textContent = 'Це параграф внутрішнього елемента.';

// Виведення HTML-коду на сторінку
document.write(divElement.getHtml());