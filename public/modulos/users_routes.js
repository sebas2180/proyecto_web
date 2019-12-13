
const passport = require('passport');
const path= require('path');// se encarga de unir directorios
function usuarios(app,passport){

      app.post('/registro_v2',(req,res,next)=>{
        passport.authenticate('local-signup', (err, user, info) =>{
          if (err) { return next(err); }
          if (!user) { 
              res.status(401);
              console.log(info.signupMessage);
              res.send(info.signupMessage);
              return;
          }
        })
      });
      app.post('/registro', passport.authenticate('local-signup', ()=>{
          console.log('hoko')
      })); 
      app.get('/lista_reservas',isAuthenticated, (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.render('../views/lista_reservas');
      });
      app.get('/dias_especiales',isAuthenticated, (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.render('../views/dias_especiales');
      });
      app.get('/obtener_perfil',isAuthenticated, (req, res, next) => {
        console.log(req.user);
        const devolver={
          status:702,
          usuario: req.user
       }
       return res.send(req.user);
      });
     

      app.post('/login', function(req, res, next) {
        passport.authenticate('local-signin', function(err, user, info) {
          if (err) { return next(err); }
          if (!user){
             { const devolver={
             status:702,
             success:'usuario NO logeado'
          }
          return res.send(JSON.stringify(devolver)); }
          }else{
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              const devolver={
                status:703,
                success:'usuario logeado',
                user: user.password
              }
              res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              return res.send(JSON.stringify(devolver));
            });
          }
         
        })(req, res, next);
        
      });


      app.get('/profile',isAuthenticated, (req, res, next) => {
        res.render('profile');
      });
      
      app.post('/logout',isAuthenticated, (req, res, next) => {
        req.logout();
        req.session.destroy(function (err) {
          const sendInfo={
            status: 999,
            url:'inicio.html'
          }
          console.log(sendInfo.url);
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
           return res.end(JSON.stringify(sendInfo.url));
      });
      });
      
      function isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) {
          
          return next();
        }else{
          res.redirect('/')
        }
      }
}
module.exports=usuarios;
