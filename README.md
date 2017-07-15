# This project is deprecated and will be sunset in the near future

# LaTeX Compile

Compiles .tex to .pdf using commands like "pdflatex", at current file

![Image of Command](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/images/command.png)

## Requirements
Installed Latex distribution

Programs Like
* Miktex for Windows 
* Mactex for OSX

Please note that there is a known issue with MacOSX El Capitan (10.11.x): 
LaTeX tools are now located in /Library/TeX/texbin instead of /usr/texbin.
https://tug.org/mactex/elcapitan.html

## How to install
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Open `View -> Command Palette... and type ext install latex compile`
* Restart Visual Studio Code and select the command "`LaTeX: Compile PDF`"
  From the list of files displayed, select a file to open.

## Settings
You can configure some settings
* Open the PDF after Compile
* Open the log after Error
* Set the LaTeX compiler to be used (pdflatex, xelatex, lualatex)
* Set a main document to always be the compilation target
```
//Latex Compile Configuration
	"latexCompile.openAfterCompile": true,
	"latexCompile.openLogAfterError": true,
	"latexCompile.compiler": "xelatex"
```

### Main Document Configuration ###
A few notes...
* This only works if you have a folder opened
* While you technically can set it globally, this should probably be set with workspace options
```
.vscode/settings.json:
{
	"latexCompile.mainFile": "myDoc.tex"
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Issues
* Create Issus
* Include this information: 

System information:<br />
OS: ... <br />
LaTex Distribution: ... <br />

## Source

[Github](https://github.com/mathiasfrohlich/vscode-LaTeXCompile)
        
## Change Log

### Version 0.1.0
* Initial commit
* Included path in message
* Added Contribution guide to README.md
* Added Comments

### Version 0.2.0
This version happened thanks to a community contribution.
Thanks to https://github.com/rashwell
* Added Open After Compile Feature
* Added Configuration option
* Changed the message display to use status bar instead of showInformationMessage

### Version 0.3.0 
* Added Log file of error
* Added Configuration option to show log file or not
* Changes to instruction, README.md 
* Republish 
* devDependencies 0.11.x

### Version 0.4.0
This version happened thanks to a community contribution.
Thanks to https://github.com/caffeinatedangel
* Added compiler option

### Version 0.5.0
This version happened thanks to a community contribution.
Thanks to https://github.com/caffeinatedangel
* Allows setting of a main document

### Version 0.6.0 + 0.6.1
This version happened thanks to a community contribution.
Thanks to https://github.com/fachammer
* Compile files with blanks in their paths
* Can goto files on external drive
* Fixed a problem on OSX and Linux where "cd /d" are not possible

### Version 0.7.0
This version happened thanks to a community contribution.
Thanks to https://github.com/jesege
* Fixed PDF opening on Linux

### Version 0.7.1
* Deprecated this project
* Recommendation : https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop
        
## License

[MIT](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/LICENSE)
