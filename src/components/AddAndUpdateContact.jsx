import React from 'react';
import Modal from './Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ isOpen, onClose ,isUpdate,contact}) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contacts",id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchema}
          initialValues={
            isUpdate
            ?{
                name: contact.name,
                email: contact.email, 
            }
           : {
            name: "",
            email: "",
            }
        }
          onSubmit={(values) => {
            isUpdate?
            updateContact(values,contact.id):
            addContact(values);
          }}
        >
          {() => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="name"/>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="h-10 border" />
                <div className="text-xs text-red-500">
                  <ErrorMessage name="email"/>
                </div>
              </div>
              <button type="submit" className="bg-orange px-3 py-1.5 self-end">
                {isUpdate?"Update":"Add"} Contact
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
