function validateInput() {
    var lineX = +document.getElementById('lengthX').value;
    var lineY = +document.getElementById('lengthY').value;
    if (lineX < 1 || lineX > 10 || isNaN(lineX)) {
        alert('Введите в строку X: число от 1 до 10')
        document.getElementById('lengthX').value = '';
        document.getElementById('myButt').disabled = true;
    } else if (lineY < 1 || lineY > 10 || isNaN(lineY)) {
        alert('Введите в строку Y: число от 1 до 10')
        document.getElementById('lengthY').value = '';
        document.getElementById('myButt').disabled = true;
    } else {
        document.getElementById('myButt').disabled = false;
        drawChessBoard();
    }
}

function checkIfInputsEmpty() {
    var lineX = document.getElementById('lengthX').value;
    var lineY = document.getElementById('lengthY').value;
    if ((lineY.trim() === '' || lineY.trim() == null) || (lineX.trim() === '' || lineX.trim() == null)) {
        document.getElementById('myButt').disabled = true;
    } else {
        document.getElementById('myButt').disabled = false;
    }
}

document.getElementById('myButt').onclick = function() {
    validateInput();

}

document.getElementById('lengthX').onkeyup = function() {
    checkIfInputsEmpty()
}

document.getElementById('lengthY').onkeyup = function() {
    checkIfInputsEmpty()
}

function drawChessBoard() {
    var chessBoard = document.getElementById("chessBoard");
    chessBoard.innerHTML = '';
    var x = document.getElementById('lengthX').value;
    var y = document.getElementById('lengthY').value;
    for (var i = 0; i < y; i++) {
        var row = chessBoard.appendChild(document.createElement("div"));
        for (var j = 0; j < x; j++) {
            var column = document.createElement("span");
            column.className = "cell"
            if (i % 2 === 0) {
                j % 2 === 0 ? column.classList.add("white") : column.classList.add("black");
            } else {
                j % 2 === 0 ? column.classList.add("black") : column.classList.add("white");
            }
            row.appendChild(column);
        }
    }
}

document.getElementById('chessBoard').onclick = function(event) {
    var target = event.target;
    if (target.tagName.toLowerCase() != 'span') { return }
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].classList.value.includes("white")) {
            cells[i].classList.remove('white');
            cells[i].classList.add('black');
        } else {
            cells[i].classList.remove('black');
            cells[i].classList.add('white');
        }
    }
}