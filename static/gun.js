class Gun {
    constructor(fire) {
        this.pHardness = 0;
        this.pDamage = 0;
        this.pAccurate = 0;
        this.pSpeed = 0;
        this.pFireRate = 0;
        this.point = 0;

        this.cooldown = 0;
        this.aim = 0;
        this.tarAim = 0;
        this.aimR = true;
        this.onFire = false;
        this.fire = fire;
        this.upGrade();
    }
    upGrade() {
        this.fireRate = 10 + this.pFireRate * 1.4;
        this.bulletSpeed = Math.max(8 + this.pDamage - Math.sqrt(this.pHardness * 2), 1);
        this.hardness = 70 + this.pHardness * 20;
        this.speed = 2 + Math.sqrt(this.pSpeed) * 0.7;
        this.recoil = (1 + this.pDamage * 0.6) / (1 + this.pAccurate * 1.1) * 0.03;
        this.delTime = 400 + this.pAccurate * 30 + this.pHardness * 8;

    }
    equip() {
        this.cooldown = Math.max(this.cooldown, 1400);
    }
    update() {
        if (this.cooldown > 0) this.cooldown -= this.fireRate;
        if (this.cooldown < 0) this.cooldown = 0;
        if (this.onFire && this.cooldown <= 0) {
            this.fire();
            this.cooldown = 1000 + this.pHardness * 30;

            if (Math.random() < 0.05) this.aimR = !this.aimR;
            this.tarAim += Math.random() * this.recoil * (this.aimR ? 1 : -1);
            if (this.tarAim < -Math.PI * 0.14) this.tarAim = -Math.PI * 0.14;
            if (this.tarAim > Math.PI * 0.14) this.tarAim = Math.PI * 0.14;
            //console.log("PEW"+this.aim);
        }
        var reAim = 0.001;
        if (Math.abs(this.tarAim) > Math.PI * 0.1) reAim += Math.abs(this.tarAim / 40);
        if (this.tarAim > 0) {
            if (this.tarAim <= reAim) this.tarAim = 0;
            this.tarAim -= reAim;
        }
        if (this.tarAim < 0) {
            if (this.tarAim >= -reAim) this.tarAim = 0;
            this.tarAim += reAim;
        }
        this.aim += (this.tarAim - this.aim) / 10;
        if (!this.onFire) {
            this.tarAim /= 1.12;
            this.aim = this.tarAim;
        }
    }
}