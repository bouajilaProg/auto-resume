// personal info 
enum ContactType {
  Email,
  Phone,
  Website,
  GitHub,
  LinkedIn,
  Twitter,
  Instagram
}
interface Contact {
  id: number;
  type: ContactType;
  value: string;
}


interface PersonalInfo {
  name: string;
  location: string;
  description: string;
  contact: Contact[];
  hobbies: string[];
}

export type { PersonalInfo, Contact };
export { ContactType };
