// stores these buttons from html to interact with js
const codeExe = document.querySelector('.editor__run');
const resetDefaultButton = document.querySelector('.editor__reset');
const consoleLogList = document.querySelector('.editor__console-logs');

//initial setup
let codeEditor = ace.edit("jseditor");
let defaultCode = 'console.log("Hello World!");';
let consoleMessages = [];
//The following stores the tests and the resulting output
let resultString = "";
let tests = [3, '"Hello World"', '"trivial"', '"21"', false];
let length = tests.length;
let testValue = tests[Math.floor((Math.random() * length))];

let userEditor = {
    clearConsoleScreen(){
        //deletes every message in consoleLogList from userConsole
        consoleMessages.length = 0;
        while (consoleLogList.firstChild){
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printConsole(){
        resultString = "";
        consoleMessages.forEach(log => {
            //creates list of each output
            const newItem = document.createElement('li');
            const newItemText = document.createElement('pre');
            newItemText.className = log.class;
            newItemText.textContent = `${log.message}`;
            newItem.appendChild(newItemText);
            consoleLogList.appendChild(newItem);
            //appends to resultString to be compared later
            resultString = resultString += `${log.message} \n`;
        })
    },
    init() {
        // Configure Ace
        // Set language to javascript
        codeEditor.session.setMode("ace/mode/javascript");

        // Allows the editor to autocomplete some scripting with suggestions
        codeEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
        // Set default code at the beginning and sets test value for student to achieve
        codeEditor.setValue(defaultCode);
        document.getElementById("tests").innerHTML = testValue;
    }
}

// Button events
resetDefaultButton.addEventListener('click', () => {
    // resets editor to default code
    codeEditor.setValue(defaultCode);
    userEditor.clearConsoleScreen();
});
codeExe.addEventListener('click', () => {
    userEditor.clearConsoleScreen();
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }
    userEditor.printConsole();
    //checks to ensure the test value and result from the console are the same
    try {
        //cleans the test values and results if they are a string
        testCleaned = testValue.replaceAll('"','');
        resultCleaned = resultString.replaceAll('"','');
        testCleaned = testValue.replace(/\s+/g,'');
        resultCleaned = resultString.replace(/\s+/g,'');
        if (testCleaned === resultCleaned){
            alert("Correct! Nice One!");
            testValue = tests[Math.floor((Math.random() * length))];
            document.getElementById("tests").innerHTML = testValue;
        }else{
            alert("Wrong Please retry");
        }
    } catch (err) {
        //if the result is not a string then it will do a comparison
        //if it matches, then it will give an alert and set a new test value from the array
        if (testValue == resultString){
            alert("Correct! Nice One!");
            testValue = tests[Math.floor((Math.random() * length))];
            document.getElementById("tests").innerHTML = testValue;
        }else{
            alert("Wrong Please retry");
        }
    }

})


userEditor.init();