module.exports=function(app,controllers){
    	app.get('/',controllers.todo.home);
    	app.post('/show',controllers.todo.show);
		app.post('/check-file',controllers.todo.check_file);
}
