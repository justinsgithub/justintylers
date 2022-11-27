import { user } from '~/server/models'

export default defineEventHandler(async (event) => {
  console.log("GET /api/user");
  const session_id = event.context.session.id
  console.log(session_id)
  try {
    console.log("get current user");
    let user_data: any = await user.findOne({session_id});
    if (!user_data) {
      user_data = await user.create({
        username: 'guest ' + user.estimatedDocumentCount().toString(),
        temp_password: 'password', 
        session_id})
    }
    return user_data
    /* return usersData.map((user) => ({ */
    /*   id: user._id, */
    /*   name: user.name, */
    /* })); */
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
