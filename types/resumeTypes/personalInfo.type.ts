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
interface ContactMethod {
  id: number;
  type: ContactType;
  value: string;
}

interface PersonalInfo {
  name: string;
  location: string;
  description: string;
  contactMethods: ContactMethod[];
}

export type { PersonalInfo, ContactMethod };
export { ContactType };
