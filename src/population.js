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
    }


    crossover(genome1, genome2){
        
    }

}
