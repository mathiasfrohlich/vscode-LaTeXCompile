// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
	
	var pdflatex = vscode.commands.registerCommand('extension.latexCompile', function () {	
		
		try {
			//Full path to file
			var pathFull = vscode.window.activeTextEditor.document.fileName;
			//Only path without file
			var path = getFilePath(pathFull); // get the current file path
			//onely file name and type
			var fileNameAndType = getFileNameAndType(pathFull);
			
			//Obsolete but usefull in later context 
			// var fileName = getFileName(pathFull);
			// var fileType = getFileType(pathFull);

			//Check for file type
			if(getFileType(pathFull) != "tex"){
				//If not tex throw error with message
				throw new Error("Can't create PDF, open a .tex file.")
			}

			//Log the command to run
			console.log('cd ' + path + ' && pdflatex ' + fileNameAndType);
			
			//Run the command
			var exec = require('child_process').exec,
			cmd = exec('cd ' + path + ' && pdflatex ' + fileNameAndType);
			

			

			//Subscribe to output
			cmd.stdout.on('data',function (data) {
				//Logs output to console
				console.log(String(data));
				
				//If error is found in output, display an error to user
				if (String(data).toLowerCase().indexOf("error") > 0){
					//Show error
					vscode.window.showErrorMessage("Can't create PDF, see " + getFileName(pathFull) + ".log");
				}
			});
			
				vscode.window.showInformationMessage('PDF Compilled at ' + path);
			
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
		path = path.match(/(.*)[\/\\]/)[1]||''; // extract the directory from the path
		path += '/'
		return path;
    }
	context.subscriptions.push(pdflatex);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;