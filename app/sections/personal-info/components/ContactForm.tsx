"use client";

import { Contact, CONTACT_TYPES, contactIcons, ContactType } from "@/types/resumeTypes";
import { Mail, Plus, Trash2, ChevronDown, Contact as ContactIcon } from "lucide-react";

export default function ContactForm({
  contacts,
  setContactsAction: setContacts,
  removeContactAction
}: {
  contacts: Contact[];
  setContactsAction: (contacts: Contact[]) => void;
  removeContactAction?: (id: number) => void;
}) {

  function addContactMethod() {
    const newContact: Contact = {
      id: Date.now(),
      type: "Email",
      value: ""
    };

    setContacts([
      ...contacts,
      newContact
    ]);
  }

  function updateContactMethod(
    id: number,
    field: keyof Contact,
    value: string | ContactType
  ) {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  }

  function removeContactMethod(id: number) {
    if (removeContactAction) {
      removeContactAction(id);
    } else {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-indigo-50 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-sm">
              <ContactIcon size={16} />
            </div>
            <h3 className="font-semibold text-gray-800">Contact Methods</h3>
          </div>
        </div>

        <div className="p-6">
          {!contacts || contacts.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-indigo-300 transition-colors group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No contact methods added yet
              </h3>

              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Add your email, phone number, and social profiles so employers can reach you.
              </p>

              <button
                onClick={addContactMethod}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium"
              >
                <Plus size={14} />
                Add First Contact
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {contacts.map((contact) => {
                  const ContactTypeIcon = contactIcons[contact.type];

                  return (
                    <div
                      key={contact.id}
                      className="group flex flex-col sm:flex-row gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                    >
                      <div className="flex-1 flex flex-col sm:flex-row gap-3">
                        {/* Type Select */}
                        <div className="sm:w-48">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
                            Type
                          </label>
                          <div className="relative">
                            <select
                              value={contact.type}
                              onChange={(e) =>
                                updateContactMethod(
                                  contact.id,
                                  "type",
                                  e.target.value as ContactType
                                )
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none text-sm text-gray-700 font-medium"
                            >
                              {CONTACT_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                              <ChevronDown size={12} />
                            </div>
                          </div>
                        </div>

                        {/* Value Input */}
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
                            Value
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                              <ContactTypeIcon size={14} />
                            </div>
                            <input
                              type="text"
                              value={contact.value}
                              onChange={(e) =>
                                updateContactMethod(
                                  contact.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              placeholder={contact.type === "Email" ? "your@email.com" : "URL or handle"}
                              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm text-gray-700"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end sm:pb-0.5">
                        <button
                          onClick={() => removeContactMethod(contact.id)}
                          className="w-full sm:w-auto p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 sm:border-transparent"
                          title="Remove contact"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Button */}
              <button
                onClick={addContactMethod}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
              >
                <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-indigo-100 transition-colors">
                  <Plus size={12} />
                </div>
                <span>Add Another Contact Method</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
