export function createUserDb({ email, password }) {
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return user;
}

export function deleteUserDb({ id }) {
    const foundUser = await User.findByPk(id);
    if (!foundUser)  {
        return null;
    }
    await foundUser.destroy();
    return true;
}


export function findUserByIdDb({ id }) {
}