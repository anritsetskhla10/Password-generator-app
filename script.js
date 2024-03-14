
// slider

const slider = document.querySelector('.range');
const rangeActive = document.querySelector('.range-active');
const currentRange = document.querySelector('.current-range')

slider.addEventListener('input', () => {
  const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  rangeActive.style.width = `${percent}%`;
  
  currentRange.textContent = slider.value ;
});


// strength


const checkboxes = document.querySelectorAll('.check');


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateStrength);
});

function updateStrength() {
    const checkedCheckboxes = document.querySelectorAll('.check:checked');
    const strengthText = document.querySelector('.strength-text');
    const first = document.querySelector('.first');
    const second = document.querySelector('.second');
    const third = document.querySelector('.third');
    const fourth = document.querySelector('.fourth');


    const strengths = ['','TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG'];
    const colors = ['','#f64a4a', '#fb7c58', '#f8cd65', '#a4ffaf'];

    const containers = [first, second, third, fourth];

    let strengthIndex = Math.min(checkedCheckboxes.length, 4);
    let strength = strengths[strengthIndex];
    let borderStyle = 'solid 2px #e6e5ea';

    containers.forEach((container, index) => {
        container.style.backgroundColor = index < strengthIndex ? colors[strengthIndex] : '';
        container.style.border = index < strengthIndex ? 'none' : borderStyle;
    });


    strengthText.textContent = strength;
}

// password generator


// uppercase  

function createUpperCase(passLength){

    let upperCaseWords = []

    for(let i = 0; i < passLength; i++){
        let randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        upperCaseWords.push(randomChar.toUpperCase());
        }

        return upperCaseWords;
}

//lowercase

function createLowerCase(passLength){
    let lowerCaseWords = []

    for(let i = 0; i < passLength; i++){
        let randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        lowerCaseWords.push(randomChar.toLowerCase());
        }

        return lowerCaseWords
}


  
function validateNumbers(passLength){                              
  
  
    let numbers = [0,1,2,3,4,5,6,7,8,9];
    let passwordNums = [];
  
    for(let i = 0; i < passLength; i++){
  
    let randomIndex = Math.floor(Math.random() * numbers.length);
  
    passwordNums.push(numbers[randomIndex]);
    }
  
    return passwordNums;
}



  function validateSpecialChar(passLength){                       
  
  const specialSymbols =  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']', ':', ';', '<', '>', ',', '.', '?', '~', '\\', '-'];
  
  let symbols = [];
  
  for(let i = 0; i < passLength; i++){
  let randomIndex = Math.floor(Math.random() * specialSymbols.length);
  symbols.push(specialSymbols[randomIndex]);
  
  }
  
  return symbols;
  }
  


const generateBtn = document.getElementById('generate');
const passwordText = document.querySelector('.password-text');

generateBtn.addEventListener("click", createPassword);


function createPassword() {
    
    const passLength = slider.value  


    if (isNaN(passLength) || passLength <= 0) {
        return  "Invalid password length.";
    }

    let specialChars = validateSpecialChar(passLength);
    let numberChars = validateNumbers(passLength);
    let uppercaseWords = createUpperCase(passLength);
    let lowerCaseWords = createLowerCase(passLength);

    let allChars = [];

    const checkedCheckboxes = document.querySelectorAll('.check:checked');

checkedCheckboxes.forEach(checkbox => {
    if (checkbox.classList.contains('uppercase')) {
        allChars = allChars.concat(uppercaseWords);
    } else if (checkbox.classList.contains('lowercase')) {
        allChars = allChars.concat(lowerCaseWords);
    } else if (checkbox.classList.contains('numbers')) {
        allChars = allChars.concat(numberChars);
    } else if (checkbox.classList.contains('symbols')) {
        allChars = allChars.concat(specialChars);
       
    }
});

    if (allChars.length === 0) {
        return "No character set selected.";
    }

    let password = '';
    for (let i = 0; i < passLength; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    passwordText.textContent = password;

    if(activeCopy){
        deleteCopy();
    }else{
        activeCopy;
    }
}



// copy


const copy = document.getElementById('copy');
const copied = document.querySelector('.copied');

copy.addEventListener('click', activeCopy);

function activeCopy() {
    if (copied.classList.contains('copied')) {
        copied.classList.add('copied-active');
        copied.classList.remove('copied');
    }
}


function deleteCopy(){
    if (copied.classList.contains('copied-active')) {
        copied.classList.add('copied');
        copied.classList.remove('copied-active');
    }
}


copy.addEventListener('click', function() {

    const range = document.createRange();
    range.selectNode(passwordText);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    selection.removeAllRanges();

    copied.classList.add('copied-active');

});










