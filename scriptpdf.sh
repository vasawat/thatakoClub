# reinstall pdfmake
npm uninstall pdfmake --force
npm install pdfmake --force
cp -r ./font_pdfmake/ ./node_modules/pdfmake
cd node_modules/pdfmake/
node build-vfs.js "./examples/fonts"