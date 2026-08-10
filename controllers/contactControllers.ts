import { Request, Response } from "express";
import { contactService } from "../services/contactService";

// @desc GET all contacts
// @route GET /api/contacts
// @access Public
export const getAllContacts = (req: Request, res: Response) => {
    res.status(200).json([{
        id: 1,
        name: "Subigya",
        number: "9846071244",
        email: "contact@subigyasubedi.com.np"
    },
    {
        id: 2,
        name: "Subedi",
        number: "9846071244",
        email: "contact@subigyasubedi.com.np"
    }])
}

// @desc GET contact by id
// @route GET /api/contacts/:id
// @access Public
export const getContactById = (req: Request, res: Response) => {
    res.status(200).json({ message: `Get contact for id: ${req.params.id}` })
}

// @desc Create new Contact
// @route POST /api/contacts
// @access Public
export const createContact = async (req: Request, res: Response) => {
    const contact = await contactService.create(req.body)

    console.log("Contact created:", req.body)
    res.status(201).json({ message: "Contact created!", data: contact })
}

// @desc Update Contact
// @route PUT /api/contacts/:id
// @access Public
export const updateContact = (req: Request, res: Response) => {
    res.status(200).json({ message: "Update contact" })
}

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access Public
export const deleteContact = (req: Request, res: Response) => {
    res.status(200).json({ message: "Contact deleted" })
}