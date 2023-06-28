document.addEventListener("DOMContentLoaded", ()=>{
    renderBooks();
});
const booksUrl = 'http://localhost:3000/books';
const usersUrl = 'http://localhost:3000/users';

function renderBooks(){
    fetch(booksUrl)
        .then(resp=>resp.json())
        .then(books=>{
            books.forEach(book=>{
                createBooks(book)
            })
        })
}

function createBooks(book){
    const list = document.getElementById('list');

    const bookTitle = document.createElement('li');
    bookTitle.textContent = book.title;
    list.appendChild(bookTitle);

    bookTitle.addEventListener('click',(e)=>{
        e.preventDefault();
        showBooks(book)
    })
}

function showBooks(book){
    const showPanel = document.getElementById('show-panel');
    showPanel.innerHTML = '';

    const img = document.createElement('img');
    img.src = book.img_url;
    showPanel.appendChild(img);

    const bookTitle = document.createElement('h1');
    bookTitle.textContent = book.title;
    showPanel.appendChild(bookTitle);

    const bookSubTitle = document.createElement('h2');
    bookSubTitle.textContent = book.subtitle;
    showPanel.appendChild(bookSubTitle);

    const bookAuthor = document.createElement('h3');
    bookAuthor.textContent = book.author;
    showPanel.appendChild(bookAuthor);

    const description = document.createElement('p');
    description.textContent = book.description;
    showPanel.appendChild(description);

    const userLiked = document.createElement('ul');
    userLiked.id = 'users';
    const userNames = book.users;
    userNames.forEach(userName=>{
        const nameOfUser = document.createElement('li');
        nameOfUser.textContent = userName.username;
        userLiked.appendChild(nameOfUser);
    })
    showPanel.appendChild(userLiked);

    const likeButton = document.createElement('button');
    const myInfo = {
        id:1,
        username:'pouros'
    };
    if(book.users.some(user=> user.id === myInfo.id)){
        likeButton.textContent = 'UNLIKE';
    }else{
        likeButton.textContent = 'LIKE';
    }
    likeButton.id = 'like-btn';
    likeButton.addEventListener('click',()=>likingButton(book))
    showPanel.appendChild(likeButton)
};

function likingButton(book){
    const bookId = book.id;
    const myInfo = {
        id:1,
        username:'pouros'
    };
    if(book.users.some(user=> user.id === myInfo.id)){
        book.users = book.users.filter(user=>user.id !== myInfo.id);
    }else{
        book.users.push(myInfo)
    }

    const updatedUsers = { users:book.users };
    
    fetch(`${booksUrl}/${bookId}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(updatedUsers)
    })
    .then(resp=>resp.json())
    .then(book=>showBooks(book))
};