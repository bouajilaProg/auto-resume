
import { ContactType } from "@/types/resumeTypes";
import { IconType } from "react-icons";
import {
  FiMail,
  FiPhone,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram
} from "react-icons/fi";

export const contactIcons: Record<ContactType, IconType> = {
  [ContactType.Email]: FiMail,
  [ContactType.Phone]: FiPhone,
  [ContactType.Website]: FiGlobe,
  [ContactType.GitHub]: FiGithub,
  [ContactType.LinkedIn]: FiLinkedin,
  [ContactType.Twitter]: FiTwitter,
  [ContactType.Instagram]: FiInstagram,
};
