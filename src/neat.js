//GLOBAL VARIABLES
glob_innov = 1
innovations = []//array of historyconnections to store the innovations of this current generation

//species variables
excess_coefficient = 1; //how important each of these things are in defining a new specie
disjoint_coefficient = 1;
weight_coefficient = 0.4;
distance_threshold = 3;
N_cutoff = 20; //how big a genome has to be so that we normalise it's excess and disjoint coefficients; if smaller, noramlisation is dividing by 1.

not_improve_cutoff = 15; // if the max fitness of the species doesnt increase in this man generations, the networks will not be allowed to reproduce
//champion of each species with more than five networks was copied into next generation unchanged
weight_mut_rate = 0.8;
uniform_perturbance = 0.9; // if weights mutated, 90% chance they are uniformly perturbed. 10% they are assigned new random value
disable_inherited_disabled_gene = 0.75;
crossover_no_mut = 0.25;
interspecies_mate_rate = 0.001;
node_add_rate = 0.03;
connec_add_rate = 0.05;
large_pop_connec_rate = 0.3; // if populations are very big, then we can tolerate a larger number of prospective species and greater topological diversity.


//GA variables
population = 150;

//NEAT Variables
someInputsDisc = true; // Whether or not to start with some inputs disconnected 


//ACTIVATION FUNCTIONS
//range should be [-1, 1]

//hyperbolic tangent   
tanh = (x) => { return Math.tanh(x) };

// normalised and shifted modified sigmoidal transfer function <- steepedned sigmoid that allows more fine tuning at extreme activations
sigmoid = (x) => { return ((1 / (1 + (Math.E ** -(4.9) * x))) * 2) - 1 };

//step function
step = (x) => {
    if (x < 0) return -1;
    if (x > 0) return 1;
    if (x == 0) return 0;
};

function normalise(val, minVal, maxVal, newMin, newMax) {
    return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
};


//initialize the population
function init() {

}

//do one generation
function doGen() {

}


//first parent must have higher fitness than second parent
function crossover(parent1, parent2) {
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
    for (let i = 0; i < child.connections.length; i++) {
        if ((child.connections[i].in_node > (parent1.inputs + parent1.outputs))) {
            let exist = false;
            for (let j = 0; j < nodeNos.length; j++) {
                if (nodeNos[j] == child.connections[i].in_node) exist = true;
            }
            if (!exist) {
                //add to nodeNose
                nodeNos.push(child.connections[i].in_node)
            }
        }
    }
    for (let i = 0; i < nodeNos.length; i++) {
        child.nodes.push(new Node(nodeNos[i], 'h')); //add referenced hidden nodes to child
    }
    return child;
}
/**
 * returns the distance between genome 1 and 2, 1 being the BASE
 * @param {Genome} genome1 BASE GENOME
 * @param {Genome} genome2 GENOME TO GET DISTANCE FROM BASE OF
 */
function distance(genome1, genome2) {
    let excess_num = 0;
    let disjoint_num = 0;
    let average_w_difference = 0; //average weight difference of matching genes. 
    let weight_difs = [];
    let matching_inno_numbers = [];
    let base_largest = 0; // base's largest inno number

    for (let i = 0; i < genome1.connections.length; i++) {
        if (genome1.connections[i].innov_number > base_largest) {
            base_largest = genome1.connections[i].innov_number;
        }
    }

    for (let i = 0; i < genome1.connections.length; i++) {
        for (let j = 0; j < genome2.connections.length; j++) {
            //if this connection matches, find difference in matching, add that to weight_difs
            if (genome1.connections[i].innov_number == genome2.connections[j].innov_number) {
                weight_difs.push(Math.abs((genome1.connections[i].weight - genome2.connections[j].weight)));
                //console.log(Math.abs((genome1.connections[i].weight - genome2.connections[j].weight)));
                matching_inno_numbers.push(genome1.connections[i].innov_number);
            }
        }
    }
    let len = weight_difs.length;
    if (len !== 0) {
        average_w_difference = (weight_difs.reduce((a, b) => a + b, 0) / len);
    } else average_w_difference = 0;

    //excess are connections in genome 2 that have higher inno number than genome 1's max
    for (let i = 0; i < genome2.connections.length; i++) {
        if (genome2.connections[i].innov_number > base_largest) {
            excess_num += 1;
        }
    }

    //disjoint are connections that are not matching, but not excesss either (within bounds of base's max inno number)
    for (let i = 0; i < genome2.connections.length; i++) {
        if (genome2.connections[i].innov_number < base_largest && !matching_inno_numbers.includes(genome2.connections[i].innov_number)) {
            disjoint_num += 1;
        }
    }

    console.log(excess_num);
    console.log(disjoint_num);
    console.log(average_w_difference);
    //biggestSize stores the size of the largest genome of the two
    let biggestSize = ((genome1.connections.length < genome2.connections.length) ? genome2.connections.length : genome1.connections.length);
    let N;
    if (biggestSize < N_cutoff) N = 1;
    else N = biggestSize;

    //return distance
    return ((excess_coefficient * excess_num / N) + (disjoint_coefficient * disjoint_num / N) + (weight_coefficient * average_w_difference));
}