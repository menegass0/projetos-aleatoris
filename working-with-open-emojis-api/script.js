let body = document.getElementById('body');
let showArea = document.querySelector('.show-area');
let listArr = document.querySelector('.list');
let loadingGif = document.getElementById('loading');
const deleteButton = document.querySelector('.clear-btn');
const refreshButton = document.querySelector('.refresh-btn');
const wrapper = document.querySelector('.wrapper');

let arrEmoji = [];
let arrEmojiTemp = [];
let searchId = null;

// removerItems();
verificarDadosExistentes();
// loopTeste();

searchId = 0;
console.log('foi1');
pesquisaTodos(searchId, 20, 500);
searchId += 500;


function carregarDados() {
    let body = document.getElementById('body');
    let barra = window.innerHeight;
    let total = body.offsetHeight;
    let totalScroll = Math.round(window.scrollY);

    if((totalScroll+barra) >= total-5){
        // console.log(`searchId `+searchId+` arrEmoji.length `+arrEmoji.length)
        if(searchId < arrEmoji.length){
            loadingGif.style.display = 'block';
            deleteButton.style.display = 'none';
            setTimeout(()=>{
                pesquisaTodos(searchId, 20, 500);
                searchId += 500;
                loadingGif.style.display = 'none';
                deleteButton.style.display = 'block';
            }, 1000)
        }
    }
}; 
window.addEventListener("scroll", carregarDados);

function montarArray(item, indice) {
    arrEmojiTemp[indice] = item;
    if(arrEmojiTemp[indice].codePoint.includes('; fully-qualified')){
        let whereSlice = arrEmojiTemp[indice].codePoint.indexOf(';');
        arrEmojiTemp[indice].codePoint = arrEmojiTemp[indice].codePoint.slice(0, whereSlice-1);
        console.log(arrEmojiTemp[indice])
    }
}

function armazenarDados(data) {
    localStorage.setItem('arrEmoji', JSON.stringify(data));
}

function buscarEmojis() {
    fetch('https://emoji-api.com/emojis?access_key=86c4d9029d3a3d371e868b7f28bbe0bac0335f6c')
    .then(res => res.json())
    .then(data => {
        data.forEach(
            montarArray
        );
        armazenarDados(arrEmojiTemp);
        verificarDadosExistentes();
    });
}

function verificarDadosExistentes() {
    
    if(localStorage.getItem('arrEmoji')){
        arrEmoji = JSON.parse(localStorage.getItem('arrEmoji'));
    }
    
    if(arrEmoji.length == 0){
        buscarEmojis();
    }
}

function removerItems() {
    localStorage.removeItem('arrEmoji');
}

function pesquisaTodos(startingInd, tamLinha, tamPesquisa){
    qtdLinha = tamPesquisa / 20;
    for(let i = 0; i < qtdLinha; i++){
        let linha = (startingInd)+(i*tamLinha);
        if(linha < arrEmoji.length){
            listArr.innerHTML += `<li class='line' id='${linha}'></li><br>`;
            let line = document.getElementById(linha);
            console.log(linha)
            for (let index = linha; index < (linha+tamLinha); index++) {
                if(arrEmoji[index]){
                    let codePoints = '';
                    let splitAr = arrEmoji[index].codePoint.split(' ');
                    line.innerHTML += `<div class='small-emoji' id='${index}'> `;
                    splitAr.forEach(code =>{
                        codePoints += '&#x'+code;  
                    });
                    line.innerHTML += codePoints;
                    line.innerHTML += `</div>`
                }    
            }
        }
    }

    return false;
}

function limparTudo(){
    window.scrollTo(0, 0);
    listArr.innerHTML = '';
    refreshButton.style.display = 'block';
    deleteButton.style.display = 'none';
    searchId = 0;
    wrapper.style.paddingBottom = '20px';
}
deleteButton.addEventListener('click', limparTudo);

function refreshData(){
    pesquisaTodos(searchId, 20, 500);
    searchId += 500;
    deleteButton.style.display = 'block';   
    refreshButton.style.display = 'none';
    carregarDados();
    wrapper.style.paddingBottom = '300px';
}

refreshButton.addEventListener('click', refreshData);


console.log(arrEmoji);
// const unique = [...new Set(arrEmoji.map((item) => item.))]