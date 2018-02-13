import '../main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function createNoticeTemplate (notice: any): any {
    const title: any = notice.title;
    const subTitle: any = notice.subtitle;
    const description: any = notice.description;

    const list: any = document.createElement('li');
    const div : any = document.createElement('div');
    const h3: any = document.createElement('h1');
    const h6: any = document.createElement('h6');
    const span: any = document.createElement('span');

    h3.appendChild(document.createTextNode(title));
    h6.appendChild(document.createTextNode(subTitle));
    span.innerHTML = description;
    div.appendChild(h3);
    div.appendChild(h6);
    div.appendChild(span);

    list.appendChild(div);
    list.setAttribute('class', 'list-group-item');
    return list;
}

function loadNotices() {
    const noticeUl = <HTMLUListElement>document.getElementById('notice-ul');
    fetch('http://localhost:3000/notice/get')
    .then((response: any) => {
        response.json().then(function(notices: any) {            
            for(let notice of notices) {            
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
    class Notice {
        title: string;
        subtitle: string;
        description: string;
        createtime: number;
        constructor() {
            this.title = (<HTMLInputElement>document.getElementById('title')).value;
            this.subtitle = (<HTMLInputElement>document.getElementById('subtitle')).value;
            this.description = (<HTMLInputElement>document.getElementById('notice')).value;
            this.createtime = Math.floor(Date.now() / 1000);
        }        
    };

    const notice = JSON.stringify(new Notice());
    console.log(notice)
    // fetch('http://localhost:3000/notice/post', {
    //     method: 'post',
    //     body: notice  
    // }).then(function(result) { 
    //     console.log(result);
    //     loadNotices(); 
    // });

    fetch('http://localhost:3000/notice/post', {
                method: 'POST',
                headers : new Headers(),
                body: notice
            }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                loadNotices();
            })
            .catch((err)=>console.log(err))
}




const loginButton: any = document.getElementById('loginButton');
loginButton.addEventListener('click', (e: Event) => {
    postNotice();
    e.preventDefault();
});

loadNotices();