var CharacterAttributesComponent = function(characterType, character) {
    this.characterType = document.querySelector('.' + characterType);
    this.character = character;
}

CharacterAttributesComponent.prototype.show = function () {
    var divCharacter = this.characterType,
        character = this.character;

    if (divCharacter.innerText !== '') {
        divCharacter.querySelector('.strength').innerText = 'Strength: ' + character.strength;
        divCharacter.querySelector('.armor').innerText = 'Armor: ' + character.armor;
        divCharacter.querySelector('.ability').innerText = 'Ability: ' + character.ability;
        divCharacter.querySelector('.firepower').innerText = 'Firepower: ' + character.firepower;
        divCharacter.querySelector('.resistence').innerText = 'Resistence: ' + character.resistence;
        divCharacter.querySelector('.life').innerText = 'Life: ' + character.life;
    } else {
        var request = new XMLHttpRequest();
        request.open('GET', 'templateChar.html', true);
        request.addEventListener('load', function () {
            var template = request.responseText.replace('{{AVATAR}}', character.avatar).replace('{{NAME}}',
            character.name).replace('{{STRENGTH}}', character.strength).replace('{{ARMOR}}',
            character.armor).replace('{{ABILITY}}', character.ability).replace('{{FIREPOWER}}',
            character.firepower).replace('{{RESISTENCE}}', character.resistence).replace('{{LIFE}}', character.life);

            divCharacter.innerHTML += template;
        });

        request.send();
    }
}
