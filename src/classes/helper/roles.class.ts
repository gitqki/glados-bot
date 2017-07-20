export class UserRoles {

    Admins: any = {};
    Moderator: any = {};
    Dj: any = {};
    User: any = {};

    constructor(){
    }

    getRoles(msg) { // Define User Roles

        //this.Admins = msg.guild.roles.find("name", "Admins");
        //this.Moderator = msg.guild.roles.find("name", "Moderator");
        //this.Dj = msg.guild.roles.find("name", "Dj");
        //this.User = msg.guild.roles.find("name", "User");



        let userRole: any = {
            //"Admins": this.Admins.name == "Admins",
            //"Moderator": this.Moderator.name == "Moderator",
            //"Dj": this.Dj.name == "Dj",
            //"User": this.User.name == "User"
        };

        return userRole;
    }
}