npm install --force
cp -r ./src/assets/fonts/ ./node_modules/pdfmake/examples/fonts
cd node_modules/pdfmake/
node build-vfs.js "./examples/fonts"