"use strict";
var Beer = /** @class */ (function () {
    function Beer(label, volume, percentage) {
        this.label = label;
        this.volume = volume;
        this.percentage = percentage;
    }
    Beer.prototype.toString = function () {
        return this.label + ", " + this.volume + " cl, percentage: " + this.percentage;
    };
    Beer.prototype.getVolume = function () {
        return this.volume;
    };
    Beer.prototype.getPercentage = function () {
        return this.percentage;
    };
    return Beer;
}());
var Driver = /** @class */ (function () {
    function Driver() {
    }
    Driver.exam = function () {
        var b1 = new Beer("Tuborg", 33, 4.6);
        var b2 = new Beer("Carlsberg", 33, 5);
        var b3 = new Beer("Heineken", 50, 20);
        var b4 = new Beer("Duff", 75, 4.0);
        var b5 = new Beer("Vestfyen", 33, 10);
        var s = new Student("Lasse");
        s.AddBeers(b1);
        s.AddBeers(b2);
        s.AddBeers(b3);
        s.AddBeers(b4);
        s.AddBeers(b5);
        s.PrintLargeBeers();
        console.log("Strongest beer");
        s.PrintStrongestBeers();
        console.log("Sorted list");
        s.PrintBeerBelly();
    };
    return Driver;
}());
var Student = /** @class */ (function () {
    function Student(name) {
        this.name = name;
        this.beers = [];
        this.largebeers = [];
    }
    Student.prototype.AddBeers = function (b) {
        this.beers.push(b);
    };
    Student.prototype.AddLargebeers = function (b) {
        this.largebeers.push(b);
    };
    Student.prototype.PrintLargeBeers = function () {
        var threshold = 40;
        for (var i = 0; i < this.beers.length; i++) {
            var beer = this.beers[i];
            if (beer.getVolume() > threshold) {
                this.AddLargebeers(beer);
                console.log(beer.toString());
            }
        }
    };
    Student.prototype.PrintStrongestBeers = function () {
        var result = this.beers[0];
        var bestSoFar = result.getPercentage();
        for (var i = 0; i < this.beers.length; i++) {
            var beer = this.beers[i];
            if (beer.getPercentage() > bestSoFar) {
                result = this.beers[i];
                bestSoFar = beer.getPercentage();
            }
        }
        return console.log(result.toString());
    };
    Student.prototype.PrintBeerBelly = function () {
        this.beers.sort(function (a, b) { return a.percentage < b.percentage ? -1 : 1; });
        for (var i = 0; i < this.beers.length; i++) {
            var beer = this.beers[i];
            console.log(beer.toString());
        }
    };
    return Student;
}());
Driver.exam();
