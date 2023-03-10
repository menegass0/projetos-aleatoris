let showArea = document.querySelector('.show-area');
let listArr = document.querySelector('.list');

let arrEmoji = [];
let arrEmojiTemp = [];
let searchId = null;

// removerItems();
verificarDadosExistentes();

searchId = 0;
loopTeste();

console.log('foi1');
pesquisaTodos(searchId, 20);
searchId += 20;
async function loopTeste(){

    setTimeout(() => {
        pesquisaTodos(searchId, 20);
        console.log(searchId);
        searchId += 20;

        if(searchId < arrEmoji.length){
            loopTeste();
        }
        
    }, 1000);
}


function montarArray(item, indice) {
    arrEmojiTemp[indice] = item;
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
    console.log(localStorage.getItem('arrEmoji') ? true : false);
    

    if(localStorage.getItem('arrEmoji')){
        arrEmoji = JSON.parse(localStorage.getItem('arrEmoji'));
        console.log('nao era pra entra aqui');
    }
    
    if(arrEmoji.length == 0){
        console.log('funçao verificar dados existentes');
        buscarEmojis();
    }
}

function removerItems() {
    localStorage.removeItem('arrEmoji');
}

function pesquisaTodos(startingInd, tamLinha){
    console.log(startingInd);
    listArr.innerHTML += `<li class='line' id='${startingInd}'></li><br>`;
    let line = document.getElementById(startingInd);
    for (let index = startingInd; index < (startingInd+tamLinha); index++) {
        if(arrEmoji[index]){
            let splitAr = arrEmoji[index].codePoint.split(' ');
            line.innerHTML += `<div class='small-emoji' id='${index}'> `;
            splitAr.forEach(code =>{
                line.innerHTML += `
                    &#x${code};
                `
            });
            line.innerHTML += `</div>`
        }    
    }
    return false;
}


// function gerarViewEmoji(indice){
//     let contador = 0;
//     let splitAr = null;
//     let tdTable = document.getElementById('grupo-emoji');
//     let trTable = '';
//     let codePoint = '';

//     while(contador < 5){
//         trTable = '<tr>';
//         splitAr = arrEmoji[indice+contador].codePoint.split(' ');
//         splitAr.forEach(code => {
//             codePoint += `
//                 &#x${code}
//             `
//         });
        
//         trTable += gerarTd(codePoint);

//         trTable += '</tr>';
       
//         contador++;
//     }
    
//     tdTable.innerHTML =  tdTable.innerHTML+trTable;

//     setTimeout(function(){
        
//     },1000);

// }

// function gerarTd(data){
//     return '<td>'+data+'</td>';
// }

