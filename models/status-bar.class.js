class StatusBar extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        switch (true) {
            case (this.percentage == 100):
                return 5;
            case (this.percentage > 80):
                return 4;
            case (this.percentage > 60):
                return 3;
            case (this.percentage > 40):
                return 2;
            case (this.percentage > 20):
                return 1;
            default:
                return 0;
                
        }
    }
}