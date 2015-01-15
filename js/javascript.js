window.addEventListener('load', function () {
    'use strict'

    var player, enemy, playerComponent, playerAttributesComponent, enemyComponent, enemyAttributesComponent, soundComponent,
        battleSound = new Sound({ fileType: 'mp3', path: 'sound/battle', htmlElement: document.querySelector('.sound') }),
        battleEpicSound = new Sound({ fileType: 'mp3', path: 'sound/battle-epic', htmlElement: document.querySelector('.sound') }),
        victorySound = new Sound({ fileType: 'mp3', path: 'sound/victory', htmlElement: document.querySelector('.player') }),
        defeatSound = new Sound({ fileType: 'mp3', path: 'sound/defeat', htmlElement: document.querySelector('.player') }),
        staffSound = new Sound({ fileType: 'wav', path: 'sound/staff', htmlElement: document.querySelector('.attack') });


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
        if (player.isAlive() && enemy.isAlive()) {
            player.attack(enemy);
            playerComponent.show();
            playerAttributesComponent.show();
            if (enemy.life > 0) {
                enemy.attack(player);
                enemyAttributesComponent.show();
                enemyComponent.show();
            }

            staffSound.play();
            playerComponent.show();
            playerAttributesComponent.show();
            enemyComponent.show();
            enemyAttributesComponent.show();

            var divCharacter;

            if (!player.isAlive()) {
                soundComponent = new SoundComponent(defeatSound);
                soundComponent.playByAudio(false);
            } else if (!enemy.isAlive()) {
                soundComponent = new SoundComponent(victorySound);
                soundComponent.playByAudio(false);
                playerComponent.levelUp();

                window.setTimeout(function() {
                    soundComponent = new SoundComponent(battleEpicSound);
                    soundComponent.playByAudio(true);

                    document.querySelector('.level-up').remove();

                    enemy = createCharacter('Personagem3');
                    enemyAttributesComponent = new CharacterAttributesComponent('enemy', enemy);
                    enemyAttributesComponent.show();
                }, 5000);
            }
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

        playerComponent = new CharacterComponent('player', player);
        enemyComponent = new CharacterComponent('enemy', enemy);

        playerAttributesComponent = new CharacterAttributesComponent('player', player);
        enemyAttributesComponent = new CharacterAttributesComponent('enemy', enemy);

        playerAttributesComponent.show();
        enemyAttributesComponent.show();

        soundComponent = new SoundComponent(battleEpicSound);
        soundComponent.playByAudio(true);
    }

    document.querySelector('.attack').addEventListener('click', atacar);
    document.querySelector('#form_char1').addEventListener('submit', submitFormChar);

});
