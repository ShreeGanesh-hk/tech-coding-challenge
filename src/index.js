let drawing = null;
let canvasWidth = 0;
let canvasHeight = 0;
let colorString = null;
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    prefix = 'enter command: ';

rl.on('line', function (commandArgs) {
    var splitted = commandArgs.split(" ", 1);
    switch (splitted[0]) {
        case 'C':
            CreateNewCanvas(commandArgs);
            break;
        case 'L':
            CreateNewLine(commandArgs);
            break;
        case 'R':
            CreateRectangle(commandArgs);
            break;
        case 'B':
            CreateColor(commandArgs);
            break;
        case 'Q':
            process.exit(0);
        default:
            console.log('Invalid command ! Please enter valid command');
            break;
    }
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
});

rl.setPrompt(prefix, prefix.length);
rl.prompt();

function CreateNewCanvas(commandArgs) {
    var commands = commandArgs.split(" ");
    if (commands.length == 3) {
        drawing = [];
        canvasWidth = Number(commands[1]);
        canvasHeight = Number(commands[2]);
        console.log("Canvas Shape with width = %s and height = %s", canvasWidth, canvasHeight);
        let widthString = [];
        for (i = 0; i < Number(canvasWidth) + 2; i++) {
            widthString.push("-");
        }
        drawing.push(widthString);
        for (k = 0; k < canvasHeight; k++) {
            let heightString = [];
            heightString.push("|");
            for (j = 0; j < canvasWidth; j++) {
                heightString.push(" ")
            }
            heightString.push("|");
            drawing.push(heightString);
        }
        drawing.push(widthString);
        GetDrwaing(drawing);
    } else {
        console.log("Invalid co-ordinates for Canvas")
    }
}

function CreateNewLine(commandArgs) {
    if (canvasWidth != 0 && canvasHeight != 0) {
        commands = commandArgs.split(" ")
        if (commands.length == 5) {
            const x1 = commands[1];
            const y1 = commands[2];
            const x2 = commands[3];
            const y2 = commands[4];
            if (x1 > 0 && y1 > 0 && x2 > 0 && y2 > 0 && x1 <= x2 && x2 <= canvasWidth && y1 <= y2 && y2 <= canvasHeight) {
                //horizontal line 
                if (y1 == y2 && x1 <= x2) {
                    console.log("Drawing horizontal line with x1=%s y1=%s x2=%s y2=%s", x1, y1, x2, y2);
                    for (i = x1; i <= x2; i++) {
                        drawing[y1][i] = "x";
                    }
                    GetDrwaing(drawing);
                }
                //vertical line
                else if (x1 == x2 && y1 <= y2) {
                    console.log("Drawing vertical line with x1=%s y1=%s x2=%s y2=%s", x1, y1, x2, y2);
                    for (i = y1; i <= y2; i++) {
                        drawing[i][x1] = "x";
                    }
                    GetDrwaing(drawing);
                }
                else {
                    console.log("Invalid co-ordinates for Line, For vertical line x1 should be euqal to x2 and for horizontal line y1 should be equal to y2")
                }
            }
            else {
                console.log("Invalid co-ordinates for Line, Please check x1 y1 x2 y2 values")
            }
        }
        else {
            console.log("Invalid co-ordinates for Command Line, Please enter x1,y1,x2,y2")
        }

    } else {
        console.log("Please draw canvas first")
    }
}

function CreateRectangle(commandArgs) {
    if (canvasWidth != 0 && canvasHeight != 0) {
        commands = commandArgs.split(" ")
        if (commands.length == 5) {
            const x1 = commands[1];
            const y1 = commands[2];
            const x2 = commands[3];
            const y2 = commands[4];
            if (x1 > 0 && y1 > 0 && x2 > 0 && y2 > 0 && x1 < x2 && y1 < y2 && x2 <= canvasWidth && y2 <= canvasHeight) {
                for (i = y1; i <= y2; i++) {
                    for (j = x1; j <= x2; j++) {
                        if (i == y1 || i == y2 || j == x1 || j == x2) {
                            drawing[i][j] = "x"
                        }
                    }
                }
                GetDrwaing(drawing);
            }
            else {
                console.log("Invalid co-ordinates for Rectangle, Please check x1 y1 x2 y2 values")
            }
        }
        else {
            console.log("Invalid co-ordinates for Rectangle, Please enter x1,y1,x2,y2")
        }

    } else {
        console.log("Please draw canvas first")
    }
}

function CreateColor(commandArgs) {
    if (canvasWidth != 0 && canvasHeight != 0) {
        commands = commandArgs.split(" ")
        if (commands.length == 4) {
            const width = commands[1];
            const height = commands[2];
            colorString = commands[3];
            if (width > 0 && height > 0 && width <= canvasWidth && height <= canvasHeight) {
                ColorCanvas(Number(width),Number(height))
                GetDrwaing(drawing);
            }
            else {
                console.log("Invalid co-ordinates for Rectangle, Please check x1 y1 x2 y2 values")
            }
        }
        else {
            console.log("Invalid co-ordinates for Rectangle, Please enter x1,y1,x2,y2")
        }

    } else {
        console.log("Please draw canvas first")
    }
}

function ColorCanvas(width,height) {
    if (width > 0 && width <= canvasWidth && height > 0 && height <= canvasHeight) {
        if (drawing[height][width] == " ") {
            drawing[height][width] = colorString;
            if (drawing[height][(width - 1)] == " " && (width-1) > 0) {
                ColorCanvas((width - 1),height)
            }
            if (drawing[height][(width + 1)] == " " && (width +1) <= canvasWidth) {
                ColorCanvas((width + 1),height)
            }
            if (drawing[(height - 1)][width] == " " && (height -1) > 0) {
                ColorCanvas(width,(height - 1));
            }
            if (drawing[(height + 1)][width] == " " && (height +1) <= canvasHeight) {
                ColorCanvas(width,(height + 1))
            }
        }
    }
}

function GetDrwaing(drawing) {
    let finalDrawing = "";
    drawing.forEach(line => {
        line.forEach(element => {
            finalDrawing = finalDrawing + element;
        })
        finalDrawing = finalDrawing + "\n"
    });
    console.log(finalDrawing);
}