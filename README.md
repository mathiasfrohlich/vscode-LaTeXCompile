# LaTeX Compile

Compiles .tex to .pdf using pdflatex at current file

![Image of Command](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/images/command.png)

## Requirements
Installed Latex program (Supporting cmd: pdflatex) 

Programs Like
* Miktex for Windows 
* Mactex for OSX

## How to install
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Open `View -> Command Palette... and type ext install latex compile`
* Restart Visual Studio Code and select the command "`LaTeX: Compile PDF`"
  From the list of files displayed, select a file to open.

## Settings
You can configure some settings
* Open the PDF after Compile
* Open the log after Error
```
//Latex Compile Configuration
	"latexCompile.openAfterCompile": true,
	"latexCompile.openLogAfterError": true,
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Source

[Github](https://github.com/mathiasfrohlich/vscode-LaTeXCompile)
        
## Change Log

### Version 0.1.x
* Initial commit
* Included path in message
* Added Contribution guide to README.md
* Added Comments

### Version 0.2.0 
This version happened thanks to a community contribution.
* Added Open After Compile Feature
* Added Configuration option
* Changed the message display to use status bar instead of showInformationMessage

### Version 0.3.0 
* Added Log file of error
* Added Configuration option to show log file or not

### Version 0.3.1 
* Changes to instruction, README.md 
        
## License

[MIT](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/LICENSE)