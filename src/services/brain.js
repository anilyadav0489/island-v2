
export function getTheIndex(islands){
    var myBucket = [];
    var hisBucket = [];
    let iteration = 0;
    let finalIndex = getTheBest(islands, true, myBucket, hisBucket);
    console.log('final value returned'+ finalIndex)
    return finalIndex;
};

function getTheBest(islands, myTurn, myBucket, hisBucket){
    let index=0;
    if(islands.length === 1){
        return 0;
    } else {
        let myLeft = 0;
        let myRight = 0;
        let myLeftIndex = 0;
        let myRightIndex = 0;
        let hisLeftIndex = 0;
        let hisRightIndex = 0;
        let hisLeft = 0;
        let hisRight = 0;
        let myT1 = [];
        let myT2 = []; 
        let hisT1 = [];
        let hisT2 = [];
        let returnedNum = -1;
        
        if(myTurn) {
            if(islands.length === 2) {
                if(islands[0]> islands[1]) {
                    myBucket.push(islands[0]);
                    hisBucket.push(islands[1]);
                    returnedNum =  islands[0];
                    index = 0;
                }else {
                    myBucket.push(islands[1]);
                    hisBucket.push(islands[0]);
                    returnedNum = islands[1];
                    index = 1;
                }
            }
            //my turn with recursion
            else {
                myLeft = islands[0];
                myT1 = [...myBucket];
                hisT1 = [...hisBucket];
                hisLeftIndex = getTheBest(removeLeft(islands), !myTurn, myT1, hisT1);
                hisLeft = removeLeft(islands)[hisLeftIndex];
                
                let x1 = 0;
                let y1 = 0; 
                let x2 = 0;
                let y2=0;
                x1 = myLeft + sumOfBucket(myT1);
                y1 = sumOfBucket(hisT1);
                //3,4
                
                myRight = islands[islands.length-1];
                myT2 = [...myBucket];
                hisT2 = [...hisBucket];
                hisRightIndex = getTheBest(removeRight(islands), !myTurn, myT2, hisT2);
                hisRight = removeRight(islands)[hisRightIndex];
                
                x2= myRight+sumOfBucket(myT2);
                y2=sumOfBucket(hisT2);
                
                //5,2
                if(x1>y1 && x2>y2) {
                    if(x1>x2) {
                        myBucket.push(...myT1);
                        hisBucket.push(...hisT1);
                        myBucket.push(myLeft);
                        index = 0;
                        return index;//myLeft;//x1;
                    }else {
                        myBucket.push(...myT2);
                        hisBucket.push(...hisT2);
                        myBucket.push(myRight);
                        index = islands.length-1;
                        return index;//myRight;//x2;
                    }
                }else if(x1>y1 && x2<y2) {
                    myBucket.push(...myT1);
                    hisBucket.push(...hisT1);
                    myBucket.push(myLeft);
                    index = 0;
                    return index;//myLeft;//x1;
                }else if(x1<y1 && x2>y2) {
                    myBucket.push(...myT2);
                    hisBucket.push(...hisT2);
                    myBucket.push(myRight);
                    index = islands.length-1;
                    return index;//myRight;//x2;
                }else if(x1<y1 && x2<y2) {
                    if(x1>x2) {
                        myBucket.push(...myT1);
                        hisBucket.push(...hisT1);
                        myBucket.push(myLeft);
                        index = 0;
                        return index;//myLeft;//x1;
                    }else {
                        myBucket.push(...myT2);
                        hisBucket.push(...hisT2);
                        myBucket.push(myRight);
                        index = islands.length-1;
                        return index;//myRight;//x2;
                    }
                }else if(x1 === y1) {
                    if(x2>y2) {
                        myBucket.push(...myT2);
                        hisBucket.push(...hisT2);
                        myBucket.push(myRight);
                        index = islands.length-1;
                        return index;//myLeft;//x1;
                    }else {
                        myBucket.push(...myT1);
                        hisBucket.push(...hisT1);
                        myBucket.push(myLeft);
                        index = 0;
                        return index;//myRight;//x2;
                    }
                }else {
                    myBucket.push(...myT1);
                    hisBucket.push(...hisT1);
                    myBucket.push(myLeft);
                    index = 0;
                    return index; //x1; //perhaps equal case
                }
            }
        }
        ////////////////////// not my turn
        else {
            if(islands.length === 2) {
                if(islands[0]> islands[1]) {
                    hisBucket.push(islands[0]);
                    myBucket.push(islands[1]);
                    returnedNum = islands[0];
                    index = 0;
                }else {
                    hisBucket.push(islands[1]);
                    myBucket.push(islands[0]);
                    returnedNum = islands[1];
                    index = 1;
                }
            }
            //not my turn with recursion
            else {
                hisLeft = islands[0];
                myT1 = [...myBucket];
                hisT1 = [...hisBucket];
                
                myLeftIndex = getTheBest(removeLeft(islands), !myTurn, myT1, hisT1);
                myLeft = removeLeft(islands)[myLeftIndex];
                        
                let x1 = 0;
                let y1 = 0;
                let x2 = 0; 
                let y2 = 0;
                x1 = hisLeft + sumOfBucket(hisT1);
                y1 = sumOfBucket(myT1);
                //3,4
                hisRight = islands[islands.length-1];

                myT2 = [...myBucket];
                hisT2 = [...hisBucket];
                myRightIndex = getTheBest(removeRight(islands), !myTurn, myT2, hisT2);
                myRight = removeRight(islands)[myRightIndex];
                
                x2 = hisRight + sumOfBucket(hisT2);
                y2 = sumOfBucket(myT2);
                
                //5,2
                if(x1>y1 && x2>y2) {
                    if(x1>x2) {
                        hisBucket.push(...hisT1);
                        myBucket.push(...myT1);
                        hisBucket.push(hisLeft);
                        index = 0;
                        return index;//hisLeft;//x1;
                    }else {
                        hisBucket.push(...hisT2);
                        myBucket.push(...myT2);
                        hisBucket.push(hisRight);
                        index = islands.length-1;
                        return index;//hisRight;//x2;
                    }
                }else if(x1>y1 && x2<y2) {
                    hisBucket.push(...hisT1);
                    myBucket.push(...myT1);
                    hisBucket.push(hisLeft);
                    index = 0;
                    return index;//hisLeft;//x1;
                }else if(x1<y1 && x2>y2) {
                    hisBucket.push(...hisT2);
                    myBucket.push(...myT2);
                    hisBucket.push(hisRight);
                    index = islands.length-1;
                    return index;//hisRight;//x2;
                }else if(x1<y1 && x2<y2) {
                    if(x1>x2) {
                        hisBucket.push(...hisT1);
                        myBucket.push(...myT1);
                        hisBucket.push(hisLeft);
                        index = 0;
                        return index;//hisLeft;//x1;
                    }else {
                        hisBucket.push(...hisT2);
                        myBucket.push(...myT2);
                        hisBucket.push(hisRight);
                        index = islands.length-1;
                        return index;//hisRight;//x2;
                    }
                }else if(x1 === y1) {
                    if(x2>y2) {
                        myBucket.push(...myT2);
                        hisBucket.push(...hisT2);
                        hisBucket.push(myRight);
                        index = islands.length-1;
                        return index;//myLeft;//x1;
                    }else {
                        myBucket.push(...myT1);
                        hisBucket.push(...hisT1);
                        hisBucket.push(myLeft);
                        index = 0;
                        return index;//myRight;//x2;
                    }
                }else {
                    hisBucket.push(...hisT1);
                    myBucket.push(...myT1);
                    hisBucket.push(hisLeft);
                    index = 0;
                    return index;//x1; //perhaps equal case
                }
            }
        }
    }
    return index;
}
    
function removeLeft(islands) {
    return islands.slice(1);
    
}

function removeRight(islands) {
    return islands.slice(0, islands.length-1);
    
}


function sumOfBucket(islands) {
    let a = 0;
    islands.forEach(element => {
        a = a + element
    });
    return a;
    
}