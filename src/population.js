class Population {
    constructor(genomes) {
        if (genomes instanceof Array) {
            for (let i = 0; i < genomes.length; i++) {
                let wrong = false;
                if (!genomes[i] instanceof Genome) { //check that all genomes are valid instances of the genome class
                    wrong = true;
                }
            }
            if (wrong) {
                this.genomes = [];
                console.error("error in population instantiation: one of the genomes in the array isnt a valid instance of the genome class")
            }
            else this.genomes = genomes
        }
        else {
            this.genomes = []
            console.error("error in population instantiation: genomes not instance of array");
        }
        this.species = []
    }

    /**speciates the entire population's genomes and stores them in the population's species */
    speciate() {
        //if species is empty, add first dude to new species
        if (this.species.length == 0 && this.genomes.length !== 0) {
            this.species.push(new Species(this.genomes[0]))
        }
        //if it isnt, check if distance from any species is less than the threshold
    }
}
