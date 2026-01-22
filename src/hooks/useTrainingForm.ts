import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  date: string | null;
  time: string | null;
  file: File | null;
}

export const useTrainingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    date: null,
    time: null,
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = !!(
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.date &&
    formData.time &&
    formData.file
  );

  const submitApplication = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('age', formData.age.toString());
    if (formData.date) data.append('date', formData.date);
    if (formData.file) data.append('file', formData.file);

    try {
      const response = await fetch('http://letsworkout.pl/submit', {
        method: 'POST',
        body: data,
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending application:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, updateField, isFormValid, submitApplication, isSubmitting };
};
