class Species{
    /**
     * 
     * @param {Genome} g genome to be the initial genome in this species
     */
    constructor(g){
        this.genomes = [];
        this.champ;
        this.representative; 
        this.bestFitness = 0;

        //if g given
        if (g){
            this.genomes = g;
            this.champ = g;
            this.representative = g; // = g.copy
            this.bestFitness = g.fitness;
        }
    }
}