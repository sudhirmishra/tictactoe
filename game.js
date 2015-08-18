var Button = function(index,element){
    
    this.index = index
    this.element = element;
    
    this.markChange = function(symbol){
        // If the button is disabled, do nothing        
        this.element.innerText = symbol 
        this.element.className = this.element.className + " disabled"
    };
    
}

var Board = function(buttons,players){
    
    this.buttons = buttons
    this.players = players
    
    this.active = true;
    
    this.cells = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

    this.moveCount = 0;
    this.status = "Begin";
    
    
    this.storeMove = function(linearIndex,symbol){
        // 1 is 00  row = (1-1)/3 = 0; column = (1-1)%3 = 0
        // 2 is 01  row = (2-1)/3 = 0; column = (2-1)%3 = 1
        // 3 is 02  row = (3-1)/3 = 0; column = (3-1)%3 = 2
        
        // Increment the move counter
        this.moveCount++;
        row = Math.floor((linearIndex - 1 )/ 3);
        column = (linearIndex - 1 ) % 3;
        
        cellValue = symbol == "X" ? 1 : 0
        
        this.cells[row][column] = cellValue
        
        if( this.moveCount > 4 ){
        
            // Check row
            
            for ( var i=0;i<3;i++){
                if(this.cells[i][column] != cellValue){
                    break;
                }
                if(i == 2){
                   return symbol;
                }
            }
            
            // Check column
            
            for ( var i=0;i<3;i++){
                if(this.cells[row][i] != cellValue){
                    break;
                }
                if(i == 2){
                
                   return symbol;
                }
            }
            
            // Check diagonal
            
            for ( var i=0;i<3;i++){
                if(this.cells[i][i] != cellValue){
                    break;
                }
                if(i == 2){
                   return symbol 
                }
            }
            
            // Check anti diagonal
            
            for ( var i=0;i<3;i++){
                if(this.cells[i][2-i] != cellValue){
                    break;
                }
                if(i == 2){
                   return symbol 
                }
            }
            
            if ( this.moveCount == 9 ){
                return "Draw";
            }
        }
    }
}

var Player = function(symbol){
    this.active = false // OF NO USE 
    this.symbol = symbol;
    this.name = "Player "+symbol;
    
    this.move = function(index){
        // Mark the change on Button class
        board.buttons[index-1].markChange(this.symbol);
        // Store the move
        return board.storeMove(index,symbol);
    }
}

function play(){
    var index = this.getAttribute('data-index');
    
    if(this.className.indexOf('disabled') > 0 || board.active == false){
        return;
    }
    
    if(board.players[0].active == true){
        activeIndex = 0;
        inactiveIndex = 1;
    }else {
        activeIndex = 1;        
        inactiveIndex = 0;
    }
    
    var result = board.players[activeIndex].move(index);
    
    board.players[activeIndex].active = false;
    board.players[inactiveIndex].active = true; 
    
    if(result == board.players[0].symbol){
        // Player 0 won the game
        board.active = false;
        console.log("Winner : "+board.players[0].symbol);
    }else if (result == board.players[1].symbol){
        // Player 1 won the game
        board.active = false;
        console.log("Winner : "+board.players[1].symbol);       
    }else if(result == "Draw"){
        board.active = false;
        console.log("Game Draw");
    }
    
}

// Each board has two players
// One of the player is active
// Board has 9 buttons
// Buttons has index and symbol associated with it
// Board checks if three in a line or not
// Button has the function to make the UI changes
// Player has the function move, which takes input index / button reference


// Players makes the move, move gets the ref of the element
// Button marks the move
