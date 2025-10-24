class User {
    id: number;
    firstname: string;
    lastname: string;
    photo: string;
    email: string;
    age: number;
    company: string;
    city: string;
    bloodgroup: string;
    height: number;

  constructor(id: number, firstname: string, lastname: string, photo: string, email: string, age: number, company: string, city: string, bloodgroup: string, height: number) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.photo = photo;
      this.email = email;
      this.age = age;
      this.company = company;
      this.city = city;
      this.bloodgroup = bloodgroup;
      this.height = height;
  }
}


export default User;