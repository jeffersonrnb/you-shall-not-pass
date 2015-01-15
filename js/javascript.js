window.addEventListener('load', function () {
    'use strict'

    var player, enemy;

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

    var atacar = function() {
        if (player.life > 0 && enemy.life > 0) {
            player.attack(enemy);
            (new CharacterComponent('player', player)).show();
            if(enemy.life > 0) {
                enemy.attack(player);
                (new CharacterComponent('enemy', enemy)).show();
            }
        }

        (new Sound({ fileType: 'wav', path: 'sound/staff', htmlElement: document.querySelector('.attack') })).play();
        (new CharacterAttributesComponent('player', player)).show();
        (new CharacterAttributesComponent('enemy', enemy)).show();

        var divCharacter;

        if (player.life <= 0) {
            divCharacter = document.querySelector('.enemy');
            divCharacter.style.backgroundColor = 'green';

            var sound = new Sound({ fileType: 'mp3', path: 'sound/defeat', htmlElement: document.querySelector('.character') });
            var soundComponent = new SoundComponent(sound);
            soundComponent.playByAudio(false);
        } else if (enemy.life <= 0) {
            divCharacter = document.querySelector('.player');
            divCharacter.style.backgroundColor = 'green';

            var sound = new Sound({ fileType: 'mp3', path: 'sound/victory', htmlElement: document.querySelector('.character') });
            var soundComponent = new SoundComponent(sound);
            soundComponent.playByAudio(false);
        }
    }

    var submitFormChar = function(event) {
        event.preventDefault();
        var countChar, limite = 20, name, strength, armor, ability, firepower, resistence, formResistence;

        countChar = limite;

        name = document.querySelector('#char_name').value;
        strength = parseInt(document.querySelector('#char_strength').value) > 5 ? 5 : Math.max(parseInt(document.querySelector('#char_strength').value), 0);
        armor = parseInt(document.querySelector('#char_armor').value) > 5 ? 5 : Math.max(parseInt(document.querySelector('#char_armor').value), 0);
        ability = parseInt(document.querySelector('#char_ability').value) > 5 ? 5 : Math.max(parseInt(document.querySelector('#char_ability').value), 0);
        firepower = parseInt(document.querySelector('#char_firepower').value) > 5 ? 5 : Math.max(parseInt(document.querySelector('#char_firepower').value), 0);
        formResistence = parseInt(document.querySelector('#char_resistence').value) > 5 ? 5 : Math.max(parseInt(document.querySelector('#char_resistence').value), 0);

        countChar = countChar - (strength + armor + ability + firepower);
        resistence = Math.max(formResistence, 0) > Math.max(countChar, 0) ? Math.max(countChar, 0) : Math.max(formResistence, 0);

        player = new Character({name: name, strength: strength, armor: armor, ability: ability, firepower: firepower, resistence: resistence, avatar: 'img/characters/arch-mage'});

        document.querySelector('#form_char1').remove();

        enemy = createCharacter('Personagem2');

        document.querySelector('.battle').style.display = 'block';

        (new CharacterAttributesComponent('player', player)).show();
        (new CharacterAttributesComponent('enemy', enemy)).show();

        var sound = new Sound({ fileType: 'mp3', path: 'sound/battle', htmlElement: document.querySelector('.sound') });
        var soundComponent = new SoundComponent(sound);
        soundComponent.playByAudio(true);
    }

    document.querySelector('.attack').addEventListener('click', atacar);
    document.querySelector('#form_char1').addEventListener('submit', submitFormChar);

});
