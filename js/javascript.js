window.interval = null;

window.addEventListener('load', function () {
    'use strict'

    var char1, char2;

    var simulador = function (f1, a2) {
        if (f1 > a2) {
            return 'First';
        } else {
            return 'Second';
        }
    };

    var printChar = function(character) {
        var battle = document.querySelector('.battle');

        var request = new XMLHttpRequest();
        request.open('GET', 'templateChar.html', true);
        request.addEventListener('load', function () {
            var template = request.responseText.replace('{{AVATAR}}', character.avatar).replace('{{NAME}}',
            character.name).replace('{{STRENGTH}}', character.strength).replace('{{ARMOR}}',
            character.armor).replace('{{ABILITY}}', character.ability).replace('{{FIREPOWER}}',
            character.firepower).replace('{{RESISTENCE}}', character.resistence).replace('{{LIFE}}', character.life);

            battle.innerHTML += template;
            document.querySelector('.button').addEventListener('click', atacar);
        });

        request.send();
    }

    var createCharacter = function (nome) {
        var char = generateChar(nome);
        return char;
    }

    var generateChar = function (name) {
        var countChar, limite = 20, strength, armor, ability, firepower, resistence;

        countChar = limite;

        strength = Math.ceil(Math.random() * 5);
        armor = Math.ceil(Math.random() * 5);
        ability = Math.ceil(Math.random() * 5);
        firepower = Math.ceil(Math.random() * 5);
        countChar = countChar - (strength + armor + ability + firepower);
        resistence = Math.max(countChar, 0) <= 5 ?  Math.max(countChar, 0) : 5;

        var char = new Character({name: name, strength: strength, armor: armor, ability: ability, firepower: firepower, resistence: resistence, avatar: 'img/characters/arch-mage'});

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
        avatars.item(1).classList.add('normal');
        if (char1.life > 0 && char2.life > 0) {
            totalDamage = (char1.strength * Math.ceil(Math.random() * 6)) - (char2.armor * Math.ceil(Math.random() * 6));
            if (totalDamage > 0) {
                interval = setInterval(function(){
                    if (avatars.item(0).classList.contains('normal')) {
                        avatars.item(0).classList.add('atk-1');
                        avatars.item(0).classList.remove('normal');
                        avatars[0].src = 'img/characters/arch-mage-attack-staff-1.png';
                    } else if (avatars.item(0).classList.contains('atk-1')) {
                        avatars.item(0).classList.remove('atk-1');
                        avatars.item(0).classList.add('atk-2');
                        avatars[0].src = 'img/characters/arch-mage-attack-staff-2.png';
                    } else {
                        avatars[0].src = 'img/characters/arch-mage.png';
                        interval = null;
                    }}, 150);
                char2.life = char2.life - totalDamage;
            }
            if(char2.life > 0) {
                totalDamage = (char2.strength * Math.ceil(Math.random() * 6)) - (char1.armor * Math.ceil(Math.random() * 6));
                if (totalDamage > 0) {
                    interval = setInterval(function(){
                    if (avatars.item(1).classList.contains('normal')) {
                        avatars.item(1).classList.add('atk-1');
                        avatars.item(1).classList.remove('normal');
                        avatars[1].src = 'img/characters/arch-mage-attack-staff-1.png';
                    } else if (avatars.item(1).classList.contains('atk-1')) {
                        avatars.item(1).classList.remove('atk-1');
                        avatars.item(1).classList.add('atk-2');
                        avatars[1].src = 'img/characters/arch-mage-attack-staff-2.png';
                    } else {
                        avatars[1].src = 'img/characters/arch-mage.png';
                        interval = null;
                    }}, 150);
                    char1.life = char1.life - totalDamage;
                }
            }
        }

        (new Sound({ fileType: 'wav', path: 'sound/staff', htmlElement: document.querySelector('.button') })).play();

        var lifes = document.querySelectorAll('.life');
        lifes[0].innerHTML = 'Life: ' + char1.life;
        lifes[1].innerHTML = 'Life: ' + char2.life;

        var divCharacter;

        if (char1.life <= 0) {
            divCharacter = document.querySelectorAll('.character')[1];
            divCharacter.style.backgroundColor = 'green';

            var sound = new Sound({ fileType: 'mp3', path: 'sound/defeat', htmlElement: document.querySelector('.character') });
            var soundComponent = new SoundComponent(sound);
            soundComponent.playByAudio(false);
        } else if (char2.life <= 0) {
            divCharacter = document.querySelectorAll('.character')[0];
            divCharacter.style.backgroundColor = 'green';

            var sound = new Sound({ fileType: 'mp3', path: 'sound/victory', htmlElement: document.querySelector('.character') });
            var soundComponent = new SoundComponent(sound);
            soundComponent.playByAudio(false);
        }
    }

    var submitFormChar = function(event) {
        event.preventDefault();
        var countChar, limite = 20, name, strength, armor, ability, firepower, resistence;

        countChar = limite;

        name = document.querySelector('#char_name').value;
        strength = parseInt(document.querySelector('#char_strength').value) > 5 ? 5 : parseInt(document.querySelector('#char_strength').value);
        armor = parseInt(document.querySelector('#char_armor').value) > 5 ? 5 : parseInt(document.querySelector('#char_armor').value);
        ability = parseInt(document.querySelector('#char_ability').value) > 5 ? 5 : parseInt(document.querySelector('#char_ability').value);
        firepower = parseInt(document.querySelector('#char_firepower').value) > 5 ? 5 : parseInt(document.querySelector('#char_firepower').value);

        countChar = countChar - (strength + armor + ability + firepower);
        resistence = Math.max(countChar, 0) <= 5 ? Math.max(countChar, 0) : 5;

        char1 = new Character({name: name, strength: strength, armor: armor, ability: ability, firepower: firepower, resistence: resistence, avatar: 'img/characters/arch-mage'});

        document.querySelector('#form_char1').remove();

        char2 = createCharacter('Personagem2');

        document.querySelector('.battle').style.display = 'block';

        printChar(char1);
        printChar(char2);

        var sound = new Sound({ fileType: 'mp3', path: 'sound/battle', htmlElement: document.querySelector('.sound') });
        var soundComponent = new SoundComponent(sound);
        soundComponent.playByAudio(true);
    }

    document.querySelector('.button').addEventListener('click', atacar);
    document.querySelector('#form_char1').addEventListener('submit', submitFormChar);

});
