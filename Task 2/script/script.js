function append(char) {
    document.getElementById("display").value += char;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    try {
        let result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch {
        document.getElementById("display").value = "Error";
    }
}

document.addEventListener("keydown", function(e) {
    const key = e.key;
    if ("0123456789+-*/.".includes(key)) {
        append(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
