var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});
router.get('/view_employee', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_employee', {employeelist: results});
			}else{
				res.redirect('/home');
			}
		});
});


router.get('/addemployee', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/addemployee', {employeelist: results});
			}else{
				res.redirect('/home');
			}
		});
});
router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {employee: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var employee = {
		id: req.params.id,
		employeename: req.body.employeename,
		contactno: req.body.contactno,
		username: req.body.username,
		password: req.body.password,
	
		
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/view_employee');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/view_employee');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

module.exports = router;

