window.interval = null;

window.addEventListener('load', function () {
    'use strict'
    
    var char1, char2;

    var Character = function (attributes) {
        this.avatar = attributes.avatar;
        this.name = attributes.name;
        this.strength = attributes.strength;
        this.armor = attributes.armor;
        this.resistence = attributes.resistence;
        this.life = (attributes.resistence * 5) === 0 ? 1 : (attributes.resistence * 5);
        this.status = '';
    }
    
    var simulador = function (f1, a2) {
        if (f1 > a2) {
            return 'First';
        } else {
            return 'Second';
        }
    };
    
    var printChar = function(char) {
        var body = document.querySelector('body');

        var request = new XMLHttpRequest();
        request.open('GET', 'templateChar.html', true);
        request.addEventListener('load', function () {
            var template = request.responseText.replace('{{AVATAR}}', char1.avatar).replace('{{NAME}}', char1.name).replace('{{STRENGTH}}', char1.strength).replace('{{ARMOR}}', char1.armor).replace('{{RESISTENCE}}', char1.resistence).replace('{{LIFE}}', char1.life);
        
            body.innerHTML += template;
            document.querySelector('.button').addEventListener('click', atacar);
        });
        
        request.send();
        
        /*var divCharacter = document.createElement('div');
        divCharacter.classList.add('character');
        body.appendChild(divCharacter);

        node = document.createElement('div');
        node.classList.add('name');
        name = document.createTextNode('Nome: ' + char.name);
        divCharacter.appendChild(node);
        node.appendChild(name);

        node = document.createElement('div');
        node.classList.add('strength');
        strength = document.createTextNode('Strength: ' + char.strength);
        divCharacter.appendChild(node);
        node.appendChild(strength);

        node = document.createElement('div');
        node.classList.add('armor');
        armor = document.createTextNode('Armor: ' + char.armor);
        divCharacter.appendChild(node);
        node.appendChild(armor);

        node = document.createElement('div');
        node.classList.add('resistence');
        resistence = document.createTextNode('Resistence: ' + char.resistence);
        divCharacter.appendChild(node);
        node.appendChild(resistence);

        node = document.createElement('div');
        node.classList.add('life');
        life = document.createTextNode('Life: ' + char.life);
        divCharacter.appendChild(node);
        node.appendChild(life);*/
    }

    var createCharacter = function (nome) {
        var char = generateChar(nome);
        return char;
    }

    var generateChar = function (name) {
        var countChar, limite = 10, strength, armor, resistence;

        countChar = limite;

        strength = Math.ceil(Math.random() * 5);
        armor = Math.ceil(Math.random() * 5);
        countChar = countChar - (strength + armor);
        resistence = Math.max(countChar, 0) <= 5 ?  Math.max(countChar, 0) : 5;

        var char = new Character({name: name, strength: strength, armor: armor, resistence: resistence, avatar: 'arch-mage'});

        char.life = (char.resistence * 5) === 0 ? 1 : (char.resistence * 5);

        return char;
    };

    var simulador2 = function (name1, name2) {
        var chars, totalDamage, i = 0, char1, char2;

        char1 = generateChar(name1);
        char2 = generateChar(name2);

        chars = [char1, char2];

        while (chars[0].life > 0 && chars[1].life > 0) {

            if (i % 2 === 0) {
                totalDamage = (char1.strength * Math.ceil(Math.random() * 6)) - (char2.armor * Math.ceil(Math.random() * 6));
                if (totalDamage > 0) {
                    chars[1].life = chars[1].life - totalDamage;
                }
            } else {
                totalDamage = (char2.strength * Math.ceil(Math.random() * 6)) - (char1.armor * Math.ceil(Math.random() * 6));
                if (totalDamage > 0) {
                    chars[0].life = chars[0].life - totalDamage;
                }
            }

            i += 1;
        }

        if (chars[1].life <= 0) {
            chars[0].status = 'Winner';
        } else {
            chars[1].status = 'Winner';
        }

        return chars[0].status === 'Winner' ? chars[0] : chars[1];
    };


    var atacar = function() {
        var totalDamage;
        var avatars = document.querySelectorAll('.avatar');
        avatars.item(0).classList.add('normal');
        if (char1.life > 0 && char2.life > 0) {
            totalDamage = (char1.strength * Math.ceil(Math.random() * 6)) - (char2.armor * Math.ceil(Math.random() * 6));
            if (totalDamage > 0) {
                interval = setInterval(function(){ 
                    if (avatars.item(0).classList.contains('normal')) {
                        avatars.item(0).classList.add('atk-1');
                        avatars.item(0).classList.remove('normal');
                        avatars[0].src = 'arch-mage-attack-staff-1.png';
                    } else if (avatars.item(0).classList.contains('atk-1')) {
                        avatars.item(0).classList.remove('atk-1');
                        avatars.item(0).classList.add('atk-2');
                        avatars[0].src = 'arch-mage-attack-staff-2.png';
                    } else {
                        avatars[0].src = 'arch-mage.png';
                        interval = null;
                    }}, 150);
                char2.life = char2.life - totalDamage;
            }
            if(char2.life > 0) {
                totalDamage = (char2.strength * Math.ceil(Math.random() * 6)) - (char1.armor * Math.ceil(Math.random() * 6));
                if (totalDamage > 0) {
                    var i; 
                    i = setInterval(function(){ avatars[1].src = 'arch-mage-attack-staff-1.png'; }, 1000);
                    i = setInterval(function(){ avatars[1].src = 'arch-mage-attack-staff-2.png'; }, 1000);
                    char1.life = char1.life - totalDamage;
                    i = setInterval(function(){ avatars[1].src = 'arch-mage.png'; }, 1000);
                    i = null;
                }
            }
        }

        var lifes = document.querySelectorAll('.life');
        lifes[0].innerHTML = 'Life: ' + char1.life;
        lifes[1].innerHTML = 'Life: ' + char2.life;

        var divCharacter;

        if (char1.life <= 0) {
            divCharacter = document.querySelectorAll('.character')[1];
            divCharacter.style.backgroundColor = 'green';
        } else if (char2.life <= 0) {
            divCharacter = document.querySelectorAll('.character')[0];
            divCharacter.style.backgroundColor = 'green';
        }
    }
    
    var submitFormChar = function(event) {
        event.preventDefault();
        var countChar, limite = 10, name, strength, armor, resistence;

        countChar = limite;
        
        name = document.querySelector('#char_name').value;
        strength = parseInt(document.querySelector('#char_strength').value) > 5 ? 5 : parseInt(document.querySelector('#char_strength').value);
        armor = parseInt(document.querySelector('#char_armor').value) > 5 ? 5 : parseInt(document.querySelector('#char_armor').value);
        countChar = countChar - (strength + armor);
        resistence = Math.max(countChar, 0) <= 5 ? Math.max(countChar, 0) : 5;

        char1 = new Character({name: name, strength: strength, armor: armor, resistence: resistence, avatar: 'arch-mage'});
        
        document.querySelector('#form_char1').remove();
        
        char2 = createCharacter('Personagem2');
        
        printChar(char1);
        printChar(char2);
    }
    
    document.querySelector('.button').addEventListener('click', atacar);
    document.querySelector('#form_char1').addEventListener('submit', submitFormChar);

});
