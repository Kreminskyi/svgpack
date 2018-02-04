var express = require('express');
var router = express.Router();
var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: "Aa0PdoxK1rAAAAAAAAAAv1QU1l5K0EkLOIr6ua3gDqjMzl_AnDVRBDnKASjHgCpm" });
var localStorage = require('localStorage');
var User;

function CreateFolder(Directory) {

    dbx.filesListFolder({path: '/Svg-editor/'})
        .then(function(response) {

            var count = response.entries.length;
            var result;

            for(var i= 0; i<count ; i++)
            {
                if(response.entries[i].name == Directory){
                    result = 'Directory exist'
                }
            }

            if(result === 'Directory exist')
            {
                return true

            }else
            {
                dbx.filesCreateFolderV2({path: "/Svg-editor/" + Directory})
                .then(function (response){
                    console.log('response', response);
                })
                .catch(function (error){
                    console.error(error);
                });
            }

        })
        .catch(function(error) {
            console.error(error);
        });
}

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/editor', function(req, res, next) {

    User = req.body.project.name;

    localStorage.setItem('ProjectName', User);
    var ProjectName = localStorage.getItem('ProjectName');

    console.log(ProjectName);
    if(ProjectName){
        CreateFolder(ProjectName);
        res.render('editor');
    }else{
        res.send('<h1>Создайте название проекта</h1>');
    }

});

router.get('/editor', function(req, res, next) {
    res.render('editor');
});

module.exports = router;
