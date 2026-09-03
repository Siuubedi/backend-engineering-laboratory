// services/contactService.ts
import { randomUUID } from "node:crypto";
import { CreateContactInput } from "../schemas/contactSchema";

export type Contact = CreateContactInput & {
  id: string;
};

const contacts: Contact[] = [];

export const contactService = {
  create(input: CreateContactInput): Contact {
    const contact = {
      id: randomUUID(),
      ...input
    };

    contacts.push(contact);
    return contact;
  },

  findAll(): Contact[] {
    return contacts;
  }
};