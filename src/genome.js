class Genome {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;

        this.nodes = [] //array of nodes
        this.connections = [] // array of connections between those nodes

        for (let i = 0; i < inputs; i++) {
            this.nodes.push(new Node(i, 'i'))
        }
        //add one bias to input layer, always activated (1)
        this.nodes.push(new Node(inputs, 'b'))
        for (let i = 0; i < this.outputs; i++) {
            console.log(`adding output #${i}`)
            this.nodes.push(new Node(inputs + i + 1, 'o'));
        }

        //all genomes should be randomly connected on initilisation
        //that means every input should be connected to an output.
        let possible_connections = []; // every possible connection

        for (let i = 0; i < this.inputs + 1; i++) {
            for (let j = this.inputs + 1; j < this.nodes.length; j++) { //don't want to connect TO an input node
                possible_connections.push([i, j]);
            }
        }
        //0 is input 0 to output 0, 1: i1 -> o0, 2:i2->o0, 3:i0 -> o1
        let connecs = Math.floor(Math.random() * (possible_connections.length + 1)); // how many connections we want to start with
        let rand_connecs = [];
        while (rand_connecs.length < connecs) {
            //choose random connection from possible connections
            let rand_index = Math.floor((Math.random() * possible_connections.length))
            rand_connecs.push(possible_connections[rand_index]);
            possible_connections.splice(rand_index, 1);
        }
        //create new connections from these inputs to outputs.
        for (let i = 0; i < rand_connecs.length; i++) {
            this.connections.push(new Connection(rand_connecs[i][0], rand_connecs[i][1]));
        }
    }

    //mutates the genome by adding a random connection
    //a single new connection gene with a random weight is added connectng two previously unconnected nodes
    mut_add_connection() {
        let possible = []
        //check for connections that don't already exist
        for (let i = 0; i < this.nodes.length; i++){
            for (let j = this.inputs.length -1 ; j < this.nodes.length; j++){//start at inputs because we do not want connections TO inputs
                //check if there is a connection from i to j, if not add it to possible connections array
                connectionExists = false;
                for (let k = 0; k < this.connections.length; k++){
                    if (this.connections[k].in_node == this.nodes[i].num && this.connections[k].out_node == this.nodes[j].num){
                        connectionExists = true;
                    }
                }
                if (!connectionExists){
                    let NEW = [];
                    NEW.push(i);
                    NEW.push(j);
                    possible.push(NEW);//pushes this unused connection to possible connections
                }
            }
        }
        console.log(possible);
    }

    //mutates the genome by adding a new node
    //an existing connection is split and the new node placed where the old connection used to be
    //old connection is disabled an two new connections are added to the genome. 
    //new conneciton leadig into the new node recieves a weight of 1. 
    // new connection leading out recieves the same weight as the old connection
    //this minimizes the affect of the node addition mutation
    mu_add_node() {

    }

    //feeds info down ONE CONNECTION.
    /**
     * 
     * @param {Array} input array with each input. normalised between -1 and 1. [-0.7 ,0.8, 3]
     */
    feedforward(input) {
        this.order_nodes(); //orders nodes in the array.
        let inputindex = 0 //help me keep track of how many inputs weve assigned already

        //SETS INPUTS TO INPUT ARRAY

        //then, we total all nodes and apply activation function
        for (let i = 0; i < this.nodes.length; i++) {
            //if they are input, then set their values to the input array that was given
            //the specific node doesnt matter as long as its the same every time.
            if (this.nodes[i].type == 'i') {
                this.nodes[i].value = input[inputindex]
                inputindex += 1;
            }
        }

        //FEED FORWARD ONE CONNECTION
        for (let i = 0; i < this.connections.length; i++) {
            this.nodes[this.connections[i].out_node].incomingSignal += (this.nodes[this.connections[i].in_node].value * this.connections[i].weight)
        }

        //ENGAGE ALL NEURONS
        for (let i = 0; i < this.nodes.length; i++) {
            //if its an input we don't want any activation function
            if (this.nodes[i].type !== 'i') {
                this.nodes[i].engage();
            }
        }

        let outs = []//outputs
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].type == 'o') {
                outs.push(this.nodes[i].value)
            }
        }
        return outs;
    }

    //orders nodes by their numbers
    order_nodes() {
        this.nodes.sort((a, b) => a.num - b.num);
    }
}