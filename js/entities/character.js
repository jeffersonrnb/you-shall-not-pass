var Character = function (attributes) {
    this.avatar = attributes.avatar;
    this.name = attributes.name;
    this.strength = attributes.strength;
    this.armor = attributes.armor;
    this.ability = attributes.ability;
    this.firepower = attributes.firepower;
    this.resistence = attributes.resistence;
    this.life = (attributes.resistence * 5) === 0 ? 1 : (attributes.resistence * 5);
    this.status = '';
}
