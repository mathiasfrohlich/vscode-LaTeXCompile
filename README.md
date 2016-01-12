# LaTeX Compile

Compiles .tex to .pdf using pdflatex at current file

![Image of Command](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/images/command.png)

## How to install
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Open `View -> Command Palette... and type ext install latex compile`
* Restart Visual Studio Code and select the command "`LaTeX: Compile PDF`"
  From the list of files displayed, select a file to open.

## Settings
You can configure the settings, to open the PDF after compile

```
"properties": {
	"latexCompile.openAfterCompile": {
		"type": "boolean",
		"default": true,
		"description": "Opens PDF after Latex Compile" 
	}
}
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

### Version 0.1.0
Initial commit

### Version 0.1.1
Included path in message

### Version 0.1.2
Added Contribution guide to README.md

### Version 0.1.3
Added comments to code

### Version 0.2.0 thanks to a community contribution.
Added Open After Compile Feature
        
## License

[MIT](https://raw.githubusercontent.com/mathiasfrohlich/vscode-LaTeXCompile/master/LICENSE)