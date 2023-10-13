const socket = io('http://localhost:8000');

const form = document.getElementById('sendcontainer')
const massageInput = document.getElementById('sendText')
const massgecontainer = document.querySelector('.container')
// const audio=new audio('ting.mp3')


const append = (massage, position) => {
    const massageElement = document.createElement('div')
    massageElement.innerText = massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    massgecontainer.append(massageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); // NOT RELOAD WHEN SUBMIT EVENT LISTEN
    const massage=massageInput.value;
    append(`You: ${massage}`,'right');
    socket.emit('send',massage);
    massageInput.value=''
})

const name = prompt("Enter your name to join");
// const name = "pj";
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'mid');
    audio.play();
})


socket.on('receive', data => {
    append(`${data.name} : ${data.massage}`, 'left');
    audio.play();
})

socket.on('leave', data => {
    append(`${data.name} :left the chat`, 'mid');
    audio.play();
})


