import '../main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const loginButton: any = <HTMLButtonElement>document.getElementById('loginButton');


const noticeTemplate: string = `<li class="list-group-item">
                    <div>
                        <h1>Tomorrow Office closed</h1>
                        <h6>HR notice</h6>
                        <span>Tomorrow is office closed due to some reason</span>
                    </div>
                </li>`;

function createNoticeTemplate (notice: any): any {
    const title: any = notice.title;
    const subTitle: any = notice.subTitle;
    const description: any = notice.description;

    const list: any = document.createElement('li');
    const div : any = document.createElement('div');
    const h1: any = document.createElement('h1');
    const h6: any = document.createElement('h6');
    const span: any = document.createElement('span');

    h1.appendChild(document.createTextNode(title));
    h6.appendChild(document.createTextNode(subTitle));
    span.appendChild(document.createTextNode(description));
    div.appendChild(h1);
    div.appendChild(h6);
    div.appendChild(span);

    list.appendChild(div);
    list.setAttribute('class', 'list-group-item');
    return list;
}



loginButton.addEventListener('click', () => {
    console.log("ASdSADA");
    // e.preventDefault();
});
// console.log(loginButton);



const noticeUl = <HTMLUListElement>document.getElementById('notice-ul');
fetch('http://localhost:3000/notice/get')
    .then((response: any) => {
        response.json().then(function(notices: any) {
            console.log("this is the notices")
            console.log(notices);
            for(let notice of notices) {
                console.log(notice);
                const list = createNoticeTemplate(notice);
                noticeUl.appendChild(list);
            }
        });;
        
    })
    .catch((error) => {
        alert(error);
    })