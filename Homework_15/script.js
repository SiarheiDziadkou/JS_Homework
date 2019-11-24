function addRow() {
    var newTr = document.getElementById('start');
    newTr.insertAdjacentHTML('afterBegin', '<tr><td class="cells"></td><td class="cells"></td><td class="cells"></td></tr>');
}

document.getElementById('addButton').onclick = function() {
    addRow();
}

function inputFocusOut(insertedInput) {
    insertedInput.onblur = function() {
        var parentTD = insertedInput.closest('td');
        var inputValue = insertedInput.value;
        parentTD.innerHTML = '';
        parentTD.innerText = inputValue;
    }
    insertedInput.onkeyup = function(event) {
        var keyCode = event.key;
        if (keyCode.toLowerCase() == 'enter') {
            insertedInput.blur();
        }
    }
}

function inputFocus(target, tdValue) {
    var insertedInput = document.createElement('input');
    insertedInput.value = tdValue;
    target.appendChild(insertedInput);
    insertedInput.focus();
    inputFocusOut(insertedInput);
}

document.getElementById('table').onclick = function(event) {
    var target = event.target;
    if (target.tagName.toLowerCase() != 'td') return;
    var tdValue = '';
    if (target.innerText != '') {
        tdValue = target.innerText;
    }
    target.innerHTML = '';

    inputFocus(target, tdValue);
}