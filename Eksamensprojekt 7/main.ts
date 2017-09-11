class Beer {
    label: string;
    volume: number;
    percentage: number;

    constructor(label: string, volume: number, percentage: number) {
        this.label = label;
        this.volume = volume;
        this.percentage = percentage;
    }

    toString() {
        return this.label + ", " + this.volume + " cl, percentage: " + this.percentage;
    }
    getVolume() {
        return this.volume;
    }
    getPercentage() {
        return this.percentage;
    }
}

class Driver {
    static exam() {

        let b1 = new Beer("Tuborg", 33, 4.6)
        let b2 = new Beer("Carlsberg", 33, 5)
        let b3 = new Beer("Heineken", 50, 20)
        let b4 = new Beer("Duff", 75, 4.0)
        let b5 = new Beer("Vestfyen", 33, 10)
        let s = new Student("Lasse");

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

    }
}
class Student {
    private name: string
    private beers: Beer[];
    private largebeers: Beer[];

    constructor(name: string) {
        this.name = name;
        this.beers = [];
        this.largebeers = [];

    }
    AddBeers(b: Beer) {
        this.beers.push(b);
    }
    AddLargebeers(b: Beer) {
        this.largebeers.push(b);
    }
    PrintLargeBeers() {
        let threshold = 40;
        for (let i = 0; i < this.beers.length; i++) {
            let beer = this.beers[i];
            if (beer.getVolume() > threshold) {
                this.AddLargebeers(beer)
                console.log(beer.toString());

            }
        }
    }
    PrintStrongestBeers() {
        let result = this.beers[0];
        let bestSoFar = result.getPercentage();
        for (let i = 0; i < this.beers.length; i++) {
            let beer = this.beers[i];
            if (beer.getPercentage() > bestSoFar) {
                result = this.beers[i];
                bestSoFar = beer.getPercentage()
            }
        }
        return console.log(result.toString());

    }
    PrintBeerBelly(){
        this.beers.sort((a,b) => a.percentage > b.percentage ? -1 : 1);
        for(let i = 0; i < this.beers.length; i++){
            let beer = this.beers[i];
            console.log(beer.toString());
            
        }

    }
}
Driver.exam();