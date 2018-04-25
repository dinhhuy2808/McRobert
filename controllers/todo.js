var HashMap = require('hashmap');
//save project
module.exports.show=function(req,res){

    var fs = require('fs');
    var stream = fs.createWriteStream("my_file.txt");
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(req.body));
        stream.end();
    });






};


//save project
module.exports.home=function(req,res){

   res.render("show_all_task");
};
exports.check_file=function(req,res){
    var fs = require('fs');
    var dataall = [];
    fs.readFile('my_file.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        var input=JSON.parse(data.toString());

        for(var j = 0 ; j < input.length;j++){

            if(input[j] != 'undefined' || input[j].trim()!=''){
                var keys = Object.keys(input[j]);

                var data = [];
                var map = new HashMap();
                for(var k =0;k<keys.length;k++){

                    /*console.log(keys[k])*/

                    if(k == 1 || k== 3){
                        var inputchild = JSON.parse(JSON.stringify(input[j][keys[k]]));
                        /*console.log(keys[k])*/
                        /* console.log(inputchild);*/
                        var keysChild = Object.keys(inputchild);
                        /*console.log(keysChild);*/
                        var mapChild = new HashMap();
                        for(var kc =0;kc<keysChild.length;kc++){
                            mapChild.set(keysChild[kc],inputchild[keysChild[kc]]);
                            /*console.log(keysChild[kc]);
                            console.log(inputchild[keysChild[kc]]);*/


                        }
                        map.set(keys[k],mapChild);
                    }else{
                        map.set(keys[k],input[j][keys[k]]);
                        /* console.log(input[j][keys[k]]);*/
                    }


                }

            }

            dataall.push(map);

        }
        /* console.log(dataall);*/
        for(var i=0;i<dataall.length;i++){
            var j=0;
            /*console.log(dataall[i].length);*/
            dataall[i].forEach(function(value, key) {

                if(j==1 || j==3){
                   /* console.log(key);*/

                    value.forEach(function(value1, key1) {
                       /* console.log(key1 + " : " + value1);*/
                    });
                    j++;
                }else{

                    /*console.log(key + " : " + value);*/
                    j++;
                }

            });
            /*console.log('--------------')*/
        }
        console.log(dataall.length);
        data={status:'exist',code:'300' ,detail:dataall};
        res.json(data);
    });


};
