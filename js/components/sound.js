var SoundComponent = function(sound) {
    this.sound = sound;
}

SoundComponent.prototype.playByAudio = function(hasLoop) {
    var audioElement = document.querySelector('audio');

    if (hasLoop) {
        audioElement.loop = 'loop';
    } else {
        audioElement.loop = '';
    }

    if (!audioElement.paused) {
        audioElement.pause();
    }

    audioElement.querySelector('source').src = this.sound.path + '.' + this.sound.fileType;
    audioElement.querySelector('source').type = 'audio/' + this.sound.fileType;
    audioElement.load();
    audioElement.play();
}
