const fs = require('fs');

try {

    class No {
        constructor(chave){
        this.chave=chave;
        this.esq=null;
        this.dir=null;
        }
    }

    class Arvore  {

        constructor() { 
            this.raiz = null; 
        } 

        inserir(chave){

            let newNo = new No(chave);
            
            if(this.raiz===null){
                this.raiz = newNo;
            }else{
                this.insertNode(this.raiz, newNo); 
            }
            
        }

        insertNode(node, newNode) 
        {  
            if(newNode.chave < node.chave) 
            { 
                if(node.esq === null) 
                    node.esq = newNode; 
                else 
                    this.insertNode(node.esq, newNode);  
            } 
    
            else
            { 
                if(node.dir === null) 
                    node.dir = newNode; 
                else
                    this.insertNode(node.dir,newNode); 
            } 
        }

        inOrder(node){
            
            if(node !== null){
                this.inOrder(node.esq);
                // console.log(node.chave);
                arInOrder += node.chave + " ";
                this.inOrder(node.dir);
            }
        }

        preOrder(node) 
        { 
            if(node !== null) 
            { 
                // console.log(node.chave); 
                arPreOrder += node.chave + " ";
                this.preOrder(node.esq); 
                this.preOrder(node.dir); 
            } 
        } 

        posOrder(node) 
        { 
            if(node !== null) 
            { 
                this.posOrder(node.esq); 
                this.posOrder(node.dir); 
                // console.log(node.chave); 
                arPosOrder += node.chave + " ";
            } 
        } 

        searchTree(chave){

            let aux = this.raiz;

            while(aux !== null && aux.chave !== chave){

                if(chave > aux.chave)
                    aux = aux.dir;
                else
                    aux = aux.esq;
            }

            if(aux===null)
                console.log(chave + " nao existe");
            else
                console.log(chave + " existe");
        }

        remove(chave){ 
            this.raiz = this.removeNode(this.raiz, chave); 
        } 
        
        removeNode(node,key){
        
            if(node === null) 
                return null; 
    
            else if(key < node.chave) 
            { 
                node.esq = this.removeNode(node.esq, key); 
                return node; 
            } 
    
            else if(key > node.chave) 
            { 
                node.dir = this.removeNode(node.dir, key); 
                return node; 
            } 
         
            else
            { 
                if(node.esq === null && node.dir === null) 
                { 
                    node = null; 
                    return node; 
                } 
        
                if(node.esq === null && node.dir !== null) 
                { 
                    node = node.dir;
                    return node; 
                } 
                
                else if(node.dir === null && node.esq !== null) 
                { 
                    node = node.esq; 
                    return node; 
                } 
        
                let aux = this.encontrarAntecessorImediato(node.esq); 
                node.chave = aux.chave;         
                node.esq = this.removeNode(node.esq, aux.chave); 
                return node; 
            }
        }

        encontrarAntecessorImediato(node) 
        { 
            if(node.dir === null) 
                return node; 
            else
                return this.encontrarAntecessorImediato(node.dir); 
        } 
    }

    const data = 
    fs.readFileSync('input.txt', 'UTF-8');
    // fs.readFileSync('/dev/stdin', 'UTF-8'); // NO URI / LINUX funciona assim

    const lines = data.split(/\r?\n/);

    let arInOrder,arPreOrder,arPosOrder;
    arvore = new Arvore();

    arInOrder = '';
    arPreOrder = '';
    arPosOrder = '';

    while(lines.length > 1){ // eof

        let exp = lines.shift();

        if(exp==="INFIXA"){
            arvore.inOrder(arvore.raiz);
            arInOrder = arInOrder.trim();
            console.log(arInOrder);
            arInOrder = '';
        }else if(exp==="PREFIXA"){
            arvore.preOrder(arvore.raiz);
            arPreOrder = arPreOrder.trim();
            console.log(arPreOrder);
            arPreOrder = '';
        }else if(exp==="POSFIXA"){
            arvore.posOrder(arvore.raiz);
            arPosOrder = arPosOrder.trim();
            console.log(arPosOrder);
            arPosOrder = '';
        }else{

            let auxExp = exp.split(" ");
            if(auxExp[0]==='I'){
                arvore.inserir(parseInt(auxExp[1]));
            }else if(auxExp[0]==='P'){
                arvore.searchTree(parseInt(auxExp[1]));
            }else if(auxExp[0]==='R'){
                arvore.remove(parseInt(auxExp[1]));
            }
        }
    }
   
} catch (err) {
    console.error(err);
}
