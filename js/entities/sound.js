var Sound = function (attributes) {
    this.fileType = attributes.fileType;
    this.path = attributes.path;
    this.htmlElement = attributes.htmlElement;
}

Sound.prototype.play = function () {
    var path = this.path + '.' + this.fileType,
        element = this.htmlElement;

    if (element.mp3) {
        if(element.mp3.paused) element.mp3.play();
        else element.mp3.pause();
    } else {
        element.mp3 = new Audio(path);
        element.mp3.play();
    }
}
