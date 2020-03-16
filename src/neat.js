//GLOBAL VARIABLES
glob_innov = 0

//specie variables
excess_coefficient = 1;
disjoint_coefficient = 1;

//GA variables
population = 100;

//NEAT Variables
someInputsDisc = true; // Whether or not to start with some inputs disconnected 


//ACTIVATION FUNCTIONS
//range should be [-1, 1]

//hyperbolic tangent   
tanh = (x) => { return Math.tanh(x) };

// normalised and shifted sigmoid  
sigmoid = (x) => { return ((1 / (1 + (Math.E ** -x))) * 2) - 1 };

//step function
step = (x) => {
    if (x < 0) return -1;
    if (x > 0) return 1;
    if (x == 0) return 0;
};

//initialize the population
function init(){

}

//do one generation
function doGen(){

}
