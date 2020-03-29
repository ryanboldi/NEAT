class History{
    constructor(from, to, num, numbers){
        this.fromNode = from; //Which node this connection comes from
        this.toNode = to; // where this connection goes
        this.num = num; // innvation number of this innovation
        this.nums = [];
        arrayCopy(numbers, this.nums); //this.nums stores the innovation numbers off all connections of the creature that
        //originally had this mutation
    }
}