import jwt from "jsonwebtoken"
import { users } from "../models/data.js";

export default {
    Query: {
        user(parent, { id }){
            return users.find(user => user.id === id);
        },
        viewer(parent, args, { user }) {
            return users.find( ({id }) => id === user.sub)
        }
    },
    Mutation: {
        login:  (parent, { email, password }) => {
            const { id, permissions, roles } = users.find(
                user => user.email === email && user.password === password                
            );

    //        console.log("Hey-rro!  Login================");
            if (!user) {
              throw new AuthenticationError("No user with this email found!");
            }
      
            return jwt.sign(
                {data: payload},
                secret,
                {expiresIn: "2h"}
            );
          },

    }
}