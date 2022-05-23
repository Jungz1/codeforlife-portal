let console = (function (userConsole) {
    return {
        formatArguments: function(arg) { 
            let argumentsMessage;

            // formats the differnt arguments so for the console
            switch (this.getType(arg)) {
                case "string":
                    argumentsMessage = `"${arg}"`;
                    break;
                case "object":
                    argumentsMessage = `Object ${JSON.stringify(arg)}`;
                    break;
                case "array":
                    argumentsMessage = `Array ${JSON.stringify(arg)}`;
                    break;
                default:
                    argumentsMessage = arg;
                    break;
            }
            return argumentsMessage;
        },
        //returns their types
        getType: function (arg) {
            if (typeof arg === "string") return "string";
            if (typeof arg === "boolean") return "boolean";
            if (typeof arg === "function") return "function";
            if (typeof arg === "number") return "number";
            if (typeof arg === "undefined") return "undefined";
            if (typeof arg === "object" && !Array.isArray(arg)) return "object";
            if (typeof arg === "object" && Array.isArray(arg)) return "array";
        },
        //incase of multiple outputs
        logMultipleArguments: function (arguments) {
            let currentLog = "";

            // Deal with multiple arguments
            arguments.forEach(arg => {
                currentLog += this.formatArguments(arg) + " ";
            });
            //addds them to logs for printing to console
            userConsole.log.apply(userConsole, arguments);
            consoleMessages.push({
                message: currentLog,
                class: `log log--default`
            });
            userConsole.log(consoleMessages);
        },
        logSingleArgument: function (logItem) {
            userConsole.log(logItem);
            consoleMessages.push({
                message: this.formatArguments(logItem),
                class: `log log--${this.getType(logItem)}`
            });
            userConsole.log(consoleMessages);
        },
        log: function (text) {
            let argsArray = Array.from(arguments);
            return argsArray.length !== 1 ? this.logMultipleArguments(argsArray) : this.logSingleArgument(text);
        },
        info: function (text) {
            userConsole.info(text);
        },
        warn: function (text) {
            userConsole.warn(text);
        },
        error: function (err) {
            userConsole.error(err);
            consoleMessages.push({
                message: `${err.name}: ${err.message}`,
                class: "log log--error"
            });
        }
    }
})(window.console);