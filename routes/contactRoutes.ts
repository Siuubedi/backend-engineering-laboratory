import express from "express";
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../controllers/contactControllers";
import { validateCreateContact } from "../middleware/validateContact";
const router = express.Router()

// Get all contacts
router.get("/", getAllContacts)

// Get contact by id
router.get("/:id", getContactById)

// Create new contact
router.post("/", validateCreateContact, createContact)

// Update contact
router.put("/:id", updateContact)

// Delete contact
router.delete("/:id", deleteContact)

module.exports = router;