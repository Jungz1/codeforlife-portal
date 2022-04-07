const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');
const logList = document.querySelector('.editor__console-logs');

let codeEditor = ace.edit("jseditor");
let codePlaceholder = 'console.log("Hello World!");';
let consoleMessages = [];

let editorLib = {
    clearUserConsole() {
          consoleMessages.length = 0;  
          while (logList.firstChild){
              logList.removeChild(logList.firstChild);
          }
    },
    displayConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`;
            newLogItem.appendChild(newLogText);
            logList.appendChild(newLogItem);
        })
    },
    init() {
        codeEditor.session.setMode("ace/mode/javascript");

        codeEditor.setOptions({
            fontSize: '14pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        codeEditor.setValue(codePlaceholder);


    }
}

executeCodeBtn.addEventListener('click', () => {
    editorLib.clearUserConsole();
    const usersCode = codeEditor.getValue();

    try {
        console.log(new Function(usersCode)());
    }catch (errorInCode){
        console.error(errorInCode);
    }
    
    editorLib.displayConsole();


});

resetCodeBtn.addEventListener('click', () => {
    codeEditor.setValue('');
    editorLib.clearUserConsole();

});

editorLib.init();
