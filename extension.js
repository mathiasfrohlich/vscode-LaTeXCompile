// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
	
	var pdflatex = vscode.commands.registerCommand('extension.latexCompile', function () {	
		
		try {
			var pathFull = vscode.window.activeTextEditor.document.fileName;
			var path = getFilePath(pathFull); // get the current file path
			var fileNameAndType = getFileNameAndType(pathFull);
			// var fileName = getFileName(pathFull);
			// var fileType = getFileType(pathFull);

			if(getFileType(pathFull) != "tex"){
				throw new Error("Can't create PDF, open a .tex file.")

			}

			console.log('cd ' + path + ' && pdflatex ' + fileNameAndType);
			
			var exec = require('child_process').exec,
			cmd = exec('cd ' + path + ' && pdflatex ' + fileNameAndType);
			

			

			cmd.stdout.on('data',function (data) {
				console.log(String(data));
				if (String(data).toLowerCase().indexOf("error") > 0){
					vscode.window.showErrorMessage("Can't create PDF, see " + getFileName(pathFull) + ".log");
				}
				}
			);
			
				vscode.window.showInformationMessage('PDF Compilled');
			
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
			// vscode.window.showErrorMessage("Can't create PDF, open a .tex file.");
		}
	});
	function errorHandeling(data){
		console.log(String(data));
	}
	function getFileNameAndType(file) {
        var forwardSlash = file.lastIndexOf("/");
        var backSlash = file.lastIndexOf("\\");
        if (forwardSlash === -1 && backSlash === -1) {
            return file;
        }
        return file.substring((forwardSlash > backSlash) ? forwardSlash + 1 : backSlash + 1);
    }
	function getFileType(file) {
        var stringFile = getFileNameAndType(file);
		return stringFile.split(".")[1];
    }
	function getFileName(file) {
        var stringFile = getFileNameAndType(file);
		return stringFile.split(".")[0];
    }
	function getFilePath(file) {
        var path = file;
		path = path.match(/(.*)[\/\\]/)[1]||''; // extract the directory from the path
		path += '/'
		return path;
    }
	function setFlag(bool){
		console.log(String("setflag "+bool));
		errorFlag = bool;
		console.log(String("setflagEr "+errorFlag));
	}
	context.subscriptions.push(pdflatex);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;