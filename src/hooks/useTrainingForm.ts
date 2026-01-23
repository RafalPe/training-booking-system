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

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validate = (data: FormData): Partial<Record<keyof FormData, string>> => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!data.firstName) newErrors.firstName = 'First name is required';
    if (!data.lastName) newErrors.lastName = 'Last name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please use correct formatting. Example: address@email.com';
    }

    if (!data.age) newErrors.age = 'Age is required';

    if (!data.date) newErrors.date = 'Date is required';
    if (!data.time) newErrors.time = 'Time is required';
    if (!data.file) newErrors.file = 'File is required';

    return newErrors;
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const newData = { ...formData, [field]: value };
      const currentErrors = validate(newData);
      setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const currentErrorsResult = validate(formData);
  const isFormValid = Object.keys(currentErrorsResult).length === 0;

  const submitApplication = async () => {
    if (!isFormValid) return false;
    setIsSubmitting(true);
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('age', formData.age.toString());
    if (formData.date) data.append('date', formData.date);
    if (formData.time) data.append('time', formData.time);
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

  return {
    formData,
    updateField,
    isFormValid,
    submitApplication,
    isSubmitting,
    errors,
    handleBlur,
  };
};
