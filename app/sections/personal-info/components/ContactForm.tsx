"use client";

import { contactIcons } from "@/static/contactTypesIcons";
import { Contact, ContactType } from "@/types/resumeTypes";
import { FaEnvelope, FaPlus, FaTrash } from "react-icons/fa";

export default function ContactForm({ contacts, setContacts }: { contacts: Contact[], setContacts: (contacts: Contact[]) => void }) {


  function addContactMethod() {
    const newContact: Contact = {
      id: Date.now(),
      type: ContactType.Email,
      value: ''
    };
    setContacts([...contacts, newContact]);
  }

  function updateContactMethod(id: number, field: keyof Contact, value: string | ContactType) {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  }

  function removeContactMethod(id: number) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  return (
    <div>
      {/* Contact Methods */}
      < div >
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Methods <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <button
            onClick={() => addContactMethod()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus size={14} />
            Add Contact
          </button>
        </div>

        {
          contacts.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FaEnvelope className="mx-auto text-gray-400 text-4xl mb-3" />
              <p className="text-gray-500 mb-4">No contact methods added yet</p>
              <button
                onClick={addContactMethod}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Your First Contact
              </button>
            </div>
          ) : (

            <div className="space-y-3">
              {contacts.map((contact) => {
                const ContactTypeIcon = contactIcons[contact.type];

                return (
                  <div key={contact.id} className="flex gap-3 items-start">
                    <div className="flex-1 flex gap-3">


                      <div className="w-40">
                        <select
                          value={contact.type}
                          onChange={(e) => updateContactMethod(contact.id, 'type', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        >
                          {Object.values(ContactType)
                            .filter((value) => typeof value === "number") // filter out reverse-mapped string values
                            .map((type) => (
                              <option key={type} value={type}>
                                {ContactType[type]}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="relative flex-1">
                        <ContactTypeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />

                        <input
                          type="text"
                          value={contact.value}
                          onChange={(e) => updateContactMethod(contact.id, 'value', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>


                    <button
                      onClick={() => removeContactMethod(contact.id)}
                      className="p-4 text-red-600 hover:bg-red-50 rounded-lg transition border border-gray-300"
                    >
                      <FaTrash size={18} />
                    </button>

                  </div>);
              })}
            </div>
          )
        }
      </div >


    </div >
  )
}

