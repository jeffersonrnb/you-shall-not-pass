var Character = function (attributes) {
    this.avatar = attributes.avatar;
    this.name = attributes.name;
    this.strength = attributes.strength;
    this.armor = attributes.armor;
    this.ability = attributes.ability;
    this.firepower = attributes.firepower;
    this.resistence = attributes.resistence;
    this.life = Math.max(attributes.resistence * 5, 1);
    this.status = '';
    this.avatarClass = attributes.avatarClass || 'Arch-mage';
}

Character.prototype.attack = function (enemyChar) {
    var totalDamage;
    totalDamage = (this.strength * Math.ceil(Math.random() * 6)) - (enemyChar.armor * Math.ceil(Math.random() * 6));
    if (totalDamage > 0) {
        enemyChar.life = Math.max((enemyChar.life - totalDamage), 0);
    }
}
