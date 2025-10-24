import User from '../model/user';

function sleep(ms: number){
    return new Promise((resolve => setTimeout(resolve,ms)))
}

async function getUsers() {
    const fakeAPI = fetch('https://dummyjson.com/users?limit=0')
        .then(res => res.json())
        .then(data => data.users);
    {await sleep(1000)} 

    return new Promise<User[]>(async (resolve) => {
        const productsData = await fakeAPI;
        const products: User[] = productsData.map((util: any) => new User(
            util.id,
            util.firstName,
            util.lastName,
            util.image,
            util.email,
            util.age,
            util.company.name,
            util.company.title,
            util.address.city,
            util.bloodGroup,
            util.height
        ));
        resolve(products);
    });
}

export { getUsers };