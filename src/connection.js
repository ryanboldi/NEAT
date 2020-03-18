class Connection{
    /**
     * 
     * @param {Number} in_node Node that this connection comes from
     * @param {Number} out_node Node that this conneciton goes to
     * @param {Number} weight Strength of this connection
     * @param {Boolean} enabled Whether this connection is enabled or not
     * @param {Number} innov_number Number to give us evoluntionary history of the genome
     */
    constructor(in_node, out_node, weight, enabled, innov_number){
        this.in_node = in_node;
        this.out_node = out_node;
        this.weight = weight;
        this.enabled = enabled;
        this.innov_number = innov_number;
    }

    //takes input node value, multiplies by weight, and adds it to the input sum of the output node
    activate(){
        this.out_node.incomingSignal += (this.in_node.value * this.weight)
    }
}