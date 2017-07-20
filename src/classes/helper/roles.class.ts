export class UserRoles {

    Admin: any = {};
    Moderator: any = {};
    Dj: any = {};
    User: any = {};

    constructor(){
    }

    getRoles(msg) { // Define User Roles

        this.Admin = msg.guild.roles.find("name", "Admin");
        this.Moderator = msg.guild.roles.find("name", "Moderator");
        //this.Dj = msg.guild.roles.find("name", "Dj");
        //this.User = msg.guild.roles.find("name", "User");



        let userRole: any = {
            "Admin": this.Admin.name == "Admin",
            "Moderator": this.Moderator.name == "Moderator",
            //"Dj": this.Dj.name == "Dj",
            //"User": this.User.name == "User"
        };

        return userRole;
    }
}