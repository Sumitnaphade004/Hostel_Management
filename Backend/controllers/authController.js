class AuthController{
    static loginPage = ( req, res ) =>{
        try {
            const hostelName = process.env.HOSTEL_NAME;
            res.render('login',{hostelName})
        } catch (error) {
            console.error("Error ")
        }
    }
}

module.exports = AuthController; 