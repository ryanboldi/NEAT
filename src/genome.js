class Genome{
    constructor(inputs, outputs){
        this.nodes = [] //array of nodes
        this.connections = [] // array of connections between those nodes
    }


    //mutates the genome by adding a random connection
    //a single new connection gene with a ranom weight is added connectng two previously unconnected nodes
    mut_add_connection(){

    }

    //mutates the genome by adding a new node
    //an existing connection is split and the new node placed where the old connection used to be
    //old connection is disabled an two new connections are added to the genome. 
    //new conneciton leadig into the new node recieves a weight of 1. 
    // new connection leading out recieves the same weight as the old connection
    //this minimizes the affect of the node addition mutation
    mu_add_node(){

    }
}