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

    //first parent must have higher fitness than second parent
    crossover(parent1, parent2) {
        //iterate over every gene, if there is a matching gene between genome 1 and 2, then we chose one at random
        //if that gene is disjoint (in one but not the other) we select it from the more fit parent
        //if gene is excess, we select from more fit parent
        let child = new Genome(parent1.inputs, parent1.ouputs, true);//cons of child
        //find biggest innov_number
        let big = 0;
        for (let i = 0; i < parent1.connections.length; i++) {
            if (parent1.connections[i].innov_number > big) {
                big = parent1.connections[i].innov_number;
            }
        }
        for (let i = 0; i < parent2.connections.length; i++) {
            if (parent2.connections[i].innov_number > big) {
                big = parent2.connections[i].innov_number;
            }
        }

        //make array filled with zeros from 1 to big for each parent
        let p1Genes = new Array(big).fill(0);

        for (let i = 1; i <= p1Genes.length; i++) {
            for (let j = 0; j < parent1.connections.length; j++) {
                if (parent1.connections[j].innov_number == i) { p1Genes[i-1] = parent1.connections[j]; }
            }
        }
        let p2Genes = new Array(big).fill(0);
        for (let i = 1; i <= p2Genes.length; i++) {
            for (let j = 0; j < parent2.connections.length; j++) {
                if (parent2.connections[j].innov_number == i) { p2Genes[i-1] = parent2.connections[j]; }
            }
        }


        console.log(p1Genes, p2Genes);
    }
}
