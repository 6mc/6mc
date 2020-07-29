const nodeHtmlToImage = require('node-html-to-image');
const express = require('express');
const app = express();
const { exec } = require("child_process");
const config = require('config');



app.get('/status', async function(req, res) {


exec('/bin/bash -c "/bin/echo q | /bin/bash /etc/update-motd.d/50-landscape-sysinfo | /usr/bin/aha --black --line-fix"', async (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
   // console.log(`stdout: ${stdout}`);


  const image = await nodeHtmlToImage({
    html: stdout.replace(config.get('host_ip'),"xx.xx.xx.xx")
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');

});


});



app.listen(3333, '0.0.0.0', function () {
  console.log('Server is running on Port:', 3333);
});