// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    var pdflatex = vscode.commands.registerCommand('extension.latexCompile', function() {

        try {
            vscode.workspace.saveAll();
            var pathFull = vscode.window.activeTextEditor.document.fileName;

            if (vscode.workspace.getConfiguration('latexCompile').mainFile) {
                if (vscode.workspace.rootPath) {
                    pathFull = vscode.workspace.rootPath + "/" + vscode.workspace.getConfiguration('latexCompile').mainFile;
                } else {
                    throw new Error('Use of mainFile requires a folder to be opened');
                }
            }

            //Only path without file
            var path = getFilePath(pathFull); // get the current file path
            //Only file name and type
            var fileNameAndType = getFileNameAndType(pathFull);
            var fileName = getFileName(pathFull);
            var filePath = getFilePath(pathFull);
            // var fileType = getFileType(pathFull);
            var pdfFileName = filePath + fileName + ".pdf";

            //Check for file type
            if (getFileType(pathFull) != "tex") {
                //If not tex throw error with message
                throw new Error("Can't create PDF, open a .tex file.");
            }

            var command = 'cd ' + path + ' && ' + vscode.workspace.getConfiguration('latexCompile').compiler + ' ' + fileNameAndType;

            //Log the command to run
            console.log(command);

            setStatusBarText('Generating', "PDF");

            //Run the command
            var exec = require('child_process').exec,
                cmd = exec(command);

            //Make log file to contain console		
            exec('cd ' + path + ' && type NUL > ' + fileName + ".vscodeLog");

            //Subscribe to output
            cmd.stdout.on('data', function(data) {
                //Logs output to console
                console.log(String(data));

                //If error is found in output, display an error to user
                if (String(data).toLowerCase().indexOf("error") > 0) {
                    //Show error
                    vscode.window.setStatusBarMessage("Can't create PDF, see " + getFileName(pathFull) + ".vscodeLog", 12000);

                    if (vscode.workspace.getConfiguration('latexCompile').openLogAfterError) {
                        var consoleLogFile = vscode.Uri.file(path + fileName + ".vscodeLog");

                        vscode.workspace.openTextDocument(consoleLogFile).then(function(d) {
                            vscode.window.showTextDocument(d);
                            // Open file, add console string, save file.
                            var fd = fs.openSync(path + fileName + ".vscodeLog", 'w+');
                            var buffer = new Buffer(String(data));
                            fs.writeSync(fd, buffer, 0, buffer.length);
                            fs.close(fd);

                        });

                    }

                }
            });

            cmd.stdout.on('close', function() {
                if (vscode.workspace.getConfiguration('latexCompile').openAfterCompile) {
                    setStatusBarText('Launching', "PDF");
                    if (process.platform == 'darwin') {
                        exec('open ' + pdfFileName);
                    } else {
                        exec(pdfFileName);
                    }
                } else {
                    vscode.window.showInformationMessage('PDF Compilled at ' + path);
                }
            });

        } catch (error) {
            //Catch error and show the user the message in the error
            vscode.window.showErrorMessage(error.message);
        }
    });
    //Function to get file name and type
    function getFileNameAndType(file) {
        var forwardSlash = file.lastIndexOf("/");
        var backSlash = file.lastIndexOf("\\");
        if (forwardSlash === -1 && backSlash === -1) {
            return file;
        }
        return file.substring((forwardSlash > backSlash) ? forwardSlash + 1 : backSlash + 1);
    }
    //Function to get only file type
    function getFileType(file) {
        var stringFile = getFileNameAndType(file);
        return stringFile.split(".")[1];
    }
    //Function to get only file name
    function getFileName(file) {
        var stringFile = getFileNameAndType(file);
        return stringFile.split(".")[0];
    }
    //Function to get only file path
    function getFilePath(file) {
        var path = file;
        path = path.match(/(.*)[\/\\]/)[1] || ''; // extract the directory from the path
        path += '/';
        return path;
    }
    context.subscriptions.push(pdflatex);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

function setStatusBarText(what, docType) {
    var date = new Date();
    var text = what + ' [' + docType + '] ' + date.toLocaleTimeString();
    vscode.window.setStatusBarMessage(text, 1500);
}