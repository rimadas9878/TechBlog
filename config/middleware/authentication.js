module.exports = function(req,res,next){
    if(req.newUser){
        return next();
    }
    return res.redirect("/");
}