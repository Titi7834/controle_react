class User {
    id: number;
    firstname: string;
    lastname: string;
    photo: string;
    email: string;
    age: number;
    company_name: string;
    company_job: string;
    city: string;
    bloodgroup: string;
    height: number;

  constructor(id: number, firstname: string, lastname: string, photo: string, email: string, age: number, company_name: string, company_job: string, city: string, bloodgroup: string, height: number) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.photo = photo;
      this.email = email;
      this.age = age;
      this.company_name = company_name;
      this.company_job = company_job;
      this.city = city;
      this.bloodgroup = bloodgroup;
      this.height = height;
  }
}


export default User;