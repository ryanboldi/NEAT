//GLOBAL VARIABLES
glob_innov = 0

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

