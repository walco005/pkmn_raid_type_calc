var type1 = '';
var type2 = '';
var typeRefArr = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
var typeEffArr = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], //Normal
    [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], //Fire
    [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], //Water
    [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1], //Electric
    [0, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1], //Grass
    [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1], //Ice
    [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], //Fighting
    [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2], //Poison
    [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1], //Ground
    [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1], //Flying
    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1], //Psychic
    [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5], //Bug
    [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1], //Rock
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1], //Ghost
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0], //Dragon
    [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5], //Dark
    [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2], //Steel
    [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1] //Fairy
];

$(document).ready(function() {
    
    initializeTypeDivs();
    
    $('.typeButton').click(function() {
        
        if(!(type1 && type2)) {
            if($(this).hasClass("clicked")) {
               $(this).removeClass("clicked");
            } else {
                $(this).addClass("clicked");
            }
        }
        var clickedType = $(this).attr('id');
        if(type1 == clickedType) {
            type1 = '';
        } else if (type2 == clickedType) {
            type2 = '';
        } else if (type1 == '') {
            type1 = clickedType;
        } else if (type2 == '') {
            type2 = clickedType;
        }
        
//        var defArr = calcDualDef(type1, type2);
//        
//        var i;
//        if(type1 && type2) {
//            for(i = 0; i < defArr.length; i++) {
//                alert(defArr[i]);
//            }
//        }
        for (i = 0; i < typeRefArr.length; i++) {
            $('#' + typeRefArr[i] + 'Def').text(typeRefArr[i]);
            $('#' + typeRefArr[i] + 'Def').removeClass();
            $('#' + typeRefArr[i] + 'Att').text(typeRefArr[i]);
            $('#' + typeRefArr[i] + 'Att').removeClass();
        }
        if(type1 && type2) {
            populateTypeDef(calcDualDef(type1, type2));
            populateTypeAtt(calcDualAtt(type1, type2));
        } else if (type1) {
            populateTypeDef(calcSingleDef(type1));
            populateTypeAtt(calcSingleAtt(type1));
        } else if (type2) {
            populateTypeDef(calcSingleDef(type2));
            populateTypeAtt(calcSingleAtt(type2));
        }
    });
    
});

function initializeTypeDivs() {
    var i;
    for (i = 0; i < typeRefArr.length; i++) {
        $('#type1').append('<div id=\'' + typeRefArr[i] + 'Def\'>' + typeRefArr[i] + ' </div>');
    }
    for (i = 0; i < typeRefArr.length; i++) {
        $('#type2').append('<div id=\'' + typeRefArr[i] + 'Att\'>' + typeRefArr[i] + ' </div>');
    }
}

/*******************************
DEFENSE CALCULATION
THIS ALL CALCULATES WHAT IS EFFECTIVE AGAINST SELECTED TYPES & POPULATES STUFF
*******************************/
function calcSingleDef (t1) {
    var retArr = [];
    var index = typeRefArr.indexOf(t1);
    var i;
    for(i = 0; i < typeRefArr.length; i++) {
        retArr.push(typeEffArr[i][index]);
    }
    return retArr;
}
function calcDualDef (t1, t2) {
    var retArr = [];
    var index1 = typeRefArr.indexOf(t1);
    var index2 = typeRefArr.indexOf(t2);
    var i;
    for(i = 0; i < typeRefArr.length; i++) {
        retArr.push(typeEffArr[i][index1] * typeEffArr[i][index2]);
    }
    return retArr;
}
function populateTypeDef(defArr) {
    var i;
    for (i = 0; i < typeRefArr.length; i++) {
        $('#' + typeRefArr[i] + 'Def').append('  ' + defArr[i]);
        switch(defArr[i]) {
            case 4:
                $('#' + typeRefArr[i] + 'Def').addClass('fourTimes');
                break;
            case 2:
                $('#' + typeRefArr[i] + 'Def').addClass('twoTimes');
                break;
            case 1:
                $('#' + typeRefArr[i] + 'Def').addClass('oneTimes');
                break;
            case 0.5:
                $('#' + typeRefArr[i] + 'Def').addClass('halfTimes');
                break;
            case 0.25:
                $('#' + typeRefArr[i] + 'Def').addClass('quarterTimes');
                break;
            case 0:
                $('#' + typeRefArr[i] + 'Def').addClass('zeroTimes');
                break;
        }
    }
    return true;
}

/*******************************
ATTACK CALCULATION
THIS ALL CALCULATES WHAT THE SELECTED TYPE(S) ARE EFFECTIVE AGAINST & POPULATES STUFF
*******************************/

function calcSingleAtt (t1) {
    var retArr = [];
    var index = typeRefArr.indexOf(t1);
    var i;
    for(i = 0; i < typeRefArr.length; i++) {
        retArr.push(typeEffArr[i][index]);
    }
    return retArr;
}
function calcDualAtt (t1, t2) {
    var retArr = [];
    var index1 = typeRefArr.indexOf(t1);
    var index2 = typeRefArr.indexOf(t2);
    var i;
    for(i = 0; i < typeRefArr.length; i++) {
        retArr.push(typeEffArr[i][index1] * typeEffArr[i][index2]);
    }
    return retArr;
}
function populateTypeAtt(attArr) {
    var i;
    for (i = 0; i < typeRefArr.length; i++) {
        $('#' + typeRefArr[i] + 'Att').append('  ' + attArr[i]);
        switch(attArr[i]) {
            case 0.25:
                $('#' + typeRefArr[i] + 'Att').addClass('fourTimes');
                break;
            case 0.5:
                $('#' + typeRefArr[i] + 'Att').addClass('twoTimes');
                break;
            case 1:
                $('#' + typeRefArr[i] + 'Att').addClass('oneTimes');
                break;
            case 2:
                $('#' + typeRefArr[i] + 'Att').addClass('halfTimes');
                break;
            case 4:
                $('#' + typeRefArr[i] + 'Att').addClass('quarterTimes');
                break;
            case 0:
                $('#' + typeRefArr[i] + 'Att').addClass('zeroTimes');
                break;
        }
    }
    return true;
}





