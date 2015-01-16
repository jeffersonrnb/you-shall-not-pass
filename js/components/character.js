var CharacterComponent = function(characterType, character) {
    this.characterType = document.querySelector('.' + characterType);
    this.character = character;
}

CharacterComponent.prototype.show = function() {

    var start = null,
        count = 1,
        step,
        avatarClass = this.character.avatarClass.toLowerCase();
    var element = this.characterType.querySelector('.avatar');

    this.step = function(timestamp) {
        if(start === undefined || timestamp > start + 150) {
            start = timestamp;
            if(count > 0) {
                element.src = 'img/characters/' + avatarClass + '/' + avatarClass +'-attack-' + count + '.png';
                count++;
            }
        }
        if (count > 3) {
            element.src = 'img/characters/' + avatarClass + '.png';
        } else {
            window.requestAnimationFrame(step);
        }
    }

    step = this.step;
    window.requestAnimationFrame(step);
}

CharacterComponent.prototype.getEnemy = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'js/enemies.json', false);
    request.send();
    enemies = JSON.parse(request.responseText).enemies;
    pos = Math.floor(Math.random() * (enemies.length));
    console.log(this);
    this.character = new Character(enemies[pos]);
    
}