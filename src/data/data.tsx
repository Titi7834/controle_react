import User from '../model/user';

async function getUsers() {
    const fakeAPI = fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => data.users);

    return new Promise<User[]>(async (resolve) => {
        const productsData = await fakeAPI;
        const products: User[] = productsData.map((util: any) => new User(
            util.id,
            util.firstName,
            util.lastName,
            util.image,
            util.email,
            util.age,
            util.company,
            util.address.city,
            util.bloodgroup,
            util.height
        ));
        resolve(products);
    });
}

export { getUsers };