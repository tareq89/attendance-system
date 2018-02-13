import '../main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function createNoticeTemplate (notice: string): any {
	const list: any = document.createElement('li');

	// list.appendChild(div);
	list.innerHTML = notice;
	list.setAttribute('class', 'list-group-item');
	return list;
}

function loadNotices() {
	const noticeUl = <HTMLUListElement>document.getElementById('notice-ul');
	fetch('http://localhost:3000/notice/get')
	.then((response: any) => {
		response.json().then(function(notices: any) {            
			if(noticeUl.hasChildNodes()) {
				noticeUl.innerHTML = '';
			}
			for(let { notice } of notices) {       
				const list = createNoticeTemplate(notice);
				noticeUl.appendChild(list);
			}
		});;
		
	})
	.catch((error) => {
		alert(error);
	})
}

function postNotice() {

	const description = (<HTMLTextAreaElement>document.getElementById('texteditor'));
	const createtime = Math.floor(Date.now() / 1000);

	const notice = JSON.stringify({
		notice: `<div>${description.value}</div>`,
		createtime: createtime
	});

	console.log(notice)

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://localhost:3000/notice/post', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			loadNotices();
			description.value = '';
		}
	};
	xhr.send(notice); 
			
}


function boldOnclick() {
	console.log("click")
	
}

function insertMetachars(sStartTag: string, sEndTag?: string) {
	const bDouble = arguments.length > 1; 
	const oMsgInput = <HTMLTextAreaElement>document.getElementById('texteditor');
	const nSelStart = oMsgInput.selectionStart;
	const nSelEnd = oMsgInput.selectionEnd;
	const sOldText = oMsgInput.value;
	oMsgInput.value = sOldText.substring(0, nSelStart) + 
						(bDouble ? sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag : sStartTag) + 
						sOldText.substring(nSelEnd);
	oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
	oMsgInput.focus();
}


(<HTMLSpanElement>document.getElementById('_bold')).addEventListener('click', (e:Event) => {
	insertMetachars('<strong>','</strong>');
});

(<HTMLSpanElement>document.getElementById('title')).addEventListener('click', (e:Event) => {
	insertMetachars('<div><h1>', '</h1><div>');
});

(<HTMLSpanElement>document.getElementById('subtitle')).addEventListener('click', (e:Event) => {
		insertMetachars('<div><sub>','</sub><div>');	
});

(<HTMLButtonElement>document.getElementById('loginButton')).addEventListener('click', (e: Event) => {
	postNotice();
	e.preventDefault();
});

loadNotices();