class Population {
    constructor(genomes) {
        if (genomes instanceof Array) {
            for (let i = 0; i < genomes.length; i++) {
                let wrong = false;
                if (!genomes[i] instanceof Genome) { //check that all genomes are valid instances of the genome class
                    wrong = true;
                } if (wrong) {
                    this.genomes = [];
                    console.error("error in population instantiation: one of the genomes in the array isnt a valid instance of the genome class")
                } else this.genomes = genomes
            }
        }
        else {
            this.genomes = []
            console.error("error in population instantiation: genomes not instance of array");
        }
        this.species = []
    }

    /**speciates the entire population's genomes and stores them in the population's species */
    speciate() {
        this.species = []; //reset species
        //if species is empty, add first dude to new species
        this.species.push(new Species(this.genomes[0]))

        //check if distance from any species is less than the threshold for every other
        for (let i = 1; i < this.genomes.length; i++) {
            let found = false;
            for (let j = 0; j < this.species.length; j++) {
                if (this.species[j].isComp(this.genomes[i])) {
                    found = true;
                    this.species[j].genomes.push(this.genomes[i]);
                }
            }
            //if we didnt find a species for little jimmy
            if (!found) {
                //make new species for jimmy, and make him the representative
                this.species.push(new Species(this.genomes[i]))
            }
        }

        console.log(this.species);
    }

    //makes next generation's population based on fitness
    makeNext() {
        //TODO

        //FITNESS SHARING Offspring = (AverageSpeciesFitness / Total_of_AverageSpeciesFitnesss) * PopulationSize
        let newPop = []
        let mutaters = []; //genomes to be mutated but not crossed over
        let parents = []; //genomes to be crossed over and then mutated

        this.speciate();
        this.interspecies = []; //genomes that have been selected to mate with other species. they will be inserted into a random species' mating pool

        let tot_avg_fitness = 0;
        for (let i = 0; i < this.species.length; i++) {
            tot_avg_fitness += this.species.averageFitness();
        }

        for (let i = 0; i < this.species.length; i++) {
            let offspring = Math.floor((this.species[i].averageFitness / tot_avg_fitness) * population); //how many offspring this species is allowed. 
            let matingPool = [];//pool of parents to mate from (25% wont be mated but purly mutated and put into the next generation)

            //use fitness proportionate selection to select 20% of the species to be put into the mating pool. 
            


        }


        for (let i = 0; i < this.genomes.length; i++) {
            if (Math.random() < no_cross) {
                mutaters.push(this.genomes[i]);
            } else {
                parents.push(this.genomes[i]);
            }//assigns the genomes to either the mating pool or the mutation pool
        }





    }
}
