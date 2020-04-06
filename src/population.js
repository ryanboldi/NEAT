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
        let child = new Genome(parent1.inputs, parent1.outputs, true); //empty child
        console.log(child);
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
                if (parent1.connections[j].innov_number == i) { p1Genes[i - 1] = parent1.connections[j]; }
            }
        }
        let p2Genes = new Array(big).fill(0);
        for (let i = 1; i <= p2Genes.length; i++) {
            for (let j = 0; j < parent2.connections.length; j++) {
                if (parent2.connections[j].innov_number == i) { p2Genes[i - 1] = parent2.connections[j]; }
            }
        }
        console.log(p1Genes, p2Genes);

        //go through fitter parent's genes, if there is no matching gene for p2, just assign the child p1's gene
        // if p2 has a matching gene, then 50% chance to select it
        //p1 has higher fitness
        for (let i = 0; i < p1Genes.length; i++) {
            if (p1Genes[i] !== 0 && p2Genes[i] !== 0) {
                ///matching gene exists, chose random gene and append to child. 
                if (Math.random() > 0.5) {
                    child.connections.push(p1Genes[i])
                } else {
                    child.connections.push(p2Genes[i])
                }
            }
            else if (p1Genes[i] !== 0 && p2Genes[i] == 0) {
                //p1 has gene that p2 doesnt,
                //add it to child
                child.connections.push(p1Genes[i])
            }
            else if (p1Genes[i] == 0 && p2Genes[i] !== 0) {
                //p2 has gene that p1 doesn't 
                //do nothing
            }
            else {
                //both parents don't have gene
                //do nothing
            }
        }

        //add all the hidden nodes that are referenced. 
        let nodeNos = [] //store the number all hidden nodes that have been referenced by this genome so we can add them
        //i,b,o nodes are from index 0 to p1.inputs + p1.outputs
        //only add to nodeNos if node's num is bigger than p1.inputs + p1.outputs
        for (let i = 0; i < child.connections.length; i++){
            if ((child.connections[i].in_node > (parent1.inputs + parent1.outputs))){
                let exist = false;
                for (let j = 0; j < nodeNos.length; j++){
                    if (nodeNos[j] == child.connections[i].in_node) exist = true;
                }
                if (!exist){
                    //add to nodeNose
                    nodeNos.push(child.connections[i].in_node)
                }
            }
        }
        for (let i = 0; i < nodeNos.length; i++){
            child.nodes.push(new Node(nodeNos[i], 'h')); //add referenced hidden nodes to child
        }
        return child;
    }
}
