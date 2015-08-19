// Cell representation 
var Button = function(element){
    // Reference to DOM element
    this.element = element;
    // Make UI changes for a particular cell
    this.markChange = function(symbol){
        this.element.innerText = symbol 
        this.element.className = this.element.className + " disabled"
    };    
}

// Depends on Board class,
var Player = function(symbol){
    this.active = false; 
    this.symbol = symbol;
    this.name = "Player "+symbol;
    
    this.move = function(index){
        // Mark the change on Button class
        board.buttons[index-1].markChange(this.symbol);
        // Store the move
        return board.storeMove(index,symbol);
    }
}

var Board = function(buttons,players){
    
    this.buttons = buttons
    this.players = players
    
    this.active = true;
    
    this.cells = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

    this.moveCount = 0;
    
    this.storeMove = function(linearIndex,symbol){
        // Increment the move counter
        this.moveCount++;
        // Convert linear index to 2D index
        row = Math.floor((linearIndex - 1 )/ 3);
        column = (linearIndex - 1 ) % 3;
        // Numeric representation of symbol
        cellValue = symbol == "X" ? 1 : 0
        
        // Store the move
        this.cells[row][column] = cellValue
        
        // After Minimum number of 4 moves, finding out the winner
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
            
            // Check for draw
            if ( this.moveCount == 9 ){
                return "Draw";
            }
        }
    }
}


// Main function that delegates events from the UI to the classes
function play(){
    
    var index = this.getAttribute('data-index');
    
    // The result is declared or the cell is already marked then do nothing
    if(this.className.indexOf('disabled') > 0 || board.active == false){
        return;
    }
    
    // Alternating of players after each move
    if(board.players[0].active == true){
        activeIndex = 0;
        inactiveIndex = 1;
    }else {
        activeIndex = 1;        
        inactiveIndex = 0;
    }
    
    // Processing the click to a game move
    var result = board.players[activeIndex].move(index);
    
    board.players[activeIndex].active = false;
    board.players[inactiveIndex].active = true; 
    
    if(result == board.players[0].symbol){
        // Player 0 won the game
        board.active = false;
        console.log("Winner : "+board.players[0].name);
        
        jQuery('#symbol').text(board.players[0].name);
        jQuery('#result').show(100);
        
    }else if (result == board.players[1].symbol){
        // Player 1 won the game
        board.active = false;
        console.log("Winner : "+board.players[1].name);       
        
        jQuery('#symbol').text(board.players[1].name);
        jQuery('#result').show(100);
    
    }else if(result == "Draw"){
        board.active = false;
        console.log("Game Draw");
        
        jQuery('#draw').show(100);
    }
    
}



elements = document.getElementsByClassName('cell');

buttons = [];

// Create cells for the board
for(var i=0;i<elements.length;i++){
    buttons.push(new Button(elements[i]));
    elements[i].addEventListener('click',play);
}

// Create two players with first player as symbol X
player1 = new Player("X");
player2 = new Player("O");

player1.active = true;

players = [player1,player2]

// Create a board with cells and players
board = new Board(buttons,players);
