var metaName = '<meta name="author" content="@Anna-portfolio">';
$('head').prepend(metaName);

$('title').text('Drag and Drop Game');

$('body').addClass('user-select-none').css('overflow-x', 'hidden');

var containerMain = '<div id="container-main"/>';
$(containerMain).appendTo('body').addClass('row gx-5 m-2');

var mainTitle = '<h1>Drag and drop game<h1/>';
$(mainTitle).appendTo('#container-main').addClass('fw-bold');

var mainDescr = "<h4>Drag the <span class='badge rounded-pill bg-secondary m-1'>English</span> expressions and drop them on their <span class='badge rounded-pill bg-info text-dark m-1'>French</span> equivalents. Good luck!<h4/>";
$(mainDescr).appendTo('#container-main');

var containerGame = '<div id="container-game"/>';
$(containerGame).appendTo('#container-main').addClass('d-flex flex-row mx-auto gx-5').css('height', '525px');

var containerEnglish = '<div id="container-English"/>';
$(containerEnglish).appendTo('#container-game').addClass('card text-dark bg-light border border-4 rounded shadow-sm p-3 m-4 fs-4').attr('style', 'min-width: 19rem');

var containerFrench= '<div id="container-French"/>';
$(containerFrench).appendTo('#container-game').addClass('card text-dark bg-light border border-4 rounded shadow-sm p-3 m-4 fs-4').attr('style', 'min-width: 19rem').css('z-index', '-1');

var containerGuessed = '<div id="container-guessed"/>';
$(containerGuessed).appendTo('#container-game').attr('style', 'width: 30rem');

var containerWinner = '<div id="container-winner"/>';
$(containerWinner).appendTo('#container-game').addClass('card text-dark bg-light border border-4 rounded shadow-sm p-5 h-40 w-50 text-center align-self-center fs-3 fw-bold d-none').css('position', 'absolute', 'z-index', '1').text('Congratulations! You have guessed everything!');

var span ='<span id="span"><span/>';
$(span).appendTo('#container-winner').addClass('m-3 w-30');

var button = '<button>Play again</button>';
$(button).appendTo('#span').addClass('btn btn-secondary btn-lg m-4 fs-4 fw-bold').click(function(){window.location.reload()});

let engArray = ['Hello!', 'How are you?', 'You are welcome', 'Thank you!', 'Excuse me!', 'Goodbye', 'Good morning'];

for(let i = 0; i < engArray.length; i++){
    let optionEng = document.createElement('p');
    $(optionEng).attr('class', 'eng').attr('id', i).addClass('badge rounded-pill bg-secondary m-3').text(engArray[i]).appendTo('#container-English');
}

let frArray = ['Salut !', 'Comment vas-tu ?', 'De rien', 'Merci !', 'Excusez-moi !', 'Au revoir', 'Bonjour'];

for(let j = 0; j < frArray.length; j++){
    let optionFr = document.createElement('p');
    $(optionFr).attr('class', 'fr').attr('id', j).addClass('badge rounded-pill bg-info text-dark m-3').text(frArray[j]).appendTo('#container-French');
}

$(function(){
    var engItems = $('#container-English p');
    while(engItems.length){
        $('#container-English').append(engItems.splice(Math.floor(Math.random() * engItems.length), 1)[0]);
    }
});

$('.eng').draggable({
    revert: true
});

var guessedArray = [];

$('.fr').droppable({
    drop: function(event, ui) {
        var frId = $(this).attr('id');
        var engId = ui.draggable.attr('id');

        if(frId === engId){
            guessedArray.push(engArray[engId]);
                if(guessedArray.length === engArray.length){
                    $('#container-winner').removeClass('d-none');
                }
            let wordGuessed = document.createElement('p');
            $(wordGuessed).text(engArray[engId] + ' — ' + frArray[frId]).addClass('alert alert-success fw-bold').fadeIn(500).appendTo('#container-guessed');
            $(this).removeClass('bg-info').addClass('bg-success').effect('puff', 300);
            ui.draggable.removeClass('bg-secondary').addClass('bg-success').effect('puff', 300).draggable('revert', 'false');
        }else{
            if(frId !== engId){
                $(this).removeClass('bg-info').addClass('bg-danger');
                ui.draggable.removeClass('bg-secondary').addClass('bg-danger');     
            }
        }$(this).removeClass('bg-danger', 300).addClass('bg-info');
        ui.draggable.removeClass('bg-danger', 300).addClass('bg-secondary'); 
    }
});